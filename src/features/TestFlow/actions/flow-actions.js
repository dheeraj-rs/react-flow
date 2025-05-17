const START_X = 0;
const START_Y = 50;
const INITIAL_CHILD_GAP_X = 400;
const VERTICAL_GAP = 50;
const SIBLING_HORIZONTAL = 1050;
const INITIAL_NODE_CHILD_GAP_X = 180;

const getMinHeight = (nodeType, data) => {
  const baseHeight = 45;
  const extraHeight = 45;
  const baseWithExtra = baseHeight + extraHeight;
  const doubleBaseWithExtra = 2 * baseHeight + extraHeight;

  const nodeTypeHeights = {
    greetify: 90,
    shortcut: (data?.details?.keyList?.length || 0) * baseHeight + doubleBaseWithExtra,
    'ivr-menu': (data?.details?.keys?.length || 0) * baseHeight + doubleBaseWithExtra,
    connect: 5 * baseHeight + extraHeight,
    hours: doubleBaseWithExtra,
    voicemail: baseWithExtra,
    email: baseWithExtra,
    'caller-id': (data?.details?.callerListIds?.length || 0) * 62 + 50 + extraHeight,
    'caller-list': baseWithExtra,
    'get-value': data?.details?.type === 'url' ? 3 * baseHeight + extraHeight : doubleBaseWithExtra,
    passthru: data?.details?.async ? baseWithExtra : doubleBaseWithExtra,
    sms: data?.details?.type === 'url' ? doubleBaseWithExtra : baseWithExtra,
    'send-sms': doubleBaseWithExtra,
    queue: doubleBaseWithExtra,
    'hang-up': data?.details?.feedbackRequired ? doubleBaseWithExtra : baseHeight,
    'goto-flow': baseWithExtra,
    callBack: doubleBaseWithExtra,
  };
  return nodeTypeHeights[nodeType] ?? baseHeight;
};

const customLayout = (nodes, edges) => {
  if (!nodes?.length) return [];

  const nodeMap = new Map();
  const childrenMap = new Map();
  const parentChildrenCount = new Map();

  nodes.forEach((node) => nodeMap.set(node.id, { ...node }));

  edges.forEach(({ source, target }) => {
    const children = childrenMap.get(source) || [];
    children.push(target);
    childrenMap.set(source, children);

    const targetNode = nodeMap.get(target);
    if (targetNode?.parentId) {
      parentChildrenCount.set(
        targetNode.parentId,
        (parentChildrenCount.get(targetNode.parentId) || 0) + 1
      );
    }
  });

  const getNodeBottomY = (nodeId) => {
    const node = nodeMap.get(nodeId);
    return (node?.position?.y || 0) + (node?.height || node?.minHeight || 0);
  };
  const positionedNodes = new Set();
  const positionSubtree = (nodeId, startX, startY, level = 0, visited = new Set()) => {
    if (visited.has(nodeId)) {
      return startY;
    }
    visited.add(nodeId);
    const node = nodeMap.get(nodeId);
    if (!node || positionedNodes.has(nodeId)) return startY;
    node.position = { x: startX, y: startY };
    positionedNodes.add(nodeId);
    const children = (childrenMap.get(nodeId) || [])
      .map((childId) => nodeMap.get(childId))
      .filter(Boolean)
      .sort((a, b) => a.sourceIndex - b.sourceIndex);
    let maxChildY = startY;
    let childStartX = startX;
    children.forEach((child, index) => {
      let childGap;
      if (level === 0 && child?.parentId === 'incomingCall') {
        childGap = INITIAL_NODE_CHILD_GAP_X;
      } else {
        const siblingCount = parentChildrenCount.get(child.parentId) || 0;
        childGap = siblingCount > 1 ? 500 : INITIAL_CHILD_GAP_X;
      }
      childStartX += childGap;
      if (index > 0) {
        childStartX -= SIBLING_HORIZONTAL / 2;
      }
      const childY = maxChildY + (index > 0 ? VERTICAL_GAP : 0);
      const newChildY = positionSubtree(child.id, childStartX, childY, level + 1, new Set(visited));
      maxChildY = Math.max(maxChildY, newChildY);
    });
    return Math.max(getNodeBottomY(nodeId), maxChildY);
  };
  const disconnectedNodes = nodes
    .filter((node) => !edges.some((edge) => edge.target === node.id))
    .sort((a, b) => a.sourceIndex - b.sourceIndex);
  let currentX = START_X;
  let maxY = START_Y;
  disconnectedNodes.forEach((rootNode, index) => {
    const subtreeMaxY = positionSubtree(rootNode.id, currentX, maxY, 0);
    maxY = subtreeMaxY + VERTICAL_GAP;
    if (index === 0) {
      currentX = 0;
    } else {
      currentX += 0;
    }
  });
  return Array.from(nodeMap.values());
};

export { customLayout, getMinHeight };
