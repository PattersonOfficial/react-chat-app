import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { Container, Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io();

const Chat = () => {
    
    const { userData, setUserData } = useContext(UserContext);

     const [chatUsers, setChatUsers] = useState([]);

     const [chatMessage, setChatMessage] = useState({
       name: '',
       msg: '',
       room: '',
       isPrivate: false,
     });

     useEffect(() => {
         console.log(userData);
       socket.emit('userJoin', userData.user.name);
     }, []);



  const [messageList, setMessageList] = useState([]);

  const [currentRoom, setCurrentRoom] = useState('');


// listening for new and current users in the system
   socket.on('userList', (userList) => {
     setChatUsers(userList);
     setChatMessage({ name: userData.user.name, msg: chatMessage.msg });
   });

   const handleChange = (e) => {
     setChatMessage({ ...chatMessage, [e.target.name]: e.target.value });
   };


  useEffect(() => {
    socket.emit('userJoin', socket.id);
  }, []);

  // listening to new messages from the server
  socket.on('newMessage', (newMessage) => {
    setMessageList([
      ...messageList,
      {
        name: newMessage.name,
        message: newMessage.message,
        isPrivate: newMessage.isPrivate,
      },
    ]);
  });

 
  const newMessageSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name: chatMessage.name,
      message: chatMessage.message,
      room: currentRoom,
      isPrivate: privateChat(currentRoom, chatUsers),
    };

    socket.emit('newMessage', newMessage);

    setChatMessage({
      name: userData.user.name,
      message: '',
    });
  };

  const enteringRoom = (e) => {
    let oldRoom = currentRoom;
    let newRoom = e.target.textContent;
    setCurrentRoom(newRoom);

    socket.emit('roomEntered', { oldRoom, newRoom });
    setMessageList([]);
  };

  const privateChat = (roomName, userList) => {
    let isPrivate = false;
    userList.forEach((username) => {
      if (username === roomName) {
        isPrivate = true;
      }
    });

    return isPrivate;
  };

  return (
    <div>
      <Container>
        <Row>
          <Col
            xs={5}
            style={{ border: '1px solid black', borderRadius: '10px' }}
          >
            {/* <h6 onClick={enteringRoom} style={{ cursor: 'pointer' }}>
              General Chat
            </h6>

            <br />

            <h6>Chat Rooms</h6>

            <ul style={{ listStyle: 'none' }}>
              <li onClick={enteringRoom} style={{ cursor: 'pointer' }}>
                Tech
              </li>
              <li onClick={enteringRoom} style={{ cursor: 'pointer' }}>
                Money
              </li>
              <li onClick={enteringRoom} style={{ cursor: 'pointer' }}>
                Love
              </li>
            </ul> */}

            <br />

            <h6>Users Online</h6>

            <ul style={{ listStyle: 'none' }}>
              {chatUsers.map((user) => {
                return (
                  <li
                    onClick={enteringRoom}
                    style={{ cursor: 'pointer' }}
                    key={user}
                  >
                    {user}
                  </li>
                );
              })}
            </ul>
          </Col>
          &nbsp; &nbsp;
          <Col style={{ border: '1px solid black', borderRadius: '10px' }}>
            <br />
            <h6>Chat Messages { currentRoom ? ({currentRoom}) : ''}</h6>

            <div
              id='chatMessages'
              style={{ border: '1px solid white', borderRadius: '10px' }}
            >
                <br />
              <h6> &nbsp; &nbsp; Messages: </h6>

              <ul style={{ listStyle: 'none' }}>
                {messageList.map((chat, index) => {
                  return (
                    <li key={index}>
                      <b>{chat.name}</b>
                      <i>
                        <span
                          style={{ color: chat.isPrivate ? 'red' : 'black' }}
                        >
                          {chat.message}
                        </span>
                      </i>
                    </li>
                  );
                })}
              </ul>
            </div>

            <br />

            <form onSubmit={newMessageSubmit}>
              <input
                type='text'
                name='message'
                class='form-control'
                value={chatMessage.message}
                required
                onChange={handleChange}
              />
              <br />
              <input type='submit' class='btn btn-success' value='Send' />
              <br /> <br />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
