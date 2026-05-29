import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocumentTitle } from '../../config/pageTitles';

export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getDocumentTitle(pathname);
  }, [pathname]);

  return null;
}
