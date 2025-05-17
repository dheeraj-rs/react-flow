/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-promise-executor-return */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import ReactDOM from 'react-dom';
import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import Layout from '../../common/layout';
import initialNodes from './data/initialNodes';
import customNodeTypes from './data/customNodeTypes';
import initialEdges from './data/initialEdges';
import ComponentSelectPopup from '../CommVoiceAdmin/components/modals/ComponentSelectPopup';
import useStore from '../Test/store';
import { handleDeleteNode, handleRemoveConnection } from './actions';
import edgeAttributes from './data/edgeAttributes';
import Modals from './components/Modals';
import { ListVoiceCategory } from '../../common/api-collection/Telephony/VoiceCategory';
import { ListAllVoiceLibrary } from '../../common/api-collection/Telephony/VoiceLibrary';
import Audio from './components/Audio';
import { ListAgents } from '../../common/api-collection/TenantAdmin/Agents';
import { ListDepartments } from '../../common/api-collection/Department';
import { ListAllApiLibrary } from '../../common/api-collection/Telephony/ApiLibrary';
import { customLayout, getMinHeight } from './actions/flow-actions';
import {
  GetCallFlow,
  ListCallFlowsListWithoutPagination,
  PublishCallFlow,
  UnpublishCallFlow,
  UpdateCallFlow,
} from '../../common/api-collection/Telephony/CallFlow';
import { ListAgentAvailabilitiesWithoutPagination } from '../../common/api-collection/Telephony/AgentAvailability';
import SMSSenderID, { activeEdgeColor } from './data/data';
import SpinningLoader from '../../common/components/Loader/SpinningLoader';
import ToastSuccess from '../../common/components/toast/ToastSucess';
import ToastError from '../../common/components/toast/ToastError';
import Subhead from './Subhead';
import TestFlowModal from './TestFlowModal';
import { getNodeDetails } from '../../common/helpers/utils';
import { updateShortcutEdges, updateIVRMenuEdges, updatePassthruEdges } from './actions/update';
import CallFlowsFitScreen from './components/CallFlowsFitScreen';
import CallFlowsZoomIn from './components/CallFlowsZoomIn';
import CallFlowsZoomOut from './components/CallFlowsZoomOut';
import CallFlowsResetZoom from './components/CallFlowsResetZoom';
import CallFlowsAutoArrange from './components/CallFlowsAutoArrange';
import CallFlowsRedo from './components/CallFlowsRedo';
import CallFlowsUndo from './components/CallFlowsUndo';
import { ListAllComponents } from '../../common/api-collection/Telephony/Components';
import { ListCallerList } from '../../common/api-collection/Telephony/CallerList';
import ActionButtons from './components/ActionButtons';

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 3;
const DEFAULT_ZOOM = 0.9;

function TestFlows() {
  const params = useParams();
  const audioRef = useRef();
  const containerRef = useRef();
  const isUndoRedoAction = useRef(false);
  const reactFlowInstance = useReactFlow();
  const { getNode } = useReactFlow();
  const {
    show,
    flowNodes,
    flowEdges,
    nodeSelectedForDelete,
    activeEdgeId,
    setNodeSelectedForDelete,
    setShow,
    setFlowNodes,
    setFlowEdges,
    selectedNode,
    setCallerListArray,
    setActiveEdgeId,
    setActiveNodesDetails,
    setSelectedEdge,
    setSelectedNode,
    setActiveNodeId,
  } = useStore();
  const [callFlowDetails, setCallFlowDetails] = useState({ isLoading: true, data: {} });
  const [vendorComponents, setVendorComponents] = useState([]);
  const [search, setSearch] = useState('');
  const [componentsloading, setComponentsloading] = useState(false);
  const [iVRSearchResult, setIVRSearchResult] = useState([]);
  const [availableIVRMenus, setAvailableIVRMenus] = useState([]);
  const [active, setActive] = useState({
    state: true,
    type: '',
    categoryName: '',
    categoryId: '5',
    fileName: '',
    fileId: 1,
  });
  const [selectedVoice, setSelectedVoice] = useState({
    id: 'select',
    parentType: '',
    url: '',
    isVoicePalying: false,
  });
  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [callerList, setCallerList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [voiceLibraryList, setVoiceLibraryList] = useState([]);
  const [allAvailableVoices, setAllAvailableVoices] = useState([]);
  const [agents, setAgents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [apiLibraries, setApiLibraries] = useState([]);
  const [callFlows, setCallFlows] = useState([]);
  const [agentAvailabilities, setAgentAvailabilities] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges?.map((e) => ({ ...e, hovered: false })));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isUpdateNode, setIsUpdateNode] = useState(false);
  const [isResetZoomEnabled, setIsResetZoomEnabled] = useState(false);
  const [isCustomLayoutReady, setIsCustomLayoutReady] = useState(false);
  const [isFlowVisible, setIsFlowVisible] = useState(false);
  const [lastAddedNode, setLastAddedNode] = useState({ nodeId: null, edgeId: null });
  const [flowHistory, setFlowHistory] = useState([]);
  const [flowHistoryIndex, setFlowHistoryIndex] = useState(-1);
  const [flowRefreshKey, setFlowRefreshKey] = useState(false);
  const [fitViewport, setFitViewport] = useState(null);
  const [screenViewport, setScreenViewport] = useState({ x: 0, y: 0, zoom: 1 });

  const formik = useFormik({
    initialValues: {
      isEditing: false,
      callFlowName: '',
    },
    validate: () => ({}),
    onSubmit: () => {},
  });

  const handleUpdateCallFlow = useCallback(
    async (nodesArray = [], edgesArray = []) => {
      if (!callFlowDetails?.data?.attributes?.name) return;
      const flowType = {
        actions: nodesArray?.map((node) => ({
          ...node,
          position: {
            x: Math?.round(node?.position?.x),
            y: Math?.round(node?.position?.y),
          },
        })),
        connections: edgesArray,
      };
      const data = {
        type: 'telephony_call-flow',
        id: params?.id,
        attributes: {
          name: callFlowDetails?.data?.attributes?.name,
          flow: flowType,
        },
      };
      try {
        await UpdateCallFlow(data, params?.id);
      } catch (error) {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'Error updating call flow. Please try again.',
        });
      }
    },
    [callFlowDetails, params?.id, setToastAction]
  );

  const animateNodePositions = useCallback(
    (startNodes, endNodes, duration = 500) => {
      if (!startNodes?.length || !endNodes?.length) return Promise.resolve();
      return new Promise((resolve) => {
        const startTime = performance.now();
        let rafId;
        const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const interpolatedNodes = startNodes?.map((startNode, index) => {
            const endNode = endNodes[index];
            return {
              ...startNode,
              position: {
                x: startNode.position.x + (endNode.position.x - startNode.position.x) * progress,
                y: startNode.position.y + (endNode.position.y - startNode.position.y) * progress,
              },
            };
          });
          setNodes(interpolatedNodes);
          if (progress < 1) {
            rafId = requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };
        rafId = requestAnimationFrame(animate);
        return () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
        };
      });
    },
    [setNodes]
  );

  const handleRightClick = useCallback(
    (event) => {
      event?.preventDefault();
      setActiveNodesDetails({ sourceId: '', targetId: '' });
      setSelectedEdge({});
      setActiveEdgeId(null);
      setActiveNodeId(null);
      setSelectedNode({});
      setLastAddedNode({ nodeId: null, edgeId: null });
      setEdges((prevEdges) => prevEdges?.map((e) => ({ ...e, style: edgeAttributes })));
    },
    [
      setActiveEdgeId,
      setActiveNodeId,
      setActiveNodesDetails,
      setEdges,
      setLastAddedNode,
      setSelectedEdge,
      setSelectedNode,
    ]
  );

  const createEdge = useCallback(
    (nodesArray, data) => {
      const id = uuidv4();
      let edge;
      if (show?.prevNodeId === 'incoming-call') {
        edge = {
          id: `edge-${id}`,
          source: show?.prevNodeId,
          sourceHandle: 'incomingCall',
          target: nodesArray[nodesArray.length - 1]?.id,
          targetHandle: `${data?.type}:target:${nodesArray[nodesArray.length - 1]?.id}`,
          targetType: data?.type,
          type: edgeAttributes?.type,
          style: edgeAttributes,
          keyValue: show?.keyValue,
          sourceIndex: selectedNode?.sourceIndex,
        };
      } else {
        edge = {
          id: `edge-${id}`,
          source: show?.prevNodeId,
          sourceHandle: `${show?.targetType}:source:${show?.prevNodeId}`,
          target: nodesArray[nodesArray.length - 1]?.id,
          targetHandle: `${data?.type}:target:${nodesArray[nodesArray.length - 1]?.id}`,
          targetType: data?.type,
          type: edgeAttributes?.type,
          style: edgeAttributes,
          keyValue: show?.keyValue,
          sourceIndex: selectedNode?.sourceIndex,
        };
      }
      return edge;
    },
    [selectedNode?.sourceIndex, show]
  );

  const saveToHistory = useCallback(
    (newNodes, newEdges) => {
      if (!isUndoRedoAction?.current) {
        setFlowHistory((prevHistory) => {
          const newHistory = prevHistory?.slice(0, flowHistoryIndex + 1);
          newHistory?.push({
            nodes: JSON?.parse(JSON?.stringify(newNodes)),
            edges: JSON?.parse(JSON?.stringify(newEdges)),
          });
          return newHistory;
        });
        setFlowHistoryIndex((prevIndex) => prevIndex + 1);
      }
      isUndoRedoAction.current = false;
    },
    [flowHistoryIndex]
  );

  const onNodesDragEnd = useCallback(() => {
    setFlowNodes(nodes);
    handleUpdateCallFlow(nodes, edges);
    saveToHistory(nodes, edges);
  }, [edges, handleUpdateCallFlow, nodes, saveToHistory, setFlowNodes]);

  const getInputNumber = (input) => {
    const numberMapping = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      hash: 10,
      star: 11,
      'customer-not-responded': 12,
      'customer-gives-wrong-input': 13,
    };

    const match = input?.match(/(input-\w+|customer-not-responded|customer-gives-wrong-input)/);
    if (match) {
      const key = match[1]?.startsWith('input-') ? match[1]?.slice(6) : match[1];
      if (numberMapping?.hasOwnProperty(key)) {
        if (key === 'customer-not-responded' || key === 'customer-gives-wrong-input') {
          return numberMapping[key];
        }
        return numberMapping[key] - 1;
      }
    }
    return null;
  };

  const onConnect = useCallback(
    async (connection) => {
      const id = uuidv4();
      let edge;
      const sourceNode = nodes?.find((node) => node?.id === connection?.source);
      const targetNode = nodes?.find((node) => node?.id === connection?.target);
      if (!sourceNode || !targetNode) return;

      // Calculate sourceIndex
      let sourceIndex = 0;
      if (sourceNode?.type === 'ivr-menu') {
        sourceIndex = getInputNumber(connection?.sourceHandle) ?? 0;
      } else {
        const match = connection?.sourceHandle?.match(/(input-\w+|wrong-input|no-input)/);
        if (match) {
          const key = match[1]?.startsWith('input-') ? match[1]?.slice(6) : match[1];
          const keyIndex = sourceNode?.details?.keyList?.findIndex(
            (k) => parseInt(k, 10) === parseInt(key, 10)
          );

          if (keyIndex !== -1) {
            sourceIndex = keyIndex;
          } else if (key === 'wrong-input') {
            sourceIndex = 56;
          } else if (key === 'no-input') {
            sourceIndex = 55;
          }
        }
      }

      // Update nodes with both sourceIndex and parentId
      const updatedNodes = nodes?.map((node) => {
        if (node?.id === targetNode?.id) {
          return {
            ...node,
            sourceIndex,
            parentId: connection?.source === 'incomingCall' ? 'incomingCall' : connection?.source, // Set parentId to source node's id
          };
        }
        return node;
      });

      edge = {
        id: `edge-${id}`,
        source: connection?.source === 'incomingCall' ? 'incomingCall' : connection?.source,
        sourceHandle:
          connection?.source === 'incomingCall' ? 'incomingCall' : connection?.sourceHandle,
        target: connection?.target,
        targetHandle: connection?.targetHandle,
        targetType: connection?.targetHandle?.split(':')[0],
        type: edgeAttributes?.type,
        style: edgeAttributes,
        sourceIndex,
      };

      setEdges((prevEdges) => {
        let updatedEdges = [...prevEdges, edge];
        if (edge?.source === 'incomingCall') {
          updatedEdges = prevEdges?.filter((e) => e?.id !== 'incoming-call');
          updatedEdges?.push(edge);
        } else {
          updatedEdges = [...prevEdges, edge];
        }
        setFlowEdges(updatedEdges);
        const arrangedNodes = customLayout(updatedNodes, updatedEdges);
        animateNodePositions(updatedNodes, arrangedNodes)?.then(() => {
          setNodes(arrangedNodes);
          setFlowNodes(arrangedNodes);
          handleUpdateCallFlow(arrangedNodes, updatedEdges);
          saveToHistory(arrangedNodes, updatedEdges);
        });
        return updatedEdges;
      });
    },
    [
      nodes,
      setEdges,
      setFlowEdges,
      setNodes,
      setFlowNodes,
      animateNodePositions,
      customLayout,
      handleUpdateCallFlow,
      saveToHistory,
    ]
  );

  const updateEdgesArray = useCallback(
    async (nodeDetails, updatedDetails) => {
      updateShortcutEdges(setEdges, setFlowEdges, nodeDetails, updatedDetails, edges);
      updateIVRMenuEdges(setEdges, nodeDetails, updatedDetails, edges);
      updatePassthruEdges(setEdges, nodeDetails, updatedDetails, edges);
      setFlowRefreshKey((prevKey) => prevKey + 1);
    },
    [edges, setEdges, setFlowEdges, setShow]
  );

  const calculateNodeDimensions = useMemo(
    () =>
      (node, type = 'height') => {
        if (!node) return type === 'minHeight' ? 45 : 175;
        const baseHeight = node.height || 45;
        const baseWidth = node.width || 250;
        const counts = {
          shortcut: parseInt(node?.details?.keyList?.length, 10) || 1,
          ivr: parseInt(node?.details?.keys?.length, 10) || 1,
          callerList: parseInt(node?.details?.callerListIds?.length, 10) || 1,
        };
        const additionalHeight =
          (counts.shortcut > 1 ? 45 * counts.shortcut : 0) +
          (counts.ivr > 1 ? 95 * counts.ivr : 0) +
          (counts.callerList > 1 ? 62 * counts.callerList : 0);
        return type === 'height' ? baseHeight + additionalHeight : baseWidth;
      },
    []
  );

  const calculateViewportPosition = ({ node, flowPosition, zoom, result }) => {
    // Viewport adjustment constants
    const VIEWPORT_CONSTANTS = {
      SAFETY_MARGIN: 50,
      HORIZONTAL_OFFSET_FACTOR: 0.35,
      VERTICAL_OFFSET_FACTOR: 0.35,
      MIN_PADDING: 15,
      MAX_PADDING: 100,
      ZOOM_SCALE_FACTOR: 0.8,
    };

    const safetyMargin = VIEWPORT_CONSTANTS.SAFETY_MARGIN;
    const nodeWidth = calculateNodeDimensions(node, 'width');
    const nodeHeight = calculateNodeDimensions(node, 'height');
    let newX = flowPosition?.x || 0;
    let newY = flowPosition?.y || 0;

    if (result?.isOutOfViewX && result?.overflowNodeDirection.right) {
      const screenCenterX = containerRef.current.clientWidth / 2;
      const horizontalOffset =
        containerRef.current.clientWidth * VIEWPORT_CONSTANTS.HORIZONTAL_OFFSET_FACTOR;
      newX =
        -(node.position.x * zoom) +
        screenCenterX -
        ((nodeWidth + safetyMargin) * zoom) / 2 +
        horizontalOffset;
    }

    if (result?.isOutOfViewY && result?.overflowNodeDirection.bottom) {
      const screenCenterY = containerRef.current.clientHeight / 2;
      const verticalOffset =
        containerRef.current.clientHeight * VIEWPORT_CONSTANTS.VERTICAL_OFFSET_FACTOR;
      newY =
        -(node.position.y * zoom) +
        screenCenterY -
        ((nodeHeight + safetyMargin) * zoom) / 2 +
        verticalOffset;
    }

    return { newX, newY };
  };

  const isNodeInScreenView = ({ node }) => {
    // Viewport adjustment constants
    const VIEWPORT_CONSTANTS = {
      MIN_SAFETY_MARGIN: 10,
      MAX_SAFETY_MARGIN: 100,
      MIN_ZOOM: 0.1,
      DEFAULT_NODE: {
        width: 250,
        height: 185,
        position: { x: 0, y: 0 },
      },
      SCREEN_PADDING: {
        horizontal: 50,
        vertical: 15,
        // vertical: 30,
      },
      ZOOM_SCALE_FACTOR: 0.8,
    };

    const DEFAULT_RESPONSE = {
      isInView: false,
      isOutOfViewX: false,
      isOutOfViewY: false,
      overflowDirection: { left: false, right: false, top: false, bottom: false },
      errors: [],
    };

    // Validate required dependencies
    const errors = [];
    if (!node) errors.push('Node is required');
    if (!reactFlowInstance) errors.push('ReactFlow instance is required');
    if (!containerRef?.current) errors.push('Container reference is required');
    if (errors.length > 0) {
      return { ...DEFAULT_RESPONSE, errors };
    }

    // Validate node structure
    const validNode = {
      width: node.width > 0 ? node.width : VIEWPORT_CONSTANTS.DEFAULT_NODE.width,
      height: node.height > 0 ? node.height : VIEWPORT_CONSTANTS.DEFAULT_NODE.height,
      position: {
        x: node.position?.x ?? VIEWPORT_CONSTANTS.DEFAULT_NODE.position.x,
        y: node.position?.y ?? VIEWPORT_CONSTANTS.DEFAULT_NODE.position.y,
      },
    };

    // Get viewport information
    const flowPosition = reactFlowInstance.getViewport();
    const zoom = Math.max(VIEWPORT_CONSTANTS.MIN_ZOOM, reactFlowInstance.getZoom());

    // Screen dimensions with padding
    const screenWidth =
      containerRef.current.clientWidth - VIEWPORT_CONSTANTS.SCREEN_PADDING.horizontal * 2;
    const screenHeight =
      containerRef.current.clientHeight - VIEWPORT_CONSTANTS.SCREEN_PADDING.vertical * 2;

    // Calculate safety margin based on zoom level
    const zoomAdjustedMargin = Math.min(
      Math.max(
        50 / (zoom * VIEWPORT_CONSTANTS.ZOOM_SCALE_FACTOR),
        VIEWPORT_CONSTANTS.MAX_SAFETY_MARGIN
      )
    );

    // Screen bounds with adjusted safety margins
    const screenBounds = {
      minX: -flowPosition.x / zoom + zoomAdjustedMargin,
      maxX: (screenWidth - flowPosition.x) / zoom - zoomAdjustedMargin,
      minY: -flowPosition.y / zoom + zoomAdjustedMargin,
      maxY: (screenHeight - flowPosition.y) / zoom - zoomAdjustedMargin,
    };

    // Node boundaries
    const nodeBounds = {
      minX: validNode.position.x,
      maxX: validNode.position.x + validNode.width,
      minY: validNode.position.y,
      maxY: validNode.position.y + validNode.height,
    };

    // Determine if node is out of view with adjusted bounds
    const isOutOfViewX = nodeBounds.minX < screenBounds.minX || nodeBounds.maxX > screenBounds.maxX;
    const isOutOfViewY = nodeBounds.minY < screenBounds.minY || nodeBounds.maxY > screenBounds.maxY;

    // Determine overflow direction
    const overflowNodeDirection = {
      left: nodeBounds.minX < screenBounds.minX,
      right: nodeBounds.maxX > screenBounds.maxX,
      top: nodeBounds.minY < screenBounds.minY,
      bottom: nodeBounds.maxY > screenBounds.maxY,
    };

    return {
      isInView: !isOutOfViewX && !isOutOfViewY,
      isOutOfViewX,
      isOutOfViewY,
      overflowNodeDirection,
      errors: errors.length > 0 ? errors : undefined,
    };
  };

  const flowDimensionsForward = (nodeId) => {
    // Viewport adjustment constants
    const ANIMATION_DURATION = 800;

    const node = getNode(nodeId);
    if (!node || !reactFlowInstance || !containerRef?.current) return;
    const flowPosition = reactFlowInstance.getViewport();
    const zoom = reactFlowInstance.getZoom();
    const result = isNodeInScreenView({ node });
    if (!result?.isInView) {
      const { newX, newY } = calculateViewportPosition({
        node,
        flowPosition,
        zoom,
        result,
        containerRef,
      });
      reactFlowInstance.setViewport(
        {
          x: newX,
          y: newY,
          zoom,
        },
        {
          duration: ANIMATION_DURATION,
          timing: (t) => 1 - (1 - t) ** 3,
        }
      );
    }
  };

  const flowDimensionsReverse = useCallback(
    (selectNode) => {
      const ADJUSTMENT_FACTOR = 0.5;
      const MIN_LEFT_PADDING = 15;
      const MIN_TOP_PADDING = -15;
      const HORIZONTAL_OFFSET_FACTOR = 0.1;
      const VERTICAL_OFFSET_FACTOR = 0.1;
      const ANIMATION_DURATION = 800;

      if (!reactFlowInstance || !containerRef?.current || !selectNode) return;

      const flowPosition = reactFlowInstance.getViewport();
      const zoom = reactFlowInstance.getZoom();

      // Calculate current flow bounds (before deletion)
      const currentBounds = nodes.reduce(
        (acc, node) => {
          const nodeWidth = node.width || 250;
          const nodeHeight =
            node.type === selectNode.type
              ? node.height || node.minHeight || 185
              : calculateNodeDimensions(node, 'minHeight');

          return {
            ...acc,
            left: Math.min(acc.left, node.position.x),
            right: Math.max(acc.right, node.position.x + nodeWidth),
            top: Math.min(acc.top, node.position.y),
            bottom: Math.max(acc.bottom, node.position.y + nodeHeight),
          };
        },
        {
          left: Infinity,
          right: -Infinity,
          top: Infinity,
          bottom: -Infinity,
        }
      );

      // Calculate flow bounds after deletion (excluding the node being deleted)
      const newBounds = nodes
        .filter((node) => node.id !== selectNode.id)
        .reduce(
          (acc, node) => {
            const nodeWidth = node.width || 250;
            const nodeHeight = node.height || node.minHeight || 185;

            return {
              left: Math.min(acc.left, node.position.x),
              right: Math.max(acc.right, node.position.x + nodeWidth),
              top: Math.min(acc.top, node.position.y),
              bottom: Math.max(acc.bottom, node.position.y + nodeHeight),
            };
          },
          {
            left: Infinity,
            right: -Infinity,
            top: Infinity,
            bottom: -Infinity,
          }
        );

      // Calculate actual dimensions
      const currentWidth = currentBounds.right - currentBounds.left;
      const newWidth = newBounds.right - newBounds.left;
      const currentHeight = currentBounds.bottom - currentBounds.top;
      const newHeight = newBounds.bottom - newBounds.top;

      // Calculate scaled dimensions
      const scaledCurrentWidth = currentWidth * zoom;
      const scaledNewWidth = newWidth * zoom;
      const scaledCurrentHeight = currentHeight * zoom;
      const scaledNewHeight = newHeight * zoom;

      // Calculate actual decreases
      const widthDecrease = scaledCurrentWidth - scaledNewWidth;
      const heightDecrease = scaledCurrentHeight - scaledNewHeight;

      // Initialize new position
      const newPosition = {
        x: flowPosition.x,
        y: flowPosition.y,
        zoom,
      };

      const horizontalOffset = containerRef.current.clientWidth * HORIZONTAL_OFFSET_FACTOR;
      const verticalOffset = containerRef.current.clientHeight * VERTICAL_OFFSET_FACTOR;

      // Adjust horizontal position if width decreased
      if (widthDecrease > 0) {
        const wasOnRightSide =
          selectNode.position.x > (currentBounds.left + currentBounds.right) / 2;
        if (wasOnRightSide) {
          const potentialX = newPosition.x + widthDecrease * ADJUSTMENT_FACTOR + horizontalOffset;
          const flowLeftEdge = -newBounds.left * zoom + potentialX;
          newPosition.x =
            flowLeftEdge <= MIN_LEFT_PADDING
              ? potentialX
              : MIN_LEFT_PADDING + newBounds.left * zoom;
        }
      }

      // Adjust vertical position if height decreased
      if (heightDecrease > 0) {
        const flowCenterY = (currentBounds.bottom + currentBounds.top) / 2;
        const nodeHeight = selectNode.height || selectNode.minHeight || 185;
        const nodeVerticalCenter = selectNode.position.y + nodeHeight / 2;
        const wasOnBottom = nodeVerticalCenter > flowCenterY;

        if (wasOnBottom) {
          const potentialY = newPosition.y + heightDecrease * ADJUSTMENT_FACTOR + verticalOffset;
          const flowTopEdge = -newBounds.top * zoom + potentialY;
          newPosition.y =
            flowTopEdge <= MIN_TOP_PADDING ? potentialY : MIN_TOP_PADDING + newBounds.top * zoom;
        }
      }

      // Apply viewport changes
      requestAnimationFrame(() => {
        reactFlowInstance.setViewport(newPosition, {
          duration: ANIMATION_DURATION,
          timing: (t) => 1 - (1 - t) ** 3,
        });
      });
    },
    [nodes, reactFlowInstance, containerRef, calculateNodeDimensions]
  );

  const handleAddComponent = useCallback(
    async (data) => {
      const id = uuidv4();
      const newNode = {
        id,
        prevNodeId: data?.prevNodeId,
        prevHandleId: data?.prevHandleId,
        position: { x: 0, y: 0 },
        parentId: selectedNode?.nodeId || '',
        childrens: [],
        sourceIndex: selectedNode?.sourceIndex,
        minHeight: getMinHeight(data?.type, data),
        height: getMinHeight(data?.type, data),
        // height: getMinHeight(data?.type, data) + 50,
        width: 250,
        type: data?.type,
        data: {
          label: data?.label,
        },
        details: data?.details,
        draggable: true,
        name: data?.name,
      };

      const addNodeAndArrange = async (existingNodes) => {
        try {
          const parentNode = existingNodes?.find((node) => node?.id === data?.prevNodeId);
          const initialPosition = parentNode
            ? { x: parentNode.position.x + 300, y: parentNode.position.y + 100 }
            : { x: 500, y: 500 };

          newNode.position =
            newNode.parentId === 'incomingCall' ? { x: 180, y: 50 } : initialPosition;

          const nodesArray = [...existingNodes, newNode];
          let newEdge;
          let updatedEdges;

          if (data.prevNodeId === 'incomingCall') {
            newEdge = {
              id: 'incoming-call',
              source: 'incomingCall',
              sourceHandle: 'incomingCall',
              target: newNode?.id,
              targetHandle: `${data?.type}:target:${newNode?.id}`,
              targetType: data?.type,
              type: edgeAttributes?.type,
              style: edgeAttributes,
            };
            updatedEdges = edges?.filter((e) => e?.id !== 'incoming-call');
            updatedEdges.push(newEdge);
          } else {
            newEdge = createEdge(nodesArray, data);
            updatedEdges = [...edges, newEdge];
          }
          const endNodes = customLayout(nodesArray, updatedEdges);
          setNodes(nodesArray);
          setEdges(updatedEdges);
          setFlowEdges(updatedEdges);
          setShow({
            isVisible: false,
            type: data?.type,
            prevNodeId: data?.prevNodeId,
            prevHandleId: data?.prevHandleId,
            targetType: show?.targetType,
            id,
          });
          await animateNodePositions(nodesArray, endNodes, 500);
          setFlowNodes(endNodes);
          saveToHistory(endNodes, updatedEdges);
          setLastAddedNode({ nodeId: newNode?.id, edgeId: newEdge?.id });
          await handleUpdateCallFlow(endNodes, updatedEdges);
          flowDimensionsForward(newNode?.id);
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Node Adding successfully.',
          });
        } catch (error) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Error adding component. Please try again.',
          });
        }
      };

      if (data?.prevNodeId === 'incomingCall') {
        const updatedNodes = await handleDeleteNode('node-2', setNodes);
        await addNodeAndArrange(updatedNodes);
      } else {
        await addNodeAndArrange(nodes);
      }

      data?.formik?.resetForm();
    },
    [
      animateNodePositions,
      flowDimensionsForward,
      createEdge,
      edges,
      handleUpdateCallFlow,
      nodes,
      saveToHistory,
      selectedNode?.nodeId,
      selectedNode?.sourceIndex,
      setEdges,
      setFlowEdges,
      setFlowNodes,
      setLastAddedNode,
      setNodes,
      setShow,
      setToastAction,
      show?.targetType,
    ]
  );

  const handleUpdateNode = useCallback(
    (data) => {
      setShow({
        isVisible: false,
        type: data?.type,
        prevNodeId: data?.prevNodeId,
        prevHandleId: data?.prevHandleId,
        targetType: show?.targetType,
        id: data?.nodeId,
      });

      const updatedNodes = nodes?.map((node) => {
        if (node?.id === data?.nodeId) {
          return {
            ...node,
            details: data?.details,
            height: getMinHeight(node?.type, data),
          };
        }
        return node;
      });

      updateEdgesArray(getNodeDetails(data?.nodeId, flowNodes), data?.details)?.then(async () => {
        const layoutedNodes = customLayout(updatedNodes, flowEdges);
        setNodes(layoutedNodes);
        setFlowNodes(layoutedNodes);
        setFlowEdges(flowEdges);
        handleUpdateCallFlow(layoutedNodes, flowEdges);
        saveToHistory(layoutedNodes, flowEdges);
        setIsUpdateNode(true);
        flowDimensionsForward(data?.nodeId);
      });

      data?.formik?.resetForm();
    },
    [
      flowEdges,
      flowNodes,
      handleUpdateCallFlow,
      nodes,
      reactFlowInstance,
      saveToHistory,
      setFlowNodes,
      setNodes,
      setShow,
      show?.targetType,
      updateEdgesArray,
      flowDimensionsForward,
    ]
  );

  const handleRemoveConnections = useCallback(() => {
    const selectedNodeId = nodeSelectedForDelete?.nodeId;
    const parentEdge = edges?.find((e) => e?.target === selectedNodeId);
    if (parentEdge) {
      handleRemoveConnection(parentEdge?.id, edges)?.then((updatedEdges) => {
        setEdges(updatedEdges);
        setFlowEdges(updatedEdges);
        const arrangedNodes = customLayout(nodes, updatedEdges);
        setNodes(arrangedNodes);
        setFlowNodes(arrangedNodes);
        animateNodePositions(nodes, arrangedNodes)?.then(() => {
          handleUpdateCallFlow(arrangedNodes, updatedEdges);
          saveToHistory(arrangedNodes, updatedEdges);
        });
      });
    }
    setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
  }, [
    edges,
    handleUpdateCallFlow,
    nodes,
    nodeSelectedForDelete?.nodeId,
    saveToHistory,
    setEdges,
    setFlowEdges,
    setFlowNodes,
    setNodeSelectedForDelete,
    setNodes,
    animateNodePositions,
    customLayout,
  ]);

  const handleDeleteComponent = useCallback(() => {
    const selectedNodeId = nodeSelectedForDelete?.nodeId;
    const selectNode = getNode(selectedNodeId);

    if (nodes?.length === 2) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      setFlowNodes(initialNodes);
      setFlowEdges(initialEdges);
      setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
      handleUpdateCallFlow(initialNodes, initialEdges);
      return;
    }

    const relatedEdges = edges?.filter(
      (e) => e?.source === selectedNodeId || e?.target === selectedNodeId
    );
    const animateDeleteAndRearrange = async () => {
      const updatedNodesArray = nodes?.filter((node) => node?.id !== selectedNodeId);
      const updatedEdgesArray = edges?.filter((e) => !relatedEdges?.includes(e));
      setNodes(updatedNodesArray);
      setEdges(updatedEdgesArray);
      const endNodes = customLayout(updatedNodesArray, updatedEdgesArray);
      setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
      await animateNodePositions(updatedNodesArray, endNodes, 500);
      setFlowNodes(endNodes);
      setFlowEdges(updatedEdgesArray);
      await handleUpdateCallFlow(endNodes, updatedEdgesArray);
      saveToHistory(endNodes, updatedEdgesArray);
      flowDimensionsReverse(selectNode);
    };

    animateDeleteAndRearrange()?.catch(() => {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Error deleting component. Please try again.',
      });
    });
  }, [
    nodeSelectedForDelete?.nodeId,
    nodes,
    edges,
    setNodes,
    setEdges,
    setFlowNodes,
    setFlowEdges,
    customLayout,
    animateNodePositions,
    handleUpdateCallFlow,
    saveToHistory,
    setNodeSelectedForDelete,
    setToastAction,
    flowDimensionsReverse,
  ]);

  const undo = useCallback(() => {
    if (flowHistoryIndex > 0) {
      isUndoRedoAction.current = true;
      const prevState = flowHistory[flowHistoryIndex - 1];
      const newNodes = customLayout(prevState?.nodes, prevState?.edges);
      setNodes(newNodes);
      setEdges(prevState?.edges);
      setFlowNodes(newNodes);
      setFlowEdges(prevState?.edges);
      setFlowHistoryIndex((prevIndex) => prevIndex - 1);
      handleUpdateCallFlow(newNodes, prevState?.edges);
      setIsUpdateNode(true);
    }
  }, [
    handleUpdateCallFlow,
    flowHistory,
    flowHistoryIndex,
    setEdges,
    setFlowEdges,
    setFlowNodes,
    setNodes,
  ]);

  const redo = useCallback(() => {
    if (flowHistoryIndex < flowHistory.length - 1) {
      isUndoRedoAction.current = true;
      const nextState = flowHistory[flowHistoryIndex + 1];
      const newNodes = customLayout(nextState?.nodes, nextState?.edges);
      setNodes(newNodes);
      setEdges(nextState?.edges);
      setFlowNodes(newNodes);
      setFlowEdges(nextState?.edges);
      setFlowHistoryIndex((prevIndex) => prevIndex + 1);
      handleUpdateCallFlow(newNodes, nextState?.edges);
      setIsUpdateNode(true);
    }
  }, [
    handleUpdateCallFlow,
    flowHistory,
    flowHistoryIndex,
    setEdges,
    setFlowEdges,
    setFlowNodes,
    setNodes,
  ]);

  const handleResetZoom = useCallback(() => {
    if (fitViewport && isResetZoomEnabled) {
      const currentView = reactFlowInstance?.getViewport();
      const duration = 500;
      const steps = 30;
      let step = 0;

      const animate = () => {
        if (step < steps) {
          const progress = (step + 1) / steps;
          const newX = currentView.x + (fitViewport.x - currentView.x) * progress;
          const newY = currentView.y + (fitViewport.y - currentView.y) * progress;
          const newZoom = currentView.zoom + (fitViewport.zoom - currentView.zoom) * progress;

          reactFlowInstance?.setViewport({
            x: newX,
            y: newY,
            zoom: newZoom,
          });

          step += 1;
          setTimeout(animate, duration / steps);
        } else {
          reactFlowInstance?.setViewport({
            x: fitViewport?.x,
            y: fitViewport?.y,
            zoom: fitViewport?.zoom,
          });
          setIsResetZoomEnabled(false);
          const finalView = reactFlowInstance?.getViewport();
          setScreenViewport(finalView);
        }
      };

      animate();
    }
  }, [isResetZoomEnabled, reactFlowInstance, fitViewport]);

  const handleFitView = useCallback(() => {
    if (reactFlowInstance) {
      setFitViewport(reactFlowInstance?.getViewport());
      const nodeList = reactFlowInstance?.getNodes();
      if (nodeList?.length === 0) return;

      const MAX_ZOOM_VIEW = DEFAULT_ZOOM;
      const MIN_ZOOM_VIEW = 0.01;
      const MIN_PADDING = 15;
      const MIN_BOTTOM_PADDING = 100;
      const MAX_BOTTOM_PADDING = 200;
      const FIXED_TOP_PADDING = 30;
      const MAX_FIXED_TOP_PADDING = 30;
      const MIN_FIXED_TOP_PADDING = 10;

      const bounds = nodeList.reduce(
        (acc, node) => {
          acc.minX = Math.min(acc.minX, node.position.x);
          acc.minY = Math.min(acc.minY, node.position.y);
          acc.maxX = Math.max(acc.maxX, node.position.x + (node.width || 0));
          acc.maxY = Math.max(acc.maxY, node.position.y + (node.height || 0));
          return acc;
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
      );

      const { width: viewportWidth, height: viewportHeight } =
        containerRef.current.getBoundingClientRect();

      const contentWidth = bounds.maxX - bounds.minX;
      const contentHeight = bounds.maxY - bounds.minY;

      const leftPadding = MIN_PADDING;
      const rightPadding = Math?.max(MIN_PADDING + 100, viewportWidth - contentWidth - leftPadding);
      const width = contentWidth + leftPadding + rightPadding;
      const height = contentHeight + FIXED_TOP_PADDING + MIN_BOTTOM_PADDING;

      const xZoom = viewportWidth / width;
      const yZoom = (viewportHeight - FIXED_TOP_PADDING) / height;
      let zoom = Math?.min(xZoom, yZoom);
      zoom = Math?.min(Math?.max(zoom, MIN_ZOOM_VIEW), MAX_ZOOM_VIEW);

      const zoomFactor = (zoom - MIN_ZOOM_VIEW) / (MAX_ZOOM_VIEW - MIN_ZOOM_VIEW);
      const bottomPadding =
        MIN_BOTTOM_PADDING + (MAX_BOTTOM_PADDING - MIN_BOTTOM_PADDING) * (1 - zoomFactor);

      const topPaddingRange = MAX_FIXED_TOP_PADDING - MIN_FIXED_TOP_PADDING;
      const dynamicFixedTopPadding = MAX_FIXED_TOP_PADDING - topPaddingRange * (1 - zoomFactor);

      let x = leftPadding - bounds.minX * zoom;
      let y = dynamicFixedTopPadding - bounds.minY * zoom;

      x = Math?.min(Math?.max(x, -viewportWidth + leftPadding + rightPadding), leftPadding);
      y = Math?.max(dynamicFixedTopPadding, Math?.min(y, viewportHeight - bottomPadding));

      reactFlowInstance?.setViewport({ x, y, zoom }, { duration: 500 });
      setIsResetZoomEnabled(true);
      setScreenViewport({ x, y, zoom });
    }
  }, [reactFlowInstance]);

  const resetFlowLayout = useCallback(() => {
    const targetNodes = nodes?.filter((node) => ['incomingCall', 'node-2']?.includes(node?.id));
    if (targetNodes?.length === 2) return;

    const startNodes = [...nodes];
    const endNodes = customLayout(nodes, edges);
    animateNodePositions(startNodes, endNodes)?.then(() => {
      setNodes(endNodes);
      setFlowNodes(endNodes);
      handleUpdateCallFlow(endNodes, edges);
    });
  }, [animateNodePositions, edges, nodes, setNodes, setFlowNodes, handleUpdateCallFlow]);

  const handleZoomIn = useCallback(() => {
    reactFlowInstance?.zoomIn({ duration: 500 });
    const currentView = reactFlowInstance?.getViewport();
    setScreenViewport(currentView);
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    reactFlowInstance?.zoomOut({ duration: 500 });
    const currentView = reactFlowInstance?.getViewport();
    setScreenViewport(currentView);
  }, [reactFlowInstance]);

  const onEdgeClick = useCallback(
    (event, e) => {
      setActiveEdgeId(e?.id);
      const result = edges?.find((p) => p?.id === e?.id);
      if (result) {
        setActiveNodesDetails({ sourceId: result?.source, targetId: result?.target });
      } else {
        setActiveNodesDetails({ sourceId: '', targetId: '' });
      }
    },
    [edges, setActiveEdgeId, setActiveNodesDetails]
  );

  const onEdgeMouseEnter = useCallback(
    (event, e) => {
      if (e?.id !== lastAddedNode?.edgeId) {
        setActiveEdgeId(e?.id);
        setActiveNodesDetails({ targetId: e?.target });
      }
    },
    [lastAddedNode?.edgeId, setActiveEdgeId, setActiveNodesDetails]
  );

  const onEdgeMouseLeave = useCallback(
    (event, e) => {
      if (e?.id !== lastAddedNode?.edgeId) {
        setActiveEdgeId(null);
        setActiveNodesDetails({ sourceId: '', targetId: '' });
      }
    },
    [lastAddedNode?.edgeId, setActiveEdgeId, setActiveNodesDetails]
  );

  const onScreenMove = useCallback(
    (event, view) => {
      setScreenViewport(view);
    },
    [edges, nodes, handleUpdateCallFlow]
  );

  const handlePublishCallFlow = useCallback(() => {
    PublishCallFlow(params?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Flow has been published successfully.',
        });
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.error?.message,
          });
        }
      })
      ?.finally(() => {
        setShow({
          isVisible: false,
          type: '',
        });
      });
  }, [params?.id, setShow]);

  const handleUnPublishCallFlow = useCallback(() => {
    UnpublishCallFlow(params?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Flow has been Unpublished successfully.',
        });
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.error?.message,
          });
        }
      })
      ?.finally(() => {
        setShow({
          isVisible: false,
          type: '',
        });
      });
  }, [params?.id, setShow]);

  const handleIVRSearch = useCallback(
    (key) => {
      setIVRSearchResult(
        availableIVRMenus?.filter((ivr) => ivr?.name?.toLowerCase()?.includes(key?.toLowerCase()))
      );
    },
    [availableIVRMenus]
  );

  const handleSelectIVR = useCallback(
    (targetNodeId) => {
      const id = uuidv4();
      const newEdge = {
        id: `edge-${id}`,
        source: show?.prevNodeId,
        sourceHandle: `${show?.targetType}:source:${show?.prevNodeId}`,
        target: targetNodeId,
        targetHandle: `ivr-menu-2:target:${targetNodeId}`,
        targetType: 'ivr-menu-2',
        type: edgeAttributes?.type,
        style: edgeAttributes,
      };
      setEdges((prevEdges) => {
        const updatedEdges = [...prevEdges, newEdge];
        setFlowEdges(updatedEdges);
        const newNodes = customLayout(nodes, updatedEdges);
        handleUpdateCallFlow(newNodes, updatedEdges);
        saveToHistory(newNodes, updatedEdges);
        return updatedEdges;
      });
      setShow({ isVisible: false, type: '' });
    },
    [handleUpdateCallFlow, nodes, saveToHistory, setEdges, setFlowEdges, setShow, show]
  );

  const togglePlay = useCallback((id, parentType, url, isVoicePalying) => {
    audioRef.current.src = url;
    setSelectedVoice({
      id,
      parentType,
      url,
      isVoicePalying,
    });
    audioRef?.current?.play();
  }, []);

  const onPause = useCallback((id, parentType, url, isVoicePalying) => {
    audioRef.current.currentTime = 0;
    audioRef?.current?.pause();
    setSelectedVoice({
      id,
      parentType,
      url,
      isVoicePalying,
    });
  }, []);

  const resetAudio = useCallback(() => {
    setSelectedVoice({
      id: 'select',
      parentType: '',
      url: '',
      isVoicePalying: false,
    });
    audioRef.current.currentTime = 0;
    audioRef?.current?.pause();
  }, []);

  const handleAudioError = useCallback(() => {
    if (audioRef?.current?.src) {
      setSelectedVoice({
        id: 'select',
        parentType: '',
        url: '',
        isVoicePalying: false,
      });
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Error while loading audio',
      });
    }
  }, []);

  const handleListVendorComponents = useCallback(() => {
    setComponentsloading(true);
    ListAllComponents(search)
      ?.then((response) => {
        setVendorComponents(response?.data);
      })
      ?.finally(() => {
        setComponentsloading(false);
      });
  }, [search]);

  useEffect(() => {
    handleListVendorComponents();
  }, [handleListVendorComponents]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          agentsResponse,
          departmentsResponse,
          apiLibrariesResponse,
          callFlowsResponse,
          callerListResponse,
          voiceCategoryResponse,
          voiceLibraryResponse,
          agentAvailabilitiesResponse,
        ] = await Promise.all([
          ListAgents('telephony'),
          ListDepartments(),
          ListAllApiLibrary(),
          ListCallFlowsListWithoutPagination(),
          ListCallerList(),
          ListVoiceCategory(),
          ListAllVoiceLibrary(),
          ListAgentAvailabilitiesWithoutPagination(),
        ]);

        setAgents(agentsResponse?.data);
        setDepartments(departmentsResponse?.data);
        setApiLibraries(apiLibrariesResponse?.data);
        setCallFlows(callFlowsResponse?.data);
        setCallerList(callerListResponse?.data);
        setCallerListArray(callerListResponse?.data);
        setCategoriesList(voiceCategoryResponse?.data);
        setAllAvailableVoices(voiceLibraryResponse?.data);
        setAgentAvailabilities(agentAvailabilitiesResponse?.data);
      } catch (error) {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'Error fetching data. Please refresh the page.',
        });
      }
    };
    fetchData();
  }, [setCallerListArray, refresh]);

  useEffect(() => {
    const ivrMenuNodes = nodes?.filter((node) => node?.type === 'ivr-menu');
    setAvailableIVRMenus(ivrMenuNodes);
    setIVRSearchResult(ivrMenuNodes);
  }, [nodes]);

  useEffect(() => {
    if (active?.categoryId) {
      setLoading(true);
      ListAllVoiceLibrary(active?.fileName, active?.categoryId)
        ?.then((response) => {
          setVoiceLibraryList(response?.data);
        })
        ?.finally(() => {
          setLoading(false);
        });
    }
  }, [active?.categoryId, active?.fileName]);

  useLayoutEffect(() => {
    setCallFlowDetails({ isLoading: true, data: {} });
    GetCallFlow(params?.id)
      ?.then((response) => {
        setCallFlowDetails({ isLoading: false, data: response?.data });
      })
      ?.catch(() => {
        setCallFlowDetails({ isLoading: false, data: {} });
      });
  }, [params?.id]);

  useLayoutEffect(() => {
    const adjustView = (flow) => {
      if (flow) {
        const updates = {
          actions: flow.actions,
          connections: flow.connections,
        };
        setNodes(updates.actions);
        setFlowNodes(updates.actions);
        setEdges(updates.connections);
        setFlowEdges(updates.connections);
      }

      if (!reactFlowInstance || !containerRef?.current) {
        setIsCustomLayoutReady(true);
        setIsFlowVisible(true);
        return;
      }

      const BASE_PADDING = 15;
      const BASE_TOP_PADDING = 30;
      const MIN_PADDING = 5;

      let targetZoom = DEFAULT_ZOOM;
      let targetX = BASE_PADDING;
      let targetY = BASE_TOP_PADDING;

      if (flow?.actions?.length > 0) {
        const nodesBounds = flow.actions.reduce(
          (acc, node) => {
            const { x, y } = node.position;
            const { width = 0, height = 0 } = node;
            acc.minX = Math.min(acc.minX, x);
            acc.minY = Math.min(acc.minY, y);
            acc.maxX = Math.max(acc.maxX, x + width);
            acc.maxY = Math.max(acc.maxY, y + height);
            return acc;
          },
          { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
        );
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const contentWidth = nodesBounds.maxX - nodesBounds.minX;
        const contentHeight = nodesBounds.maxY - nodesBounds.minY;

        const horizontalZoom = containerWidth / (contentWidth + 2 * BASE_PADDING);
        const verticalZoom = containerHeight / (contentHeight + BASE_TOP_PADDING + BASE_PADDING);

        targetZoom = Math.min(horizontalZoom, verticalZoom, MAX_ZOOM);
        targetZoom = Math.max(targetZoom, MIN_ZOOM);

        const zoomFactor = (targetZoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
        const paddingScale = Math.max(zoomFactor, 0.3);
        const effectiveTopPadding = Math.max(BASE_TOP_PADDING * paddingScale, MIN_PADDING);

        targetX = (containerWidth - contentWidth * targetZoom) / 2 - nodesBounds.minX * targetZoom;
        targetY =
          (containerHeight - contentHeight * targetZoom) / 2 -
          nodesBounds.minY * targetZoom +
          effectiveTopPadding;
      }
      reactFlowInstance.setViewport({ x: targetX, y: targetY, zoom: targetZoom }, { duration: 0 });
      requestAnimationFrame(() => {
        setIsCustomLayoutReady(true);
        setIsFlowVisible(true);
      });
    };

    if (callFlowDetails?.data?.attributes?.flow && !isDataLoaded) {
      const { flow } = callFlowDetails.data.attributes;
      adjustView(flow);
      setIsDataLoaded(true);
    } else {
      adjustView(null);
    }
  }, [callFlowDetails, isDataLoaded]);

  useEffect(() => {
    if (isUpdateNode) {
      const startNodes = [...nodes];
      const endNodes = customLayout(nodes, edges);
      animateNodePositions(startNodes, endNodes);
      handleUpdateCallFlow(endNodes, edges);
      saveToHistory(endNodes, edges);
      setEdges(edges);
      setFlowEdges(edges);
      setIsUpdateNode(false);
    }
  }, [animateNodePositions, edges, isUpdateNode, nodes]);

  useEffect(() => {
    const Nodes = [...nodes];
    handleUpdateCallFlow(Nodes, edges);
  }, [isUpdateNode]);

  useEffect(() => {
    let isSubscribed = true;
    const loadFlowData = async () => {
      try {
        const response = await GetCallFlow(params?.id);
        if (!isSubscribed) return;
        const flowData = response?.data?.attributes?.flow;
        if (flowData) {
          ReactDOM.unstable_batchedUpdates(() => {
            setNodes(flowData?.actions || []);
            setFlowNodes(flowData?.actions || []);
            setEdges(flowData?.connections || []);
            setFlowEdges(flowData?.connections || []);
          });
        }
      } catch (error) {
        if (!isSubscribed) return;
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'Error loading flow data. Please refresh the page.',
        });
      }
    };
    loadFlowData();
    return () => {
      isSubscribed = false;
    };
  }, [params?.id]);

  const edgeStyles = useMemo(() => {
    const styles = {};
    edges?.forEach((edgeItem) => {
      if (edgeItem?.id === lastAddedNode?.edgeId || edgeItem?.id === activeEdgeId) {
        styles[edgeItem?.id] = { stroke: activeEdgeColor, strokeWidth: 2 };
      } else {
        styles[edgeItem?.id] = edgeAttributes;
      }
    });
    return styles;
  }, [edges, lastAddedNode?.edgeId, activeEdgeId]);

  const memoizedNodes = useMemo(() => nodes, [nodes]);

  const memoizedEdges = useMemo(
    () =>
      edges?.map((e) => ({
        ...e,
        style: edgeStyles[e?.id] || edgeAttributes,
      })),
    [edges, edgeStyles]
  );

  const renderFlow = useCallback(
    () => (
      <ReactFlow
        key={flowRefreshKey}
        nodes={memoizedNodes}
        edges={memoizedEdges}
        nodeTypes={customNodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={onNodesDragEnd}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onMoveEnd={onScreenMove}
        snapToGrid
        snapGrid={[15, 15]}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomOnDoubleClick={false}
        defaultViewport={{
          x: screenViewport?.x,
          y: screenViewport?.y,
          zoom: screenViewport?.zoom,
        }}
      />
    ),
    [
      memoizedNodes,
      memoizedEdges,
      onNodesChange,
      onNodesDragEnd,
      onConnect,
      onEdgeClick,
      onEdgeMouseEnter,
      onEdgeMouseLeave,
    ]
  );

  return (
    <Layout
      title="comm voice"
      headerTitle="Call Flows"
      favIcon="/assets/favIcons/favicon-voice.ico"
      active="/app/comm-voice-admin/call-flow"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <Audio
        audioRef={audioRef}
        selectedVoice={selectedVoice}
        handleAudioError={handleAudioError}
        setSelectedVoice={setSelectedVoice}
      />
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit flows-pad-mob">
        <div id="flow-builder-main" className="col-lg-12">
          <div className="row h-100">
            <div className="col-12">
              <div className="row">
                <div className="call-header-outer">
                  <Subhead
                    id={callFlowDetails?.data?.id}
                    name={callFlowDetails?.data?.attributes?.name}
                    isPublished={callFlowDetails?.data?.attributes?.is_published}
                    status={callFlowDetails?.data?.attributes?.status}
                    formik={formik}
                    loading={false}
                  />
                </div>
                <div className="main-body-outer p-3">
                  <div
                    ref={containerRef}
                    onContextMenu={handleRightClick}
                    className={`main-body-inner scroll-custom shadow-3  ${
                      callFlowDetails?.isLoading ? 'd-none' : ''
                    }`}
                    style={{
                      paddingTop: '0',
                      paddingBottom: '0',
                      paddingLeft: '0',
                      paddingRight: '0',
                    }}
                  >
                    <ActionButtons>
                      <CallFlowsAutoArrange setToDefaultLayout={resetFlowLayout} />
                      <CallFlowsFitScreen setToDefaultLayout={handleFitView} />
                      <CallFlowsResetZoom
                        setToDefaultLayout={handleResetZoom}
                        isEnabled={isResetZoomEnabled}
                      />
                      <CallFlowsRedo
                        setToDefaultLayout={redo}
                        isEnabled={flowHistoryIndex < flowHistory.length - 1}
                      />
                      <CallFlowsUndo setToDefaultLayout={undo} isEnabled={flowHistoryIndex > 0} />
                      <CallFlowsZoomIn setToDefaultLayout={handleZoomIn} />
                      <CallFlowsZoomOut setToDefaultLayout={handleZoomOut} />
                    </ActionButtons>
                    {isCustomLayoutReady && isFlowVisible && renderFlow()}
                  </div>
                  {(callFlowDetails?.isLoading || !isCustomLayoutReady || !isFlowVisible) && (
                    <div className="main-body-inner scroll-custom shadow-3 d-flex align-items-center justify-content-center">
                      <SpinningLoader />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComponentSelectPopup
        isVisible={show?.isVisible && show?.type === 'select-components'}
        vendorComponents={vendorComponents}
        setSearch={setSearch}
        search={search}
        componentsloading={componentsloading}
        iVRSearchResult={iVRSearchResult}
        handleIVRSearch={handleIVRSearch}
        handleSelectIVR={handleSelectIVR}
      />

      <Modals
        show={show}
        setShow={setShow}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setRefresh={setRefresh}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        resetAudio={resetAudio}
        allAvailableVoices={allAvailableVoices}
        onSelect={handleAddComponent}
        onUpdate={handleUpdateNode}
        callerList={callerList}
        setLoading={setLoading}
        departments={departments}
        agents={agents}
        apiLibraries={apiLibraries}
        agentAvailabilities={agentAvailabilities}
        SMSSenderID={SMSSenderID}
        callFlows={callFlows}
        nodeSelectedForDelete={nodeSelectedForDelete}
        setNodeSelectedForDelete={setNodeSelectedForDelete}
        handleDeleteComponent={handleDeleteComponent}
        handleRemoveConnections={handleRemoveConnections}
        handlePublishCallFlow={handlePublishCallFlow}
        handleUnPublishCallFlow={handleUnPublishCallFlow}
        setCategoriesList={setCategoriesList}
      />

      <TestFlowModal
        isVisible={show?.isVisible && show?.type === 'test-flow'}
        nodes={nodes}
        edges={edges}
        callFlowName={callFlowDetails?.data?.attributes?.name}
        callFlowId={callFlowDetails?.data?.id}
        isPublished={callFlowDetails?.data?.attributes?.is_published}
        allAvailableVoices={allAvailableVoices}
        onClose={() => setShow({ isVisible: false, type: '' })}
      />

      {toastAction?.isVisible &&
        (toastAction?.type === 'success' ? (
          <ToastSuccess
            id="RenameWidgetMsg"
            onClose={() => setToastAction({ isVisible: false, message: '' })}
            showToast={toastAction?.isVisible}
          >
            <span>{toastAction?.message}</span>
          </ToastSuccess>
        ) : (
          <ToastError
            id="RenameWidgetMsg"
            onClose={() => setToastAction({ isVisible: false, message: '' })}
            showToast={toastAction?.isVisible}
            isSuccess={false}
          >
            <span>{toastAction?.message}</span>
          </ToastError>
        ))}
    </Layout>
  );
}

function TestFlow() {
  return (
    <ReactFlowProvider>
      <TestFlows />
    </ReactFlowProvider>
  );
}

export default TestFlow;
