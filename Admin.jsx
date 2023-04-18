

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const AdminPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('/');
    setSocket(newSocket);

    newSocket.emit('getRooms');

    newSocket.on('roomsList', (rooms) => {
      setRooms(rooms);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = (roomId) => {
    // Handle joining the room
  };

  const muteUser = (userId) => {
    // Handle muting the user
  };

  const kickUser = (userId) => {
    // Handle kicking the user
  };

  return (
    <div>
      <h3>Active Rooms</h3>
      <ListGroup>
        {rooms.map((room) => (
          <ListGroupItem key={room.id}>
            {room.title}{' '}
            <Button onClick={() => joinRoom(room.id)}>Join Room</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminPanel;
