import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'

const ReviewModal = (props) => {

    const { show, textFeedback, rating, handleClose, handleTextFeedback, handleRating, handleReviewSubmit } = props;

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
                                onChange={handleTextFeedback()}
                                value={textFeedback} />
                        </Form.Group>
                        <Form.Group
                        >
                            <Form.Label> Rate {"\n"}</Form.Label>
                            <br></br>
                            <Rating onClick={handleRating()} ratingValue={rating} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReviewSubmit()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReviewModal
