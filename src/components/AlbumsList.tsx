import { User } from '../types';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Sekeleton';
import ExpandablePanel from './ExpandablePanel';
import { Button } from './Button';

type AlbumsListProps = {
  user: User;
};

const AlbumsList: React.FC<AlbumsListProps> = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    if (data) {
      content = data.map((album) => {
        const header = <div>{album.title}</div>;
        return (
          <ExpandablePanel key={album.id} header={header}>
            List of photos in the album
          </ExpandablePanel>
        );
      });
    }
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button loading={isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
