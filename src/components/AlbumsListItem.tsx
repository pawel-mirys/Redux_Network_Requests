import { GoTrash } from 'react-icons/go';
import { Album } from '../types';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useDeleteAlbumMutation } from '../store';
import PhotosList from './PhotosList';
type AlbumsListItemProps = {
  album: Album;
};

const AlbumsListItem: React.FC<AlbumsListItemProps> = ({ album }) => {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleDeleteAlbum = () => {
    deleteAlbum(album);
  };

  const header = (
    <>
      <Button
        className='mr-2'
        loading={results.isLoading}
        onClick={handleDeleteAlbum}>
        <GoTrash />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
