
type Leaf<N> = { node: N; }
type Branch<N> = Leaf<N> & { childs: Record<string, Tree<N>>; }
export type Tree<N> = Leaf<N> | Branch<N>;

export function isBranch<T>(tree: Tree<T>): tree is Branch<T> {
  return (tree as Branch<T>).childs !== undefined;
}

export function isLeaf<T>(tree: Tree<T>): tree is Leaf<T> {
  return !isBranch(tree);
}

export function tree<N, T extends Tree<N>>(t: T): T {
  return t;
}
