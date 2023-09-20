import { useAppSelector } from '../store';
import { useEffect } from 'react';
import { fetchUsers, addUser } from '../store';
import  Button  from './Button';
import Skeleton from './Sekeleton';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

const UsersList: React.FC = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useAppSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content: React.ReactNode;
  if (isLoadingUsers) {
    return (content = <Skeleton times={6} className='h-10 w-full' />);
  } else if (loadingUsersError) {
    return (content = <div>Error fetching data...</div>);
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && 'Error Creating User... '}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
