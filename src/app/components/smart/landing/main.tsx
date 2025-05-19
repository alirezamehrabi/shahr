'use client';

import { useGetProductsQuery } from '@/services/productsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct, removeProduct } from '@/store/selectedProductsSlice';
import { Product } from '@/interface/product';
import { useGetUsersQuery } from '@/services/usersApi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ProductSvg, SelectedSvg, UserSvg } from '../../icons';
import { Loading, MotionComp } from '../../dummy';
export default function LandingMain() {
  const productListRef = useRef<HTMLUListElement | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const { data: products, isLoading, error } = useGetProductsQuery();
  const { data: users } = useGetUsersQuery();
  const selectedProducts = useAppSelector(
    (state) => state.selectedProducts.products
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSelect = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredUsers = users?.filter((u) =>
    `${u.name.firstname} ${u.name.lastname}`
      .toLowerCase()
      .includes(userSearch.toLowerCase())
  );

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  useEffect(() => {
    const el = productListRef.current;
    if (!el) return;

    const handleScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;

      if (nearBottom && visibleCount < (filteredProducts?.length || 0)) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredProducts]);

  if (isLoading) return <Loading />;
  if (error)
    return <div className="p-[16px] text-red-500">Error in getting data</div>;

  return (
    <>
      {/* products column */}
      <MotionComp className="border rounded-[8px] p-[16px] shadow bg-green-50">
        <h2 className="text-[20px] font-[600] mb-4">
          <ProductSvg />
          Products
        </h2>
        <input
          type="text"
          placeholder="products search..."
          className="w-full p-[8px] mb-[12px] border rounded"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
        />
        <ul
          className="space-y-[8px] max-h-[70vh] overflow-y-auto scrollbar"
          ref={productListRef}
        >
          {visibleProducts?.map((product) => (
            <li
              key={product.id}
              className="border p-[8px] rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(product)}
            >
              <p className="font-[500]">{product.title}</p>
              <p className="text-[14px] text-gray-500">${product.price}</p>
            </li>
          ))}
        </ul>
      </MotionComp>
      {/* users column */}
      <MotionComp
        delay={0.2}
        className="border rounded-[8px] p-[16px] shadow bg-yellow-50"
      >
        <h2 className="text-[20px] font-[600] mb-4">
          <UserSvg /> Users
        </h2>
        <input
          type="text"
          placeholder="users search..."
          className="w-full p-[8px] mb-[12px] border rounded"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        {users?.length ? (
          <ul className="space-y-[8px] max-h-[70vh] overflow-y-auto scrollbar">
            {filteredUsers?.map((user) => (
              <li
                key={user.id}
                className="border p-[8px] rounded hover:bg-blue-100 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <p className="font-[500]">
                  {user.name.firstname} {user.name.lastname}
                </p>
                <p className="text-[14px] text-gray-500">@{user.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">loading...</p>
        )}
      </MotionComp>
      {/* selected products column */}
      <MotionComp delay={0.4} className="border rounded-[8px] p-[16px] shadow">
        <h2 className="text-[20px] font-[600] mb-4">
          <SelectedSvg />
          Selected Products
        </h2>
        {selectedProducts.length === 0 ? (
          <p className="text-gray-400">there is no selected products.</p>
        ) : (
          <ul className="space-y-[8px] max-h-[70vh] overflow-y-auto scrollbar">
            {selectedProducts.map((product) => (
              <li
                key={product.id}
                className="border p-[8px] rounded hover:bg-red-100 cursor-pointer"
                onClick={() => handleRemove(product.id)}
              >
                <p className="font-[500]">{product.title}</p>
                <p className="text-[14px] text-gray-500">${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </MotionComp>
    </>
  );
}
