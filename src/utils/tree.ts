export type Leaf<N> = { node: N; childs?: never; }
export type Branch<N> = { node: N; childs: Record<string, Tree<N>>; }
export type Tree<N> = Leaf<N> | Branch<N>;

export type InferNode<T extends Tree<any>> = T extends Tree<infer N> ? N : never;

export function isLeaf<N>(tree: Tree<N>): tree is Leaf<N> {
  return tree.childs === undefined;
}

export function isBranch<N>(tree: Tree<N>): tree is Branch<N> {
  return tree.childs !== undefined;
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


type CallbackType<A, B> = (node: A, parent: B) => B;

export function map<T extends Tree<any>, F extends CallbackType<InferNode<T>, P | ReturnType<F>>, P = undefined>(
  source: T,
  callbackfn: F,
  parent?: P
): MappedTree<T, ReturnType<F>> {
  type B = ReturnType<F>;
  const mappedNode = callbackfn(source.node, parent as P);

  if (isLeaf(source)) return { node: mappedNode } as MappedTree<T, B>;

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
