import {  User } from '../types';
import { useFetchAlbumsQuery } from '../store';

type AlbumsListProps = {
  user: User;
};

const AlbumsList: React.FC<AlbumsListProps> = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  console.log(data, error, isLoading);
  return <div>Albums for {user.name}</div>;
};

export default AlbumsList;
