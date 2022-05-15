import React from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ENUM_MAPPING from "../../utils/enumMappings";

const SearchResults = (props) => {
	const { data } = props;

	return (
		<div>
			<ListGroup style={{ marginLeft: "100px", marginRight: "100px" }}>
				{data?.map((event) => {
					// console.log(event)
					return (
						<ListGroup.Item
							className="d-flex justify-content-between align-items-start search-result-wrapper"
							key={event.eventId}
						>
							<div className="search-results-image-wrapper">
								<img
									src="https://www.livenationentertainment.com/wp-content/uploads/2021/07/Live_Nation_Entertainment_Return_to_LIVE.jpg"
									alt="#"
								/>
							</div>
							<div className="search-results-content-wrapper">
								<div>
									<b>Event:</b> {event?.title}
								</div>
								<div>
									<b>Description:</b> {event?.description}
								</div>
								<br />
								<div>
									<b>Start:</b> {event?.startTime}
								</div>
								<div>
									<b>End:</b> {event?.endTime}
								</div>
								<div>
									<b>Registration Deadline:</b>{" "}
									{event?.deadline}
								</div>
								<div>
									<b>Venue:</b> {event?.address?.city}
								</div>
								<div>
									<b>Organizer:</b>{" "}
									{event?.userInfo?.screenName}
								</div>
								<div>
									<b>Status:</b>{" "}
									{ENUM_MAPPING[event.eventStatus]}
								</div>
								<div>
									<b>Registrations: </b>
									{event?.registrationCount} /{" "}
									{event.maxParticipants}
								</div>
							</div>
							<div className="search-results-button-wrapper">
								<Link
									to={`/event/${event?.eventId}`}
									state={{ payload: event }}
								>
									<Button size="lg"> View Event</Button>
								</Link>
							</div>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</div>
	);
};

export default SearchResults;
