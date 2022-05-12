import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SearchResults = (props) => {

    const { data } = props


    return (
        <div>
            <ListGroup style={{ marginLeft: '100px', marginRight: '100px' }}>
                {
                    data?.map(event => {
                        console.log(event)
                        return (

                            <ListGroup.Item
                                className="d-flex justify-content-between align-items-start search-result-wrapper"
                            >

                                <div className="search-results-image-wrapper">
                                    <img src="https://www.livenationentertainment.com/wp-content/uploads/2021/07/Live_Nation_Entertainment_Return_to_LIVE.jpg" alt='#' />
                                </div>
                                <div className="search-results-content-wrapper">
                                    <div>Event: {event?.title}</div>
                                    <div>Start: {event?.startTime}</div>
                                    <div>End : {event?.endTime}</div>
                                    <div>Registration Deadline : {event?.deadline}</div>
                                    <div>Venue : {event?.address?.city}</div>

                                </div>
                                <div className='search-results-button-wrapper'>
                                    <Link to={`/event/${event?.eventId}`} state={{ payload: event }} >
                                        <Button size="lg"> View Event</Button>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default SearchResults