import { Leaf, map, Tree } from './tree';

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

export function childify<C extends ReadonlyArray<string>>(childs: C) {
  type Childs = Record<C[number], Leaf<string>>;
  return Object.fromEntries(childs.map((child, i) => [child, { node: i.toString() }])) as Childs;
}
