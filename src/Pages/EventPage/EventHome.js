import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import TemplateModal from '../../components/TemplateModal'
import { REACT_APP_BASE_API_URL } from '../../config'
import ParticipantForum from './ParticipantForum'
import SignupForum from './SignupForum'
const EventHome = () => {

    const location = useLocation()
    const data = location.state.payload
    console.log("Event Data", data)

    const { eventId, title, address, startTime, admissionPolicy,
        deadline, description, endTime, eventStatus,
        fee, imageUrl, maxParticipants, minParticipants } = data

    const [selectedForum, setSelectedForum] = useState(1)
    const handleSelect = (eventKey) => {
        console.log(eventKey)
        setSelectedForum(eventKey);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true)


    const handleEventRegistration = async (e) => {
        // const res= await axios.post(`${REACT_APP_BASE_API_URL}/`)
        console.log("Registered!")
    }

    useEffect(() => {
        //check if user is already registered or user is organizer

    }, [])

    return (
        <div className="event-banner">

            <Card  >
                <Container>
                    <Card.Img src="https://www.livenationentertainment.com/wp-content/uploads/2021/07/Live_Nation_Entertainment_Return_to_LIVE.jpg" alt="Card image"
                        style={{ height: "400px", objectFit: "cover" }} />
                </Container>

            </Card>
            <Container>
                <div className='event-info-wrapper'>
                    <div>
                        <h2><b>{title}</b></h2>
                        <h4><b>Venue:</b> {address?.street}, {address?.city}, {address?.state}, {address?.zipcode}</h4>
                        <h4><b>Start: </b> {moment(startTime).format("Do MMMM YYYY - hh:mm a")}</h4>
                        <h4><b>End: </b>{moment(endTime).format("Do MMMM YYYY - hh:mm a")}</h4>
                        <h4><b>Deadline To Register: </b>{moment(deadline).format("Do MMMM YYYY - hh:mm a")}</h4>
                        <h4><b>Fee: </b> $ {fee}</h4>
                    </div>
                    <div>
                        <Button size='lg' variant="dark" onClick={handleOpen}>
                            Register </Button>
                    </div>
                    <TemplateModal handleEventRegistration={
                        () => handleEventRegistration}
                        fee={fee} show={show} handleClose={() => handleClose} />
                </div>
            </Container>

            <Container>
                <Nav variant="pills" activeKey={selectedForum} onSelect={handleSelect}>
                    <Nav.Item style={{ width: "50%" }}>
                        <Nav.Link eventKey="1" >
                            Sign up Forum
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ width: "50%" }}>
                        <Nav.Link eventKey="2" title="Item">
                            Participant Forum
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>

            <div className="forum-wrapper">
                {
                    selectedForum == 1 ? (<SignupForum eventId={eventId.toString()} />) : (<ParticipantForum eventId={eventId.toString()} />)
                }
            </div>
        </div>
    )
}

export default EventHome


{/* <Card.ImgOverlay>
    <Card.Title>Event Name</Card.Title>
    <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
    </Card.Text>
    <Card.Text>Last updated 3 mins ago</Card.Text>
</Card.ImgOverlay> */}