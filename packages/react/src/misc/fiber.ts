import { Fn } from "@c3/types";
/**
 *
 * @param root : FiberNode,eg.root._internalRoot
 * @returns
 */
export const getFiberTree = (root: any) => {
  const tree = {
    type: root.type,
    pendingProps: root.pendingProps,
    _children: [] as any[],
    tag: root.tag,
    name: root?.type?.displayName || root.type?.name || root.type?.["$$typeof"] || root.type,
    origin: root,
  };

  let child = root.child;
  while (child) {
    tree._children.push(getFiberTree(child));
    child = child.sibling;
  }

  return tree;
};

export const findFiberNode = (root: any, condition: Fn) => {
  const results = [] as any[];
  if (root && condition(root)) {
    results.push(root);
  }

  for (const child of root._children) {
    findFiberNode(child, condition).forEach(e => results.push(e));
  }
  return results;
};
