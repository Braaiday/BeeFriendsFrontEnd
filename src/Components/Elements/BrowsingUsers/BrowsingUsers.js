import React from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function BrowsingUsers() {
    const users = useSelector(state => state.lobby.users);

    function mapBrowsingUsers() {
        if (users.length == 0) return <tr><td><Spinner /></td></tr>
        return users.map(user =>
            <tr>
                <td key={user}>{user}</td>
            </tr>
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Users Browsing:</h1>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>user</th>
                    </tr>
                </thead>
                <tbody>
                    {mapBrowsingUsers()}
                </tbody>
            </Table>
        </>
    )
}
