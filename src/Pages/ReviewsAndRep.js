import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { REACT_APP_BASE_API_URL } from '../config'
import { Rating } from 'react-simple-star-rating'
import { useLocation, useNavigate } from 'react-router-dom'

const ReviewsAndRep = (props) => {

    const [reviews, setReviews] = useState()
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.payload;

    console.log(data)
    const getUserReviews = async () => {
        const res = await axios.get(`${REACT_APP_BASE_API_URL}/review/get`, {
            params: {
                revieweeId: data?.userId,
                revieweeType: data?.type
            }
        })
        console.log("reviews", res.data)
        setReviews(reviews)
    }


    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            navigate("/login");
            return;
        }
        getUserReviews();
    }, [])

    return (
        <div>
            <br />
            <h3>User Profile</h3>
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
                    <div>@{data?.screenName}</div>
                    <Rating ratingValue={data?.type == "Organizer" ? reviews?.organizerRating * 5 : reviews?.participantRating * 5} />

                </div>
                <div className='reviews-wrapper'>
                    <h4><b>Reviews</b></h4>
                    {
                        //map through reviews
                        reviews?.map((review, index) => {

                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <Card.Title>Review #{index + 1}</Card.Title>
                                        <Card.Text>
                                            {review?.textFeedback}
                                        </Card.Text>
                                        <Rating ratingValue={review?.rating * 5} />
                                    </Card.Body>
                                </Card>
                            )
                        })

                    }

                </div>
            </Container>

        </div>
    )
}

export default ReviewsAndRep