import React from 'react'
import { Card } from 'react-bootstrap'

const ReportCard = ({ title, value }) => {
    return (

        <Card style={{ width: "20%", height: "20%", borderLeft: "10px solid orange", boxShadow: "1px 1px 15px silver" }}>
            <Card.Body>
                <Card.Title><h3>{title}</h3></Card.Title>
                <Card.Text>
                    <h2>{value}</h2>
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default ReportCard