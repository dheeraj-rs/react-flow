import React from 'react';

import CallPlayingHeader from './CallPlayingHeader';
import IncomingCall from '../Test/ComponentPlayingComponents/IncomingCall';
import Hours from '../Test/ComponentPlayingComponents/Hours';
import Greetify from '../Test/ComponentPlayingComponents/Greetify';
import IVRMenu from '../Test/ComponentPlayingComponents/IVRMenu';
import Connect from '../Test/ComponentPlayingComponents/Connect';
import HangUp from '../Test/ComponentPlayingComponents/HangUp';
import Voicemail from '../Test/ComponentPlayingComponents/Voicemail';
import CallerID from '../Test/ComponentPlayingComponents/CallerID';
import Shortcut from '../Test/ComponentPlayingComponents/Shortcut';
import Passthru from '../Test/ComponentPlayingComponents/Passthru';
import SMS from '../Test/ComponentPlayingComponents/SMS';
import BulkSMS from '../Test/ComponentPlayingComponents/BulkSMS';
import Timer from '../Test/TestFlowComponents/Timer';
import Callback from '../Test/ComponentPlayingComponents/Callback';
import GetValue from '../Test/ComponentPlayingComponents/GetValue';

function CallPlaying({
  activeNodeType = '',
  activeNodeId = '',
  time = 0,
  handleStart,
  handleStop,
  handleReset,
  currentTime = 0,
  duration = 0,
  isVoicePalying = false,
  setIsVoicePalying = () => {},
  edges = [],
  nodes = [],
  moveToNextNode,
  onPlay,
  stopAudio,
}) {
  return (
    <div className="col-lg-4 col-sm-4">
      <CallPlayingHeader
        handleStart={handleStart}
        handleStop={handleStop}
        handleReset={handleReset}
      />
      <div className="mt-3 shadow-11 rounded call-playing" id="callIncoming">
        <Timer time={time} />
        <IncomingCall isVisible={activeNodeType === 'incomingCall'} />
        <Hours
          isVisible={activeNodeType === 'hours'}
          edges={edges}
          activeNodeId={activeNodeId}
          moveToNextNode={moveToNextNode}
        />
        <Greetify
          isVisible={activeNodeType === 'greetify'}
          currentTime={currentTime}
          duration={duration}
          isVoicePalying={isVoicePalying}
        />
        <IVRMenu
          isVisible={activeNodeType === 'ivr-menu'}
          currentTime={currentTime}
          duration={duration}
          isVoicePalying={isVoicePalying}
          setIsVoicePalying={setIsVoicePalying}
          edges={edges}
          nodes={nodes}
          activeNodeId={activeNodeId}
          moveToNextNode={moveToNextNode}
          onPlay={onPlay}
          stopAudio={stopAudio}
        />
        <Connect
          isVisible={activeNodeType === 'connect'}
          edges={edges}
          activeNodeId={activeNodeId}
          moveToNextNode={moveToNextNode}
        />
        <HangUp isVisible={activeNodeType === 'hang-up'} handleStop={() => {}} />
        <Voicemail
          isVisible={activeNodeType === 'voicemail'}
          currentTime={currentTime}
          duration={duration}
          isVoicePalying={isVoicePalying}
          nodes={nodes}
          edges={edges}
          moveToNextNode={moveToNextNode}
          onPlay={onPlay}
          stopAudio={stopAudio}
        />
        <CallerID
          isVisible={activeNodeType === 'caller-id'}
          nodes={nodes}
          edges={edges}
          moveToNextNode={moveToNextNode}
        />
        <Shortcut
          isVisible={activeNodeType === 'shortcut'}
          nodes={nodes}
          edges={edges}
          moveToNextNode={moveToNextNode}
        />
        <Callback
          isVisible={activeNodeType === 'callBack'}
          currentTime={currentTime}
          duration={duration}
          isVoicePalying={isVoicePalying}
          edges={edges}
          nodes={nodes}
          activeNodeId={activeNodeId}
          moveToNextNode={moveToNextNode}
          onPlay={onPlay}
          stopAudio={stopAudio}
        />
        <GetValue
          isVisible={activeNodeType === 'get-value'}
          currentTime={currentTime}
          duration={duration}
          isVoicePalying={isVoicePalying}
          edges={edges}
          nodes={nodes}
          activeNodeId={activeNodeId}
          moveToNextNode={moveToNextNode}
          onPlay={onPlay}
          stopAudio={stopAudio}
        />
        <Passthru
          isVisible={activeNodeType === 'passthru'}
          nodes={nodes}
          edges={edges}
          moveToNextNode={moveToNextNode}
        />
        <SMS isVisible={activeNodeType === 'sms'} />
        <BulkSMS isVisible={activeNodeType === 'send-sms'} />
      </div>
    </div>
  );
}

export default CallPlaying;
