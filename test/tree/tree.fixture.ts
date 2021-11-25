import { Tree, InferNode, tree } from '../../src/utils/tree';

export const mockedCallbackFor = <T extends Tree<any>>(tree: T) => {
  return jest.fn<InferNode<T>, [InferNode<T>, InferNode<T> | undefined]>((node, parent) => node);
}

export const SOME_TREE = tree({
  node: 42,
  childs: {
    foo: { node: 'foo' },
    bar: { node: 'bar' },
    sub1: {
      node: 'sub1',
      childs: {
        sub2: {
          node: 'sub2',
          childs: {
            sub3: { node: 'sub3' }
          }
        }
      }
    }
  }
});

export const binaryTree = (depth: number): Tree<null> => {
  if (depth <= 1) return tree({ node: null });

  return tree({
    node: null,
    childs: {
      left: binaryTree(depth - 1),
      rigth: binaryTree(depth - 1)
    }
  })
}
