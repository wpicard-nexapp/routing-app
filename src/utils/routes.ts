import { map, Tree } from './tree';

export type Routes = Tree<string>;

export function join(...paths: string[]) {
  return paths.join('/').replace(new RegExp('/{1,}', 'g'), '/');
}

export function routes<R extends Routes>(routes: R): R {
  return routes;
}

export function resolve<R extends Routes>(routes: R) {
  return map(routes, (node, parent?: string) => join(parent ?? '', node));
}
