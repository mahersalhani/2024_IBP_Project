import { params } from '@/constants';
import { useSearchParams } from 'next/navigation';

const useRedirect = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get(params.redirect.key);

  return redirect;
};

export default useRedirect;
