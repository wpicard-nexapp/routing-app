import { Link } from 'react-router-dom';
import { UnorderedList as List } from '../../../components/UnorderedList';
import { useResolvedPaths } from '../../../hooks/useResolvedPaths';
import { childify, routes } from '../../../utils/routes';

const entrees = [
  'Salade du Chef',
  'Salade César',
  'Soupe aux légumes du jour',
  'Fondues parmesan maison',
  'Bâtonnets de fromage',
  'Oignons français',
  'Nachos',
  'Ailes de poulet',
  'Bouchées mix',
] as const;

const childs = childify(entrees);

export const ENTREE_ROUTES = routes({
  node: 'entree',
  childs
});

export const Entree = () => {
  const paths = useResolvedPaths(ENTREE_ROUTES);

  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Entrées</h2>
      <List>
        {Object.entries(paths.childs).map(([entree, path]) => <Link key={path.node} to={path.node}>{entree}</Link>)}
      </List>
    </div>
  );
}
