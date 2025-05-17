import { getEdges, getNodeDetails } from '../../../common/helpers/utils';

const handleDeleteNode = async (idToRemove, setNodes) => {
  return new Promise((resolve, reject) => {
    setNodes((prevArray) => {
      const updatedArray = prevArray.filter((node) => node.id !== idToRemove);
      resolve(updatedArray);
      return updatedArray;
    });
  });
};

const handleRemoveConnection = async (idToRemove, edges) => {
  const updatedArray = edges.filter((edge) => String(edge.id) !== String(idToRemove));
  return updatedArray;
};

const checkIfAnyNodeInCol = (newCol, flowNodes) => {
  // check if any node in the col
  const nodesWithSamecol = flowNodes.filter((node) => String(node.column) === String(newCol));
  if (nodesWithSamecol.length === 0) {
    return null;
  } else {
    const sortedArray = nodesWithSamecol.sort((a, b) => a.position.y - b.position.y);
    return sortedArray[sortedArray.length - 1];
  }
};

const getCol = (prevNodeId, flowNodes) => {
  if (prevNodeId === 'incomingCall') {
    const newCol = 2;
    return { col: newCol, y: null, heightOfPreviousNode: null };
  } else {
    const newCol = getNodeDetails(prevNodeId, flowNodes)[0]?.column + 1;
    const result = checkIfAnyNodeInCol(newCol, flowNodes);
    // height
    if (result === null) {
      return { col: newCol, y: null, heightOfPreviousNode: null };
    } else {
      return { col: result.column, y: result.position.y, heightOfPreviousNode: result.height };
    }
  }
};

const getColDefault = (prevNodeId, flowNodes) => {
  if (prevNodeId === 'incomingCall') {
    const newCol = 2;
    return { col: newCol, y: null, heightOfPreviousNode: null };
  } else {
    const newCol = getNodeDetails(prevNodeId, flowNodes)[0]?.column + 1;
    const result = checkIfAnyNodeInCol(newCol, flowNodes);
    // height
    if (result === null) {
      return { col: newCol, y: null, heightOfPreviousNode: null };
    } else {
      return {
        col: result.column,
        y: result.defaultPosition.y,
        heightOfPreviousNode: result.height,
      };
    }
  }
};

const getRowsInNode = (type = '', nodeDetails) => {
  if (type === 'caller-id') {
    return nodeDetails.callerListIds.length + 1;
  }
  if (type === 'ivr-menu') {
    return nodeDetails.keys.length + 2;
  }

  if (type === 'greetify') {
    return 1;
  }

  if (type === 'connect') {
    return 5;
  }

  if (type === 'hours') {
    return 2;
  }

  if (type === 'shortcut') {
    return 2;
  }

  if (type === 'get-value') {
    return 3;
  }

  if (type === 'passthru') {
    return 2;
  }

  if (type === 'callBack') {
    return 2;
  }

  return 1;
};

const getX = (nodes, selectedNodeId, flowEdges, flowNodes) => {
  const edges = getEdges(selectedNodeId, flowEdges);
  if (edges.length > 0) {
    // already a node connected to the parent node
    const targetId = edges[edges.length - 1]?.target;
    const result = getNodeDetails(targetId, flowNodes)[0];

    return result.position.x - 20;
  } else if (nodes.length > 0 && selectedNodeId) {
    // no node connected to the parent node
    const nodeDetails = getNodeDetails(selectedNodeId, nodes)[0];
    const rows = getRowsInNode(nodeDetails.type, nodeDetails.details);
    return nodeDetails.position.x + 400 + rows * 20;
  }

  // no nodes other than the incoming node
  return 30;
};

const getY = (nodes, selectedNodeId, flowEdges, flowNodes, prevNodeId) => {
  const edges = getEdges(selectedNodeId, flowEdges);
  const newCol = getCol(prevNodeId, flowNodes);

  if (edges.length > 0) {
    // if already a node is connected to the parent node
    const targetId = edges[edges.length - 1]?.target;
    const result = getNodeDetails(targetId, flowNodes)[0];
    const heightOfPreviousNode = result.height;
    // return { y: result.position.y + heightOfPreviousNode + 50, newCol };
    return { y: newCol.y + heightOfPreviousNode + 0, newCol: newCol.col };
  } else if (nodes.length > 0 && selectedNodeId) {
    // if no node is connected to the parent node
    return { y: newCol.y + newCol.heightOfPreviousNode + 80, newCol: newCol.col };
  }

  // While adding the first node connecting to incoming call
  return { y: 155, newCol };
};

const getEdgeDetails = (edgeId = '', flowEdges = []) => {
  const result = flowEdges.filter((edge) => String(edge.id) === String(edgeId));
  return result[0] || [];
};

const isNodeConnectedAsTarget = (flowEdges, nodeId) => {
  if (nodeId && flowEdges?.length > 0) {
    const result = flowEdges.filter((edge) => String(edge.target) === String(nodeId));
    return result.length > 0 ? false : true;
  }
};

export {
  handleDeleteNode,
  handleRemoveConnection,
  getX,
  getY,
  getEdgeDetails,
  getColDefault,
  isNodeConnectedAsTarget,
};
