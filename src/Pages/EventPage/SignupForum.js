import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { REACT_APP_BASE_API_URL } from '../../config'

const SignupForum = ({ eventId }) => {


    const [messages, setMessages] = useState()
    const [input, setInput] = useState()

    const getSignupForumMessages = async () => {
        //make a call to get signup forum messages
        const res = await axios.get(`${REACT_APP_BASE_API_URL}/signupForum/${eventId}`)
        console.log(res.data)
        setMessages(res.data)
    }

    const handleNewMessage = async (e) => {


    }
    useEffect(() => {
        getSignupForumMessages()
    }, [])

    return (
        <div className='forum-wrapper'>
            <Container>
                <div className='messages-wrapper'>

                    {
                        messages?.map(message => {
                            return (
                                <div className="message-wrapper">

                                    <div>
                                        <Image rounded="true" src=" " alt="user" />
                                    </div>
                                    <div>
                                        <div>
                                            {message?.userInfo?.screenName}
                                        </div>
                                        <div>
                                            {message?.messageText}
                                        </div>
                                        <div>
                                            <i>at {moment(message?.timestamp).format("Do MMMM YYYY - hh:mm a")}
                                            </i>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }


                </div>
                <br />
                <div>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ textAlign: "left" }}>Post a new message</Form.Label>
                            <Form.Control placeholder="What's on your mind?"

                                value={input} onChange={(e) => setInput(e.target.value)}
                                as="textarea" rows={3} />
                        </Form.Group>
                        OR
                        <Form.Group className="mb-3">
                            <Form.Label style={{ textAlign: "left" }}>Post an image</Form.Label>
                            <Form.Control
                                type="file" />
                        </Form.Group>
                        <div >
                            <Button variant="dark" type="submit" style={{ minWidth: "250px", minHeight: "60px", fontSize: '24px' }} onClick={handleNewMessage}>
                                Post
                            </Button>
                        </div>
                    </Form>
                </div>

            </Container>


        </div>
    )
}

export default SignupForum