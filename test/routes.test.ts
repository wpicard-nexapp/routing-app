import { join, resolve, routes } from '../src/utils/routes';

describe('resolve', () => {
  test('When resolve with a single route, then return the same route prefixed by /', () => {
    const singleRoute = routes({
      node: 'root'
    });

    const resolvedRoutes = resolve(singleRoute);

    expect(resolvedRoutes.node).toEqual('/' + singleRoute.node);
  });

  test('When resolve with multiple sub routes, then each sub route is prefixed by its parent route', () => {
    const root = routes({
      node: 'root',
      childs: {
        sub1: { node: 'sub1' },
        sub2: { node: 'sub2' },
        sub3: { node: 'sub3' },
      }
    });

    const resolvedRoutes = resolve(root);

    Object.entries(resolvedRoutes.childs).forEach(([key, route]) => {
      const subrouteNode = root.childs[key as keyof typeof root.childs].node;
      expect(route.node).toEqual('/' + root.node + '/' + subrouteNode);
    });
  });

  test('When resolve with a deeply nested route, then the deepest node is prefixed by all of its ancestors', () => {
    const root = routes({
      node: 'root',
      childs: {
        sub1: {
          node: 'sub1',
          childs: {
            sub2: {
              node: 'sub2',
              childs: {
                sub3: {
                  node: 'sub3'
                }
              }
            }
          }
        }
      }
    });

    const resolvedRoutes = resolve(root);

    expect(resolvedRoutes.childs.sub1.childs.sub2.childs.sub3.node).toEqual(
      join(
        '/',
        root.node,
        root.childs.sub1.node,
        root.childs.sub1.childs.sub2.node,
        root.childs.sub1.childs.sub2.childs.sub3.node
      )
    );
  });
});
