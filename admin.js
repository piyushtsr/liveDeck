const handleMuteClick = (participantId) => {
    socket.emit('mute-participant', { roomId, participantId });
  };
  
  // Socket event listener for notifying the client of mute/unmute status change
  socket.on('participant-muted', ({ participantId, isMuted }) => {
    // Update UI to reflect the change in mute/unmute status
  });
  
  // Socket event listener for notifying the client that they have been muted
  socket.on('you-are-muted', () => {
    // Disable audio input and display a message to the user
  });
  socket.on('mute-participant', ({ roomId, participantId }) => {
    const room = getRoomById(roomId);
    const participant = room.getParticipantById(participantId);
    const isMuted = !participant.isMuted; // toggle mute/unmute status
  
    // Update participant's mute/unmute status in the room's state
    participant.isMuted = isMuted;
  
    // Emit socket events to all participants in the room to notify them of the change in mute/unmute status
    io.in(roomId).emit('participant-muted', { participantId, isMuted });
  
    // If the participant is being muted, also emit a socket event to the muted participant to notify them
    if (isMuted) {
      io.to(participant.socketId).emit('you-are-muted');
    }
  });