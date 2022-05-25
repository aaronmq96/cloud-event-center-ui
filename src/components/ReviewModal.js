import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'

const ReviewModal = (props) => {

    const { show, handleClose } = props;

    //move these to parent 
    //from here
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)


    const handleRating = (rate) => {
        setRating(rate)

    }

    const handleReviewText = (e) => {
        console.log(e.target.value)
        setReviewText(e.target.value)
    }
    //to here
    return (
        <>

            <Modal show={show} onHide={handleClose()}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label> Write Review </Form.Label>
                            <Form.Control as="textarea" rows={3}
                                onChange={handleReviewText} />
                        </Form.Group>
                        <Form.Group
                        >
                            <Form.Label> Rate {"\n"}</Form.Label>
                            <br></br>
                            <Rating onClick={handleRating} ratingValue={rating} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReviewModal
