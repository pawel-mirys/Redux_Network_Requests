import { User } from '../types';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Sekeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

type AlbumsListProps = {
  user: User;
};

const AlbumsList: React.FC<AlbumsListProps> = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className='h-10 w-full' times={3} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    if (data) {
      content = data.map((album) => {
        return <AlbumsListItem key={album.id} album={album} />;
      });
    }
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button loading={isFetching} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
