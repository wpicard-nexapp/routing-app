import { Branch, InferNode, Leaf, map, MappedTree, tree, Tree } from '../../src/utils/tree';
import { SOME_TREE, mockedCallbackFor, binaryTree } from './tree.fixture';

describe('tree', () => {
  describe('data type', () => {
    // It passes if it compiles

    test('A leaf is a single node', () => {
      const leaf: Leaf<any> = { node: 'foo' };
    });

    test('A branch is a node with children', () => {
      const branch: Branch<any> = {
        node: 'foo',
        childs: {}
      }
    });

    test('A tree is either a leaf or a branch', () => {
      const leaf: Leaf<any> = { node: 'foo' };
      const branch: Branch<any> = { node: 'foo', childs: {} }

      const tree1: Tree<any> = leaf;
      const tree2: Tree<any> = branch;
    });

    test('The children of a branch can be other trees', () => {
      const tree1: Tree<any> = { node: 'foo' };
      const tree2: Tree<any> = { node: 'bar' };

      const branch: Branch<any> = {
        node: 42,
        childs: {
          tree1,
          tree2
        }
      };
    });

    test('The tree function is an identity function that preserve the static shape of a tree', () => {
      const someTree = tree({
        node: 'root',
        childs: {
          sub1: {
            node: 'sub1',
            childs: {
              sub2: { node: 'sub2' }
            },
          }
        },
      });

      expect(someTree.childs.sub1.childs.sub2.node).toEqual('sub2');
    });

    test('It is impossible to assign anything else than a tree to the children of a branch', () => {
      const branch: Branch<any> = {
        node: 'foo',
        childs: {
          // @ts-expect-error
          sub: 'not-a-tree'
        }
      };
  
      const someTree = tree({
        node: 'bar',
        childs: {
          // @ts-expect-error
          sub: 'not-a-tree'
        }
      });
    });

    test('A MappedTree has the same shape as another tree, but with nodes of another type', () => {
      const someTree = tree({
        node: 'root',
        childs: {
          sub1: { node: 'sub1' },
          sub2: { node: 'sub2', childs: { subsub: { node: 'subsub' }}}
        }
      });

      const mappedTree: MappedTree<typeof someTree, number> = {
        node: 1,
        childs: {
          sub1: { node: 2 },
          sub2: { node: 3, childs: { subsub: { node: 4 }}}
        }
      }
    });
  });

  describe('map function', () => {
    test('The map function takes a tree and a mapping function as arguments, then return a MappedTree whose nodes are of the same type as the mapping function return type', () => {
      const someTree: Tree<string> = { node: 'some-node' };
      const someMappingFunction = (node: InferNode<typeof someTree>) => 42;

      type ExpectedType = MappedTree<typeof someTree, ReturnType<typeof someMappingFunction>>;
      const mappedTree: ExpectedType = map(someTree, someMappingFunction);
    });

    test('When mapping with an identity function, then return the same tree', () => {
      const mappedTree = map(SOME_TREE, (node) => node);

      expect(mappedTree).toEqual(SOME_TREE);
    });

    test('When mapping with no default parent, then the mapping function receive undefined for the second arguments of its first call', () => {
      const callback = mockedCallbackFor(SOME_TREE);

      map(SOME_TREE, callback);

      expect(callback.mock.calls[0][1]).toEqual(undefined);
    });

    test('When mapping with a default parent, then this parent is passed as the first call to the mapping callback', () => {
      const callback = mockedCallbackFor(SOME_TREE);
      const someDefaultParent = 'default-parent';
      
      map(SOME_TREE, callback, someDefaultParent);

      expect(callback.mock.calls[0][1]).toEqual(someDefaultParent)
    });

    test('When mapping, then deeply traverse every node of the tree', () => {
      let i = 0;
      const trace = () => i++;

      const tree = map(binaryTree(3), trace);

      expect(tree).toMatchSnapshot();
    });
  });
});
