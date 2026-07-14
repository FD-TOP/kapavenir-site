import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHash, scrollToPageTop } from '../../utils/scrollNavigation';

export default function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      return scrollToHash(hash);
    }

    return scrollToPageTop();
  }, [pathname, hash]);

  return null;
}
