
import { useAuth } from '../../hooks/useAuth';

export default function CreatePubPage() {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className='w-full flex flex-col items-center'>
      <div className="flex gap-6 items-center">

        <img
          className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2 cursor-pointer"
          src={user?.profile_picture_url || "/garotos.jpg"}
          alt="Author"
        />

        <div>
          <p>{user?.name} {user?.surname}</p>
          <span className="text-gray text-sm">{user?.city}</span>
        </div>
      </div>
    </div>
  )
}
