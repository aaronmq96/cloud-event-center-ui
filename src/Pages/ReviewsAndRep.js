import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { REACT_APP_BASE_API_URL } from '../config'
import { Rating } from 'react-simple-star-rating'
import { useLocation } from 'react-router-dom'

const ReviewsAndRep = (props) => {

    const [reviews, setReviews] = useState()
    const location = useLocation();
    const data = location.state.payload;

    const getUserReviews = async () => {
        // const res = await axios.get(`${REACT_APP_BASE_API_URL}/`)
        // console.log.apply(res.data)
        // setReviews(reviews)
    }

    useEffect(() => {
        getUserReviews();
    }, [])

    return (
        <div>
            <br />
            <h3>User Details</h3>
            <br />
            <Container className='user-details-wrapper'>

                <div className='brief-wrapper'>
                    <div>
                        <Image
                            roundedCircle="true"
                            src="https://statinfer.com/wp-content/uploads/dummy-user.png"
                            alt="user"
                            style={{ maxHeight: "100px" }}
                        />
                    </div>


                    <div>{data?.fullName}</div>
                    <Rating ratingValue={80} />

                    <div>User Name</div>
                </div>
                <div className='reviews-wrapper'>
                    <h4><b>Reviews</b></h4>
                    {
                        //map through reviews
                    }
                    <Card>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </div>
            </Container>

        </div>
    )
}

export default ReviewsAndRep