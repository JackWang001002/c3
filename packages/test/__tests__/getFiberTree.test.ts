import { format as prettyFormat } from 'pretty-format';
import { findFiberNode, getFiberTree } from '../src/react/getFiberTree';
const root = {
  type: 'root',
  pendingProps: {},
  child: {
    type: '1-1',
    pendingProps: {},
    child: {
      type: '2-1-1',
      pendingProps: { as: 'u-span' },
      child: undefined,
      sibling: {
        type: '2-1-2',
      },
    },
    sibling: {
      type: '1-2',
      pendingProps: {},
      child: {
        type: '2-2-1',
        pendingProps: { as: 'u-div' },
      },
      sibling: {
        type: '1-3',
      },
    },
  },
};

describe('test cases', () => {
  it('getFiberTree ', () => {
    const tree = getFiberTree(root);
    const lay1 = tree.children.map(e => e.type);
    expect(lay1).toEqual(['1-1', '1-2', '1-3']);
    const lay2 = tree.children.reduce((acc, e) => [...acc, ...e.children], []);
    const lay2Name = lay2.map(e => e.type);
    expect(lay2Name).toEqual(['2-1-1', '2-1-2', '2-2-1']);
    console.log(prettyFormat(tree));
  });
  it('findFiberNode ', () => {
    const rootNode = getFiberTree(root);
    const res = findFiberNode(rootNode, e => e.pendingProps?.['as']);
    const x = res.map(e => e.type);
    expect(x).toEqual(['2-1-1', '2-2-1']);
  });
});
