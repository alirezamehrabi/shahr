'use client';

import { useGetProductsQuery } from '@/services/productsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct, removeProduct } from '@/store/selectedProductsSlice';
import { Product } from '@/interface/product';
import { useGetUsersQuery } from '@/services/usersApi';
import { useRouter } from 'next/navigation';
export default function HomePage() {
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

  if (isLoading) return <div className="p-4">در حال بارگذاری...</div>;
  if (error)
    return <div className="p-4 text-red-500">خطا در دریافت اطلاعات</div>;

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ستون محصولات */}
      <section className="border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">محصولات</h2>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {products?.map((product) => (
            <li
              key={product.id}
              className="border p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(product)}
            >
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-gray-500">${product.price}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ستون کاربران - فعلاً خالی */}
      <section className="border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">کاربران</h2>
        {users?.length ? (
          <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
            {users.map((user) => (
              <li
                key={user.id}
                className="border p-2 rounded hover:bg-blue-100 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <p className="font-medium">
                  {user.name.firstname} {user.name.lastname}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">در حال بارگذاری کاربران...</p>
        )}
      </section>

      {/* ستون محصولات انتخاب‌شده */}
      <section className="border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">محصولات انتخاب‌شده</h2>
        {selectedProducts.length === 0 ? (
          <p className="text-gray-400">محصولی انتخاب نشده است.</p>
        ) : (
          <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
            {selectedProducts.map((product) => (
              <li
                key={product.id}
                className="border p-2 rounded hover:bg-red-100 cursor-pointer"
                onClick={() => handleRemove(product.id)}
              >
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
