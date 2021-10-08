import { Route, Switch, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { UnorderedList as List } from '../../components/UnorderedList'
import { Entree, ENTREE_PATH } from './Entree';

export const MENU_PATH = '/menu';

export const Menu = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h1>Menu</h1>
      <List>
        <Link to={url + ENTREE_PATH}>Entrées</Link>
        <Link to="">Plats principaux</Link>
        <Link to="">Desserts</Link>
        <Link to="">Breuvages</Link>
      </List>
      <Switch>
        <Route path={path + ENTREE_PATH} component={Entree} />
      </Switch>
    </div>
  )
}