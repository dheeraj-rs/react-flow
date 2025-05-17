import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import ReactFlow, { Background, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import SuccessBadge from '../../common/components/badges/SuccessBadge';
import IncomingCall from '../Test/TestFlowComponents/IncomingCall';
import Greetify from '../Test/TestFlowComponents/Greetify';
import IVRMenu from '../Test/TestFlowComponents/IVRMenu';
import Connect from '../Test/TestFlowComponents/Connect';
import Hours from '../Test/TestFlowComponents/Hours';
import VoiceMail from '../Test/TestFlowComponents/VoiceMail';
import Email from '../Test/TestFlowComponents/Email';
import CallerID from '../Test/TestFlowComponents/CallerID';
import CallerList from '../Test/TestFlowComponents/CallerList';
import Shortcut from '../Test/TestFlowComponents/Shortcut';
import GetValue from '../Test/TestFlowComponents/GetValue';
import Passthru from '../Test/TestFlowComponents/Passthru';
import Sms from '../Test/TestFlowComponents/Sms';
import SendSMS from '../Test/TestFlowComponents/SendSMS';
import Queue from '../Test/TestFlowComponents/Queue';
import HangUp from '../Test/TestFlowComponents/HangUp';
import GoToFlow from '../Test/TestFlowComponents/GoToFlow';
import Callback from '../Test/TestFlowComponents/Callback';
import CallPlaying from './CallPlaying';
import useStore from '../Test/store';
import { getEdges } from '../../common/helpers/utils';

function Start() {
  return <div className="d-none" />;
}

const START_X = 0;
const START_Y = 50;
const CHILD_GAP_X = 200;

function TestFlowModal({
  isVisible = false,
  nodes = [],
  edges = [],
  callFlowName = '',
  callFlowId = '',
  isPublished = false,
  allAvailableVoices = [],
  onClose,
}) {
  const ivrAudioRef = useRef();
  const { setCenter } = useReactFlow();
  const { setActiveVoiceUrl, setActiveNodeId } = useStore();
  const [isFlowStop, setIsFlowStop] = useState(false);
  const [isFlowEnded, setIsFlowEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState([
    {
      id: 'incomingCall',
      position: { x: START_X, y: START_Y },
      type: 'incomingCall',
      data: { label: 'Incoming Call' },
      width: 300,
      height: 80,
      rank: 0,
      draggable: false,
      column: 1,
    },
  ]);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const nodeTypes = useMemo(
    () => ({
      incomingCall: IncomingCall,
      start: Start,
      greetify: Greetify,
      'ivr-menu': IVRMenu,
      connect: Connect,
      hours: Hours,
      voicemail: VoiceMail,
      email: Email,
      'caller-id': CallerID,
      'caller-list': CallerList,
      shortcut: Shortcut,
      'get-value': GetValue,
      passthru: Passthru,
      sms: Sms,
      'send-sms': SendSMS,
      queue: Queue,
      'hang-up': HangUp,
      'goto-flow': GoToFlow,
      callBack: Callback,
    }),
    []
  );

  const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsFlowStop(true);
    setIsPaused(true);
    if (ivrAudioRef.current) {
      ivrAudioRef.current.pause();
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setIsFlowStop(false);
    setIsPaused(false);
    setIsFlowEnded(false);
    setTime(0);
    setCurrentNodeIndex(0);
    setVisibleNodes([
      {
        id: 'incomingCall',
        position: { x: START_X, y: START_Y },
        type: 'incomingCall',
        data: { label: 'Incoming Call' },
        width: 300,
        height: 80,
        rank: 0,
        draggable: false,
        column: 1,
      },
    ]);
    if (ivrAudioRef.current) {
      ivrAudioRef.current.src = '';
    }
  }, []);

  const handleOnClose = useCallback(() => {
    handleReset();
    onClose();
  }, [handleReset, onClose]);

  const handleFlowEnd = useCallback(() => {
    setIsFlowStop(true);
    setIsRunning(false);
    setIsFlowEnded(true);
  }, []);

  const moveToNextNode = useCallback(
    (nodeId) => {
      if (isPaused) return;
      try {
        const nextNode = nodes.find((e) => e?.id === nodeId);
        if (nextNode) {
          const lastNode = visibleNodes[visibleNodes.length - 1];
          const newX = lastNode.position.x + CHILD_GAP_X;
          const newY = lastNode.position.y;
          setVisibleNodes((prevArray) => {
            const newNode = {
              ...nextNode,
              position: { x: newX, y: newY },
            };
            const newNodes = [...prevArray, newNode];
            setTimeout(() => {
              if (newNodes.length > 1) {
                const lastTwoNodes = newNodes.slice(-2);
                const centerX = (lastTwoNodes[0].position.x + lastTwoNodes[1].position.x) / 2;
                const centerY = (lastTwoNodes[0].position.y + lastTwoNodes[1].position.y) / 2;
                const nodeWidth = 300;
                const nodeHeight = 80;
                const horizontalPadding = 50;
                const verticalPadding = 30;
                const viewportWidth = document.querySelector('.react-flow__renderer')?.clientWidth;
                const viewportHeight =
                  document.querySelector('.react-flow__renderer')?.clientHeight;
                if (!viewportWidth || !viewportHeight) {
                  return;
                }
                const zoomLevel = Math.min(
                  (viewportWidth - horizontalPadding) / (nodeWidth * 3 + CHILD_GAP_X * 2),
                  (viewportHeight - verticalPadding) / nodeHeight,
                  1
                );
                setCenter(centerX + nodeWidth / 4, centerY + nodeHeight / 2, {
                  zoom: zoomLevel,
                  duration: 300,
                });
              }
            }, 50);
            setCurrentNodeIndex((prevIndex) => prevIndex + 1);
            return newNodes;
          });
        } else {
          handleStop();
        }
      } catch (error) {
        // console.error('Error in moveToNextNode:', error);
        handleStop();
      }
    },
    [nodes, visibleNodes, setCenter, handleStop, isPaused]
  );

  const onPlay = useCallback((voiceUrl) => {
    if (!ivrAudioRef.current) return Promise.reject(new Error('Audio reference not found'));

    const audio = ivrAudioRef.current;
    audio.src = voiceUrl;

    return new Promise((resolve, reject) => {
      audio.onended = () => resolve('Audio playback completed');
      audio.onerror = reject;
      audio.play().catch(reject);
    });
  }, []);

  const stopAudio = useCallback(() => {
    if (ivrAudioRef.current) {
      ivrAudioRef.current.pause();
      ivrAudioRef.current.currentTime = 0;
    }
    setIsVoicePlaying(false);
  }, []);

  const handleNodeAction = useCallback(
    (visibleNodeDetails) => {
      if (isPaused) return;
      try {
        setActiveNodeId(visibleNodeDetails?.id);
        switch (visibleNodeDetails?.type) {
          case 'greetify': {
            const { voiceId } = visibleNodeDetails.details;
            const result = allAvailableVoices.find((e) => e.id === voiceId);
            const targetId = edges.find((e) => e.source === visibleNodeDetails?.id)?.target;
            setIsVoicePlaying(true);
            onPlay(result?.attributes?.voice_file_media_url || result?.attributes?.url)
              .then(() => {
                moveToNextNode(targetId);
              })
              .finally(() => {
                setIsVoicePlaying(false);
              });
            break;
          }
          case 'ivr-menu': {
            const { initialVoiceId, noResponseVoiceId, wrongResponseVoiceId } =
              visibleNodeDetails.details;
            const initialVoice = allAvailableVoices.find((e) => e.id === initialVoiceId);
            const noResponseVoice = allAvailableVoices.find((e) => e.id === noResponseVoiceId);
            const wrongResponseVoice = allAvailableVoices.find(
              (e) => e.id === wrongResponseVoiceId
            );
            setActiveVoiceUrl({
              initialVoice:
                initialVoice?.attributes?.voice_file_media_url || initialVoice?.attributes?.url,
              noResponseVoice:
                noResponseVoice?.attributes?.voice_file_media_url ||
                noResponseVoice?.attributes?.url,
              wrongResponseVoice:
                wrongResponseVoice?.attributes?.voice_file_media_url ||
                wrongResponseVoice?.attributes?.url,
            });
            break;
          }
          case 'voicemail': {
            const { voiceId } = visibleNodeDetails.details;
            const voice = allAvailableVoices.find((e) => e.id === voiceId);
            setActiveVoiceUrl({
              voice: voice?.attributes?.voice_file_media_url || voice?.attributes?.url,
            });
            break;
          }
          case 'caller-list': {
            const targetId = edges.find((e) => e.source === visibleNodeDetails?.id)?.target;
            moveToNextNode(targetId);
            break;
          }
          case 'caller-id':
          case 'shortcut':
          case 'goto-flow':
            break;
          case 'callBack': {
            const { initialVoiceId, declineVoiceId, confirmationVoiceId, timeoutVoiceId } =
              visibleNodeDetails.details;
            const initialVoice = allAvailableVoices.find((e) => e.id === initialVoiceId);
            const declineVoice = allAvailableVoices.find((e) => e.id === declineVoiceId);
            const confirmationVoice = allAvailableVoices.find((e) => e.id === confirmationVoiceId);
            const timeoutVoice = allAvailableVoices.find((e) => e.id === timeoutVoiceId);
            setActiveVoiceUrl({
              initialVoice:
                initialVoice?.attributes?.voice_file_media_url || initialVoice?.attributes?.url,
              declineVoice:
                declineVoice?.attributes?.voice_file_media_url || declineVoice?.attributes?.url,
              confirmationVoice:
                confirmationVoice?.attributes?.voice_file_media_url ||
                confirmationVoice?.attributes?.url,
              timeoutVoice:
                timeoutVoice?.attributes?.voice_file_media_url || timeoutVoice?.attributes?.url,
            });
            break;
          }
          case 'email': {
            const targetId = edges.find((e) => e.source === visibleNodeDetails?.id)?.target;
            moveToNextNode(targetId);
            break;
          }
          case 'get-value': {
            const { initialVoiceId, timeIntervalVoiceId, repeatVoiceId, noResponseVoiceId } =
              visibleNodeDetails.details;
            const initialVoice = allAvailableVoices.find((e) => e.id === initialVoiceId);
            const timeIntervalVoice = allAvailableVoices.find((e) => e.id === timeIntervalVoiceId);
            const repeatVoice = allAvailableVoices.find((e) => e.id === repeatVoiceId);
            const noResponseVoice = allAvailableVoices.find((e) => e.id === noResponseVoiceId);
            setActiveVoiceUrl({
              initialVoice:
                initialVoice?.attributes?.voice_file_media_url || initialVoice?.attributes?.url,
              timeIntervalVoice:
                timeIntervalVoice?.attributes?.voice_file_media_url ||
                timeIntervalVoice?.attributes?.url,
              repeatVoice:
                repeatVoice?.attributes?.voice_file_media_url || repeatVoice?.attributes?.url,
              noResponseVoice:
                noResponseVoice?.attributes?.voice_file_media_url ||
                noResponseVoice?.attributes?.url,
            });
            if (visibleNodeDetails.details.url !== 'url') {
              // Add any specific logic here if needed
            }
            break;
          }
          case 'hang-up':
            handleFlowEnd();
            break;
          default:
            break;
        }
      } catch (error) {
        handleStop();
      }
    },
    [
      edges,
      moveToNextNode,
      allAvailableVoices,
      onPlay,
      setActiveNodeId,
      setActiveVoiceUrl,
      handleFlowEnd,
      handleStop,
      isPaused,
      setIsVoicePlaying,
    ]
  );

  const handleStart = useCallback(() => {
    try {
      if (isFlowStop) {
        if (isPaused) {
          setIsRunning(true);
          setIsFlowStop(false);
          setIsPaused(false);
          handleNodeAction(visibleNodes[currentNodeIndex]);
        } else {
          setIsRunning(true);
          setIsFlowStop(false);
          setIsPaused(false);
          setTime(0);
          setCurrentNodeIndex(0);
          setVisibleNodes([
            {
              id: 'incomingCall',
              position: { x: START_X, y: START_Y },
              type: 'incomingCall',
              data: { label: 'Incoming Call' },
              width: 300,
              height: 80,
              rank: 0,
              draggable: false,
              column: 1,
            },
          ]);
          if (ivrAudioRef.current) {
            ivrAudioRef.current.src = '';
          }
        }
      } else if (!isRunning) {
        setIsRunning(true);
        setIsPaused(false);
      }
    } catch (error) {
      handleStop();
    }
  }, [
    isFlowStop,
    isRunning,
    isPaused,
    currentNodeIndex,
    visibleNodes,
    handleNodeAction,
    handleStop,
  ]);

  useEffect(() => {
    let interval;
    if (isRunning && !isFlowStop && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isFlowStop, isPaused]);

  useEffect(() => {
    if (
      isRunning === true &&
      !isPaused &&
      visibleNodes.length === 1 &&
      visibleNodes[0]?.type === 'incomingCall'
    ) {
      try {
        const result = getEdges('incomingCall', edges)[0];
        if (result) {
          moveToNextNode(result?.target);
        } else {
          // console.warn('No edge found for incoming call');
        }
      } catch (error) {
        handleStop();
      }
    }
  }, [isRunning, isPaused, edges, moveToNextNode, visibleNodes, handleStop]);

  useEffect(() => {
    if (isRunning && !isPaused && visibleNodes.length > 0) {
      try {
        const visibleNodeDetails = visibleNodes[currentNodeIndex];
        handleNodeAction(visibleNodeDetails);
      } catch (error) {
        handleStop();
      }
    }
  }, [isRunning, isPaused, visibleNodes, currentNodeIndex, handleNodeAction, handleStop]);

  if (!isVisible) return null;

  return (
    <>
      <audio ref={ivrAudioRef} controls style={{ display: 'none' }}>
        <track kind="captions" />
        <source src={ivrAudioRef?.current?.src} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div
        className="modal fade show"
        id="testFlowModalHeader"
        tabIndex="-1"
        aria-labelledby="testFlow"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content p-2">
            <div className="modal-header border-bottom-0 pb-0 gap-4 flex-wrap">
              <div className="d-flex gap-4 align-items-center flex-wrap">
                <h5 className="modal-title" id="exampleModalLabel">
                  Test Flow
                </h5>
                <p className="mb-0">{callFlowName}</p>
                <p className="mb-0">Flow ID: {callFlowId}</p>
                {isPublished && <SuccessBadge title="Published" />}
              </div>
              <div>
                <a
                  href="/#"
                  className="text-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img
                    src="/assets/PencilSimpleLineicon.svg"
                    className="bg-chat-blue rounded p-1 modify-img"
                    alt=""
                  />
                  Modify Flow
                </a>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleOnClose}
              />
            </div>
            <div className="modal-body pt-0">
              <div className="row">
                <div className="col-lg-8 col-sm-8">
                  <div
                    className="bg-light-blue2 rounded mt-3 p-3 call-status-wrap d-flex align-items-center gap-3"
                    style={{ width: '100%', height: '400px' }}
                  >
                    <ReactFlow
                      nodes={visibleNodes}
                      edges={edges}
                      nodeTypes={nodeTypes}
                      fitView={false}
                      minZoom={1}
                      maxZoom={2}
                      defaultzoom={1}
                      attributionPosition="bottom-left"
                    >
                      <Background color="#e9f1fe" />
                    </ReactFlow>
                  </div>
                </div>
                <CallPlaying
                  activeNodeType={visibleNodes[currentNodeIndex]?.type}
                  activeNodeId={visibleNodes[currentNodeIndex]?.id}
                  time={time}
                  handleStart={handleStart}
                  handleStop={handleStop}
                  handleReset={handleReset}
                  currentTime={ivrAudioRef?.current?.currentTime}
                  duration={ivrAudioRef?.current?.duration}
                  isVoicePlaying={isVoicePlaying}
                  setIsVoicePlaying={setIsVoicePlaying}
                  edges={edges}
                  nodes={nodes}
                  moveToNextNode={moveToNextNode}
                  onPlay={onPlay}
                  stopAudio={stopAudio}
                  isFlowStop={isFlowStop}
                  isRunning={isRunning}
                  isPaused={isPaused}
                  isFlowEnded={isFlowEnded}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}

function WrappedTestFlowModal({
  isVisible,
  nodes,
  edges,
  callFlowName,
  callFlowId,
  isPublished,
  allAvailableVoices,
  onClose,
}) {
  return (
    <ReactFlowProvider>
      <TestFlowModal
        isVisible={isVisible}
        nodes={nodes}
        edges={edges}
        callFlowName={callFlowName}
        callFlowId={callFlowId}
        isPublished={isPublished}
        allAvailableVoices={allAvailableVoices}
        onClose={onClose}
      />
    </ReactFlowProvider>
  );
}

export default WrappedTestFlowModal;
