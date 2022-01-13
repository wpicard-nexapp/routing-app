import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { UnorderedList as List } from '../../components/UnorderedList'
import { useResolvedPaths } from '../../hooks/useResolvedPaths';
import { routes } from '../../utils/routes';
import { Entree, ENTREE_ROUTE } from './entree/Entree';

export const MENU_ROUTES = routes({
  node: 'menu',
  childs: {
    ENTREE_ROUTE
  }
});

export const Menu = () => {
  const paths = useResolvedPaths(MENU_ROUTES);

  return (
    <div>
      <h1>Menu</h1>
      <List>
        <Link to={paths.childs.ENTREE_ROUTE.node}>Entrées</Link>
        <Link to="">Plats principaux</Link>
        <Link to="">Desserts</Link>
        <Link to="">Breuvages</Link>
      </List>
      <Switch>
        <Route path={paths.childs.ENTREE_ROUTE.node} component={Entree} />
      </Switch>
    </div>
  )
}