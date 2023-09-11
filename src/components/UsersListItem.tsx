import { User } from '../types';
import { Button } from './Button';
import { GoTrash } from 'react-icons/go';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';
type UsersListItemProps = {
  user: User;
};

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser, user);

  const handleUserDelete = () => {
    doDeleteUser();
  };

  const header = (
    <>
      <Button onClick={handleUserDelete} loading={isLoading}>
        <GoTrash />
      </Button>
      {error && <>Error Deliting user...</>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
