import { useResolvedPaths } from '../../../hooks/useResolvedPaths';
import { UnorderedList as List } from '../../../components/UnorderedList';
import { childify, routes } from '../../../utils/routes';
import { Link, Route, Switch } from 'react-router-dom';

const combos = childify([
  'Fromage',
  'Végétarianne',
  'Pepperoni',
  'Garnie',
  'Côtes levées',
  'Poulet BBQ',
  'Suprêmes',
  'Smoked meat',
  'Spéciale Normandin'
] as const);

const pizzasGourmets = childify([
  'Cinqphonie',
  'Végétarienne Deluxe',
  'Sicilienne',
  'Saumon fumé'
] as const);

const pizzas = childify([
  'Garnie',
  'Poulet BBQ',
  'Spéciale Normandin',
  'Végétarienne',
  'Fromage',
  'Suprême',
  'Côte levées',
  'Smoked meat',
  'Pepperoni'
] as const);

const sandwichs = childify([
  'Club sandwich au poulet',
  'Club sandwich au smoked meat',
  'Hot chicken',
  'Wrap au poulet',
  'Sandwich smoked meat',
  'Poulet club',
  'Boeuf Kansas'
] as const);

const pates = childify([
  'Spaghetti à la viande',
  'Spaghetti spécial Normandin',
  'Lasagne à la viande',
  'Lasagne suprême',
  'Lasagne végétarienne'
] as const);

const burgers = childify([
  'Garni',
  'Cheese burger',
  'Gourmet',
  'Piquant',
  'Twister'
] as const);

export const PLAT_PRINCIPAL_ROUTES = routes({
  node: 'plat-principal',
  childs: {
    'Combos': {
      node: 'combo',
      childs: combos
    },
    'Pizzas gourmets': {
      node: 'pizza-gourmet',
      childs: pizzasGourmets
    },
    'Pizzas': {
      node: 'pizza',
      childs: pizzas
    },
    'Sandwichs': {
      node: 'sandwich',
      childs: sandwichs
    },
    'Pâtes': {
      node: 'pate',
      childs: pates
    },
    'Burgers': {
      node: 'burger',
      childs: burgers
    }
  }
});

export const PlatPrincipal = () => {
  const paths = useResolvedPaths(PLAT_PRINCIPAL_ROUTES);

  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Plats principaux</h2>
      <List>
        {Object.entries(paths.childs).map(([groupe, path]) => (
          <Link key={path.node} to={path.node}>{groupe}</Link>
        ))}
      </List>
      <Switch>
        {Object.entries(paths.childs).map(([groupe, path]) => (
          <Route path={path.node} key={path.node}>
            <div style={{ marginLeft: 25 }}>
              <h3>{groupe}</h3>
              <List>
                {Object.entries(path.childs).map(([plat, path]) => (
                  <Link to={path.node} key={path.node}>{plat}</Link>
                ))}
              </List>
            </div>
          </Route>
        ))}
      </Switch>
    </div>
  );
}