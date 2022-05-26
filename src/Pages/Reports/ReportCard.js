import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ title, value }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            navigate("/login");
            return;
        }
    }, []);

    return (
        <Card
            style={{
                width: "400px",
                height: "200px",
                borderLeft: "10px solid orange",
                boxShadow: "1px 1px 15px silver",
            }}
        >
            <Card.Body>
                <Card.Title>
                    <h3>{title}</h3>
                </Card.Title>
                <br></br>
                <Card.Text>
                    <h1><b>{value}</b></h1>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ReportCard;
