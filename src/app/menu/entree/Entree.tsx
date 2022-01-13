import { Link } from 'react-router-dom';
import { UnorderedList as List } from '../../../components/UnorderedList';
import { useResolvedPaths } from '../../../hooks/useResolvedPaths';
import { routes } from '../../../utils/routes';
import { Leaf } from '../../../utils/tree';

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

type Entrees = Record<typeof entrees[number], Leaf<string>>;
const childs = Object.fromEntries(entrees.map((entree, i) => [entree, { node: i.toString() }])) as Entrees;

export const ENTREE_ROUTE = routes({
  node: 'entree',
  childs
});

export const Entree = () => {
  const paths = useResolvedPaths(ENTREE_ROUTE);

  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Entrée</h2>
      <List>
        {Object.entries(paths.childs).map(([entree, path]) => <Link key={path.node} to={path.node}>{entree}</Link>)}
      </List>
    </div>
  );
}
