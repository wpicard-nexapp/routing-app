export type Leaf<N> = { node: N; childs?: never; }
export type Branch<N> = { node: N; childs: Record<string, Tree<N>>; }
export type Tree<N> = Leaf<N> | Branch<N>;

export function isBranch<N>(tree: Tree<N>): tree is Branch<N> {
  return (tree as Branch<N>).childs !== undefined;
}

export function tree<T extends Tree<any>>(t: T): T {
  return t;
}


export type MappedTree<T extends Tree<any>, B> = T extends Branch<any>
  ? {
    node: B,
    childs: {
      [k in keyof T['childs']]: MappedTree<T['childs'][k], B>
    }
  }
  : Leaf<B>;


type CallbackType<A> = (node: A, parent?: any) => any;
type InferNode<T extends Tree<any>> = T extends Tree<infer N> ? N : never;

export function map<T extends Tree<any>, F extends CallbackType<InferNode<T>>, B = ReturnType<F>>(
  source: T,
  callbackfn: F,
  parent?: B
): MappedTree<T, B> {
  const mappedNode = callbackfn(source.node, parent);

  if (!isBranch(source)) return { node: mappedNode } as MappedTree<T, B>;

  type Childs = typeof source.childs;
  type MappedChilds = {
    [k in keyof Childs]: MappedTree<Childs[k], B>
  }

  return {
    node: mappedNode,
    childs: Object.entries(source.childs).reduce<MappedChilds>((acc, [key, subTree]) => ({
      ...acc,
      [key]: map(subTree, callbackfn, mappedNode)
    }), {})
  } as MappedTree<T, B>;
}
