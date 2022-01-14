import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { UnorderedList as List } from '../../components/UnorderedList'
import { useResolvedPaths } from '../../hooks/useResolvedPaths';
import { routes } from '../../utils/routes';
import { Breuvage, BREUVAGE_ROUTES } from './breuvage/Breuvage';
import { Dessert, DESSERT_ROUTES } from './dessert/Dessert';
import { Entree, ENTREE_ROUTES } from './entree/Entree';
import { PlatPrincipal, PLAT_PRINCIPAL_ROUTES } from './plat/PlatPrincipal';

export const MENU_ROUTES = routes({
  node: 'menu',
  childs: {
    ENTREE_ROUTES,
    PLAT_PRINCIPAL_ROUTES,
    DESSERT_ROUTES,
    BREUVAGE_ROUTES
  }
});

export const Menu = () => {
  const paths = useResolvedPaths(MENU_ROUTES);

  return (
    <div>
      <h1>Menu</h1>
      <List>
        <Link to={paths.childs.ENTREE_ROUTES.node}>Entrées</Link>
        <Link to={paths.childs.PLAT_PRINCIPAL_ROUTES.node}>Plats principaux</Link>
        <Link to={paths.childs.DESSERT_ROUTES.node}>Desserts</Link>
        <Link to={paths.childs.BREUVAGE_ROUTES.node}>Breuvages</Link>
      </List>
      <Switch>
        <Route path={paths.childs.ENTREE_ROUTES.node} component={Entree} />
        <Route path={paths.childs.PLAT_PRINCIPAL_ROUTES.node} component={PlatPrincipal} />
        <Route path={paths.childs.DESSERT_ROUTES.node} component={Dessert} />
        <Route path={paths.childs.BREUVAGE_ROUTES.node} component={Breuvage} />
      </Switch>
    </div>
  );
}