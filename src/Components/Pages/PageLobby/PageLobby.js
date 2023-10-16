import React, { useEffect } from 'react'
import ChatRoomsTable from '../../Elements/ChatRoomsTable/ChatRoomsTable'
import BrowsingUsers from '../../Elements/BrowsingUsers/BrowsingUsers'
import { useDispatch, useSelector } from 'react-redux';
import { HubConnectionState } from '@microsoft/signalr';
import { initializeSignalRConnectionLobby, setChatRooms, setUsersLobby, stopSignalRConnectionLobby } from '../../../reducers/lobbySlice';
import { Col, Row } from 'react-bootstrap';

export default function PageLobby() {
  // Redux
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);
  const connection = useSelector(state => state?.lobby?.connection ?? null);

  useEffect(() => {
    dispatch(initializeSignalRConnectionLobby());
    return () => {
      dispatch(stopSignalRConnectionLobby());
    }
  }, []);

  useEffect(() => {
    if (connection) {
      joinLobby();
    }
  }, [connection])

  const joinLobby = async () => {
    if (connection.state === HubConnectionState.Disconnected) {
      connection.on("ActiveRooms", (rooms) => {
        dispatch(setChatRooms(rooms));
      });
      connection.on("UsersInRoom", (users) => {
        dispatch(setUsersLobby(users));
      });

      await connection.start();
      await connection.invoke("JoinLobby", { user: name, room: "Lobby" });
    }
  }

  return (
    <div className='PageLobby'>
      <Row >
        <Col sm="6" md="9">
          <ChatRoomsTable />
        </Col>
        <Col sm="6" md="3">
          <BrowsingUsers />
        </Col>
      </Row>
    </div>
  )
}
