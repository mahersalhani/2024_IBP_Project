import HashLoader from 'react-spinners/HashLoader';

export function Loader({ color = '#f48416', size = 40 }) {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <HashLoader color={color} size={size} />
    </div>
  );
}
