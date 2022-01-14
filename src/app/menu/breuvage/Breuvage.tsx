import { Link, Switch, Route } from 'react-router-dom';
import { useResolvedPaths } from '../../../hooks/useResolvedPaths';
import { childify, Routes, routes } from '../../../utils/routes';
import { UnorderedList as List } from '../../../components/UnorderedList';
import { isBranch } from '../../../utils/tree';

const nonAlcholise = childify([
  "Jus de légume",
  "Jus de tomante",
  "Café",
  "Thé",
  "Eau",
  "Boisson gazeuse"
]);

const bieres = childify([
  "Coors Light",
  "Belgian Moon",
  "Rickards red",
  "Molson Export"
]);

const vinsRouges = childify([
  "Maison",
  "Cliff 79",
  "Woodbridge"
]);

const vinsBlancs = childify([
  "Maison",
  "Cliff 79",
  "Woodbridge",
  "Kim Crawford"
]);

export const BREUVAGE_ROUTES = routes({
  node: 'breuvage',
  childs: {
    'Non-alcholisé': {
      node: 'non-alcholise',
      childs: nonAlcholise
    },
    'Alcholisé': {
      node: 'alcholise',
      childs: {
        'Bières': {
          node: 'biere',
          childs: bieres
        },
        'Vins rouges': {
          node: 'vin-rouge',
          childs: vinsRouges
        },
        'Vins blancs': {
          node: 'vin-blanc',
          childs: vinsBlancs
        }
      }
    }
  }
});

export const Breuvage = () => {
  const paths = useResolvedPaths(BREUVAGE_ROUTES);

  return (
    <div style={{ marginLeft: 25 }}>
      <h2>Breuvages</h2>
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
                {Object.entries(path.childs).map(([breuvage, path]: [string, Routes]) => (
                  <Link to={path.node} key={path.node}>{breuvage}</Link>
                ))}
              </List>
              <Switch>
                {Object.entries(path.childs).map(([breuvage, route]: [string, Routes]) => (
                  isBranch(route) && (
                    <Route path={route.node}>
                      <div style={{marginLeft: 25 }}>
                        <h4>{breuvage}</h4>
                        <List>
                          {Object.entries(route.childs).map(([cuvee, path]) => (
                            <Link to={path.node} key={path.node}>{cuvee}</Link>
                          ))}
                        </List>
                      </div>
                    </Route>
                  )
                ))}
              </Switch>
            </div>
          </Route>
        ))}
      </Switch>
    </div>
  );
}