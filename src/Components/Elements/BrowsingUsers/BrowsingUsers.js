import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'

export default function BrowsingUsers({ users }) {
    function mapBrowsingUsers() {
        return users.map(user =>
            <tr>
                <td>{user}</td>
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
