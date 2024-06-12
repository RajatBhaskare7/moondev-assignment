import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useAuthSession = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return { user, token };
};

export default useAuthSession;
