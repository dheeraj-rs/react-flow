const initialNodes = [
  {
    id: 'root-node',  // Add this root node
    position: {
      x: 0,
      y: 0,
    },
    type: 'group',  // Using group type for parent nodes
    data: {
      label: 'Root',
    },
    style: {
      opacity: 0,
      backgroundColor: 'transparent',
      border: 'none',
      width:0,
      height:0,
      zIndex: -1
    },
  },
  {
    id: 'incomingCall',
    defaultPosition: {
      x: 30,
      y: 80,
    },
    position: {
      x: 0,
      y: 50,
    },
    type: 'incomingCall',
    data: {
      label: 'Incoming Call',
    },
    parentId: 'root-node',
    width: 100,
    height: 47,
    x: 177,
    y: 23.5,
    rank: 0,
    draggable: false,
    column: 1,
    numbetOfKeys: 100,
    nodeIndex: 0,
  },
  {
    id: 'node-2',
    defaultPosition: {
      x: 180,
      y: 50,
    },
    position: {
      x: 180,
      y: 50,
    },
    type: 'start',
    data: {
      label: 'Start',
    },
    width: 154,
    height: 155,
    x: 180,
    y: 50,
    rank: 0,
    column: 1,
    numbetOfKeys: 100,
    nodeIndex: 0,
  },
];

export default initialNodes;
