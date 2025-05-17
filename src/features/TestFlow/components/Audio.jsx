import React from 'react';

function Audio({ audioRef, selectedVoice, handleAudioError, setSelectedVoice }) {
  const handleAudioEnd = () => {
    setSelectedVoice((prev) => ({
      ...prev,
      isVoicePalying: false,
    }));
  };
  return (
    <audio
      ref={audioRef}
      controls
      style={{ display: 'none' }}
      onError={handleAudioError}
      onEnded={handleAudioEnd}
    >
      <track kind="captions" />
      <source src={selectedVoice?.url} type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default Audio;
