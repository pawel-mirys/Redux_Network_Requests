import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import { Album, Photo } from '../types';
import Button from './Button';
import PhotosListItem from './PhotosListItem';
import Skeleton from './Sekeleton';

type PhotosListProps = {
  album: Album;
};

const PhotosList: React.FC<PhotosListProps> = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  let content;

  if (isFetching) {
    content = <Skeleton className='h-8 w-8' times={4} />;
  } else if (error) {
    content = <div>Error fetching photos</div>;
  } else {
    content =
      data &&
      data.map((photo: Photo) => {
        return <PhotosListItem key={photo.id} photo={photo} />;
      });
  }

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className='mx-8 flex flex-row flex-wrap justify-center'>
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
