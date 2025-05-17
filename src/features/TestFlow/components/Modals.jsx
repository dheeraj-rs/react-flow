import React, { useState } from 'react';
import GreetifyModal from '../../CommVoiceAdmin/components/modals/GreetifyModal';
import CallerIdModal from '../../CommVoiceAdmin/components/modals/CallerIdModal';
import IVRMenuModal from '../../CommVoiceAdmin/components/modals/IVRMenuModal';
import ConnectModal from '../../CommVoiceAdmin/components/modals/ConnectModal';
import HoursModal from '../../CommVoiceAdmin/components/modals/HoursModal';
import VoiceMailModal from '../../CommVoiceAdmin/components/modals/VoiceMailModal';
import EmailModal from '../../CommVoiceAdmin/components/modals/EmailModal';
import CallerListModal from '../../CommVoiceAdmin/components/modals/CallerListModal';
import HangUpModal from '../../CommVoiceAdmin/components/modals/HangUpModal';
import ShortcutModal from '../../CommVoiceAdmin/components/modals/ShortcutModal';
import GetValueModalNew from '../../CommVoiceAdmin/components/modals/GetValueModalNew';
import PassThruModal from '../../CommVoiceAdmin/components/modals/PassThruModal';
import GoToFlowModal from '../../CommVoiceAdmin/components/modals/GoToFlowModal';
import CallBackModal from '../../CommVoiceAdmin/components/modals/CallBackModal';
import CommonModal from '../../../common/components/modals/CommonModal';
import PublishFlowModal from '../../CommVoiceAdmin/components/flow/PublishFlowModal';
import UnpublishFlowModal from '../../CommVoiceAdmin/components/flow/UnpublishFlowModal';
import AddVoiceNewModal from '../../CommVoiceAdmin/components/modals/AddVoiceNewModal';
import QueueModal from '../../CommVoiceAdmin/components/modals/QueueModal';

function Modals({
  show = {},
  setShow,
  categoriesList = [],
  voiceLibraryList = [],
  setVoiceLibraryList,
  active,
  setActive,
  loading = false,
  togglePlay,
  selectedVoice,
  onPause,
  resetAudio,
  allAvailableVoices = [],
  isDataSubmiting = false,
  onSelect,
  onUpdate,
  callerList = [],
  setLoading,
  departments = [],
  agents = [],
  apiLibraries = {},
  agentAvailabilities = [],
  SMSSenderID = [],
  callFlows = [],
  nodeSelectedForDelete = '',
  setNodeSelectedForDelete,
  handleDeleteComponent,
  handleRemoveConnections,
  handlePublishCallFlow,
  handleUnPublishCallFlow,
  setCategoriesList,
  setRefresh,
}) {
  const [showModal, setShowModal] = useState({ isVisible: false, type: '' });

  return (
    <>
      <GreetifyModal
        isVisible={show?.isVisible && (show?.type === 'Greetify' || show?.type === 'greetify')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        onClose={() => {}}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        resetAudio={resetAudio}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
        setRefresh={setRefresh}
      />

      <IVRMenuModal
        isVisible={show?.isVisible && (show?.type === 'IVR menu' || show?.type === 'ivr-menu')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        onClose={() => {}}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        resetAudio={resetAudio}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <ConnectModal
        isVisible={show?.isVisible && (show?.type === 'Connect' || show?.type === 'connect')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
        departments={departments}
        agents={agents}
        apiLibraries={apiLibraries}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <HoursModal
        isVisible={show?.isVisible && (show?.type === 'Hours' || show?.type === 'hours')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        agentAvailabilities={agentAvailabilities}
        isDataSubmiting={isDataSubmiting}
      />

      <VoiceMailModal
        isVisible={show?.isVisible && (show?.type === 'Voicemail' || show?.type === 'voicemail')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        departments={departments}
        agents={agents}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <EmailModal
        isVisible={show?.isVisible && (show?.type === 'Email' || show?.type === 'email')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        departments={departments}
        isDataSubmiting={isDataSubmiting}
      />

      <CallerIdModal
        isVisible={show?.isVisible && (show?.type === 'Caller ID' || show?.type === 'caller-id')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        callerList={callerList}
        isDataSubmiting={isDataSubmiting}
      />

      <CallerListModal
        isVisible={
          show?.isVisible && (show?.type === 'Caller List' || show?.type === 'caller-list')
        }
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        callerList={callerList}
        isDataSubmiting={isDataSubmiting}
      />

      <HangUpModal
        isVisible={show?.isVisible && (show?.type === 'Hangup' || show?.type === 'hang-up')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        SMSSenderID={SMSSenderID}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <ShortcutModal
        isVisible={show?.isVisible && (show?.type === 'Shortcut' || show?.type === 'shortcut')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        isDataSubmiting={isDataSubmiting}
      />

      <GetValueModalNew
        isVisible={show?.isVisible && (show?.type === 'Get value' || show?.type === 'get-value')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        apiLibraries={apiLibraries}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <PassThruModal
        isVisible={show?.isVisible && (show?.type === 'Passthru' || show?.type === 'passthru')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        apiLibraries={apiLibraries}
        isDataSubmiting={isDataSubmiting}
      />

      <GoToFlowModal
        isVisible={show?.isVisible && (show?.type === 'Go to flow' || show?.type === 'go-to-flow')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        callFlows={callFlows}
        isDataSubmiting={isDataSubmiting}
      />

      <CallBackModal
        isVisible={show?.isVisible && (show?.type === 'Callback' || show?.type === 'callBack')}
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <QueueModal
        isVisible={show?.isVisible && (show?.type === 'Queue' || show?.type === 'queue')}
        onSelect={(data) => {
          onSelect(data);
        }}
        categoriesList={categoriesList}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
        setShowModal={setShowModal}
        showModal={showModal?.type === 'add-voice' && showModal?.isVisible}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible && nodeSelectedForDelete?.type === 'remove-connection'
        }
        title="Remove Connection"
        actionType="Remove "
        text=" the Connection."
        label="To confirm this action please type “Remove”"
        btnLabel="Remove"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Remove"
        isProcessing={isDataSubmiting}
        handleAction={() => {
          handleRemoveConnections();
        }}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible && nodeSelectedForDelete?.type === 'delete-node'
        }
        title="Delete Component"
        actionType="Delete "
        text=" the Component."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Delete"
        isProcessing={false}
        handleAction={() => {
          handleDeleteComponent();
        }}
      />

      <PublishFlowModal
        isVisible={show?.isVisible && show?.type === 'publish-call-flow'}
        name={show?.name}
        onPublish={() => {
          handlePublishCallFlow();
        }}
        loading={loading}
        onClose={() => {
          setShow({
            isVisible: false,
            type: '',
          });
        }}
      />

      <UnpublishFlowModal
        isVisible={show?.isVisible && show?.type === 'unpublish-call-flow'}
        name={show?.name}
        onUnPublish={() => {
          handleUnPublishCallFlow();
        }}
        loading={loading}
        onClose={() => {
          setShow({
            isVisible: false,
            type: '',
          });
        }}
      />

      <AddVoiceNewModal
        isShow={showModal?.type === 'add-voice' && showModal?.isVisible}
        onClose={() => setShowModal({ isVisible: false, type: '' })}
        categoriesList={categoriesList}
        setCategoriesList={setCategoriesList}
        setReloding={setRefresh}
      />
    </>
  );
}

export default Modals;
