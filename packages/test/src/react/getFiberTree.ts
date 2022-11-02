type Fiber = {
  type: any;
  pendingProps: any;
  child: Fiber | undefined;
  sibling: Fiber | undefined;
  tag: number;
};

type TreeNode = {
  type: any;
  name: string;
  pendingProps: any;
  children: TreeNode[];
  tag: number;
  origin: Fiber;
};

export const getFiberTree = (root: Fiber): TreeNode => {
  const tree: TreeNode = {
    type: root.type,
    pendingProps: root.pendingProps,
    children: [],
    name: root.type?.displayName || root.type?.name || root.type?.['$$typeof'] || root.type,
    tag: root.tag,
    origin: root,
  };

  let child = root.child;
  while (child) {
    tree.children.push(getFiberTree(child));
    child = child.sibling;
  }

  return tree;
};

export const findFiberNode = (
  root: TreeNode,
  condition: (fiber: TreeNode) => boolean
): TreeNode[] => {
  const results = [];
  if (root && condition(root)) {
    results.push(root);
  }

  for (const child of root.children) {
    findFiberNode(child, condition).forEach(e => results.push(e));
  }
  return results;
};
