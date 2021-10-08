import { isBranch, Tree } from './tree';

type Routes = Tree<string>;

export function join(...paths: string[]) {
  return paths.join('/').replace(new RegExp('/{1,}', 'g'), '/');
}

export function routes<R extends Routes>(routes: R): R {
  return routes;
}

export function resolve<R extends Routes>(routes: R, prefix = ''): R {
  const root = join(prefix, routes.node);

  if (!isBranch(routes)) return { ...routes, node: root };

  type Childs = typeof routes.childs;

  return {
    ...routes,
    node: root,
    childs: Object.entries(routes.childs).reduce((acc, [key, subTree]) => ({
      ...acc,
      [key]: resolve(subTree, root)
    }), {} as Childs)
  }
}
