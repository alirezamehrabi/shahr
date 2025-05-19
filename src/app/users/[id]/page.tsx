import { notFound } from 'next/navigation';
import { User } from '@/interface/user';

type Params = Promise<{ id: string }>;

export default async function UserDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const res = await fetch(`https://fakestoreapi.com/users/${params.id}`);
  if (!res.ok) return notFound();

  const user: User = await res.json();

  return (
    <div className="p-[24px_52px] flex justify-around mx-auto gap-[24px]">
      <div className="border w-full p-[24px] rounded-[12px] hover:bg-gray-100 transition duration-[0.5s]">
        <h1 className="text-2xl font-bold mb-4">
          {user.name.firstname} {user.name.lastname}
        </h1>
        <div className="space-y-[8px]">
          <p>
            <span className="font-[600]">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-[600]">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-[600]">City:</span> {user?.address?.city}
          </p>
          <p>
            <span className="font-[600]">Phone:</span> {user?.phone}
          </p>
        </div>
      </div>
      <div className="flex items-center font-[700] text-[24px] border w-full p-[24px] rounded-[12px]">
        User Detail
      </div>
    </div>
  );
}
