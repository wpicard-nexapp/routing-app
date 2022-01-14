import { Link } from 'react-router-dom';
import { useResolvedPaths } from '../../../hooks/useResolvedPaths';
import { childify, routes } from '../../../utils/routes';
import { UnorderedList as List } from '../../../components/UnorderedList';

const desserts = [
  'Brownies',
  'Gâteau au fromage',
  'Tarte à la noix de coco',
  'Gâteau mousse au chocolat',
  'Gâteau au chocolat',
  'Tarte au pommes',
  'Tarte au sucre',
  'Sundae'
] as const;

const childs = childify(desserts);

export const DESSERT_ROUTES = routes({
  node: 'dessert',
  childs
});

export const Dessert = () => {
  const paths = useResolvedPaths(DESSERT_ROUTES);

  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Desserts</h2>
      <List>
        {Object.entries(paths.childs).map(([entree, path]) => <Link key={path.node} to={path.node}>{entree}</Link>)}
      </List>
    </div>
  );
}
