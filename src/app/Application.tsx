import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Menu, MENU_PATH } from './menu/Menu';

const root = null;

export const Application = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={MENU_PATH} component={Menu} />
        <Redirect to={MENU_PATH} />
      </Switch>
    </BrowserRouter>
  );
};
