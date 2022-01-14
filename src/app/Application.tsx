import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { resolve, routes } from '../utils/routes';
import { Menu, MENU_ROUTES } from './menu/Menu';

const ROOT = routes({
  node: '/',
  childs: {
    MENU_ROUTES
  }
});

export const Application = () => {
  const paths = resolve(ROOT);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={paths.childs.MENU_ROUTES.node} component={Menu} />
        <Redirect to={paths.childs.MENU_ROUTES.node} />
      </Switch>
    </BrowserRouter>
  );
};
