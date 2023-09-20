import { GoTrash } from 'react-icons/go';
import { useDeletePhotoMutation } from '../store';
import { Photo } from '../types';

type PhotosListItemProps = {
  photo: Photo;
};

const PhotosListItem: React.FC<PhotosListItemProps> = ({ photo }) => {
  const [deletePhoto] = useDeletePhotoMutation();
  const handleDeletePhoto = () => {
    deletePhoto(photo);
  };
  return (
    <div className='relative m-2 cursor-pointer' onClick={handleDeletePhoto}>
      <img className='h-20 w-20' src={photo.url} alt={'random pic '} />
      <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80 transition duration-300 ease '>
        <GoTrash className='text-3xl' />
      </div>
    </div>
  );
};

export default PhotosListItem;
