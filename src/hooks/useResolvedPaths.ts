import { useRouteMatch } from 'react-router-dom';
import { resolve, Routes } from '../utils/routes';

export function useResolvedPaths<R extends Routes>(routes: R) {
  const { path } = useRouteMatch();
  return resolve({ ...routes, node: path });
}
