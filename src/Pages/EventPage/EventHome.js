import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TemplateModal from "../../components/TemplateModal";
import { REACT_APP_BASE_API_URL } from "../../config";
import ParticipantForum from "./ParticipantForum";
import SignupForum from "./SignupForum";
import ENUM_MAPPING from "../../utils/enumMappings.js";
import toast, { Toaster } from "react-hot-toast";
import ReviewModal from "../../components/ReviewModal";

const EventHome = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const data = location.state.payload;
	console.log("Event Data", data);

	const {
		eventId,
		title,
		description,
		startTime,
		endTime,
		deadline,
		address,
		admissionPolicy,
		eventStatus,
		fee,
		imageUrl,
		maxParticipants,
		minParticipants,
		registrationCount,
		userInfo,
		participantForumStatus,
	} = data;

	const [selectedForum, setSelectedForum] = useState(1);
	const [participantForumAccess, setParticipantForumAccess] = useState(false);
	const [show, setShow] = useState(false);
	const [reviewModalShow, setReviewModalShow] = useState(false)
	const [textFeedback, setTextFeedback] = useState("")
	const [rating, setRating] = useState(0)
	const [virtualTime, setVirtualTime] = useState()


	const handleRating = (rate) => {
		setRating(rate / 20)
		console.log(rate / 20)
	}
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddReviewClose = () => setReviewModalShow(false);
	const handleAddReviewShow = () => setReviewModalShow(true);


	const handleTextFeedback = (e) => {
		console.log(e.target.value)
		setTextFeedback(e.target.value)
	}
	const notifySuccess = (msg) => toast.success(msg);
	const notifyError = (msg) => toast.error(msg);

	const handleSelect = (eventKey) => {
		console.log(eventKey);
		setSelectedForum(eventKey);
	};
	const handleEventRegistration = async () => {
		console.log("Handling event registration");
		const payload = {
			eventId: eventId,
			participantId: localStorage.getItem("userId"),
		};
		try {
			const response = await axios.post(
				`${REACT_APP_BASE_API_URL}/eventReg`,
				payload
			);
			console.log("Response from API: ", response);
			notifySuccess(response.data);
		} catch (err) {
			console.log("Error: ", err);
			notifyError(err.response.data);
		}
		setShow(false);
	};

	const checkAccessParticipantForum = async (e) => {
		const payload = {
			userId: localStorage.getItem("userId"),
			eventId: eventId,
		};
		const response = await axios.get(
			`${REACT_APP_BASE_API_URL}/participantForum/checkAccess`,
			{ params: payload }
		);
		setParticipantForumAccess(response.data);
	};

	const renderRegisterButton = () => {
		return (
			<div>
				{fee > 0 ? (
					<Button size="lg" variant="dark" onClick={handleShow}>
						Register{" "}
					</Button>
				) : (
					<Button
						size="lg"
						variant="dark"
						onClick={() => {
							handleEventRegistration();
						}}
					>
						Register for free!{" "}
					</Button>
				)}
			</div>
		);
	};

	const handleReviewSubmit = async () => {

		const userId = localStorage.getItem("userId")

		const payload = {
			revieweeId: userInfo?.emailId,
			reviewerId: userId,
			eventId,
			currentTime: virtualTime,
			revieweeType: "Organizer",
			rating,
			textFeedback
		}
		try {

			const res = await axios.post(`${REACT_APP_BASE_API_URL}/review/add`, payload)
			notifySuccess(res.data);
		}
		catch (error) {
			console.log(error)
			notifyError(error.response.data);
		}
		setShow(false)
	}


	useEffect(() => {

		if (!localStorage.getItem("userId")) {
			navigate("/login");
			return;
		}

		//check if user is already registered or user is organizer
		setVirtualTime(localStorage.getItem("virtualTime"))
		console.log(moment(virtualTime)._d)
		console.log(moment(startTime)._d)
		checkAccessParticipantForum();
	}, []);

	return (
		<div className="event-banner">
			<Toaster />
			<Card>
				<Container>
					<Card.Img
						src={"https://www.livenationentertainment.com/wp-content/uploads/2021/07/Live_Nation_Entertainment_Return_to_LIVE.jpg"}
						alt="Card image"
						style={{ height: "400px", objectFit: "cover" }}
					/>
				</Container>
			</Card>
			<Container>
				<div className="event-info-wrapper">
					<div>
						<h2>
							<b>{title}</b>
						</h2>
						<h4>{description}</h4>
						<br />
						<h4>
							<b>Venue:</b> {address?.street}, {address?.city},{" "}
							{address?.state}, {address?.zipcode}
						</h4>
						<h4>
							<b>Start: </b>{" "}
							{moment(startTime).format("Do MMMM YYYY - hh:mm a")}
						</h4>
						<h4>
							<b>End: </b>
							{moment(endTime).format("Do MMMM YYYY - hh:mm a")}
						</h4>
						<h4>
							<b>Deadline To Register: </b>
							{moment(deadline).format("Do MMMM YYYY - hh:mm a")}
						</h4>
						<h4>
							<b>Fee: </b> $ {fee}
						</h4>
						<h4>
							<b>Organizer: </b> <Link to={`/reviewAndReputation`} state={{ payload: { ...userInfo, type: "Organizer" } }}>{userInfo?.screenName}</Link>
						</h4>
						<h4>
							<b>Admission Policy: </b>
							{ENUM_MAPPING[admissionPolicy]}
						</h4>
						<h4>
							<b>Event Status: </b>
							{ENUM_MAPPING[eventStatus]}
						</h4>
						<h4>
							<b>Registrations: </b>
							{registrationCount} / {maxParticipants}
						</h4>
						{/* <h4>
							<b>Participant Forum: </b>
							{ENUM_MAPPING[participantForumStatus]}
						</h4> */}
					</div>
					<div>
						{maxParticipants - registrationCount > 0
							? renderRegisterButton()
							: ""}
						<br />
						{participantForumAccess ?
							<Button size="lg"
								onClick={handleAddReviewShow}>
								Add Event Review
							</Button> :
							<></>
						}

					</div>
					<TemplateModal
						handleEventRegistration={() => handleEventRegistration}
						fee={fee}
						admissionPolicy={admissionPolicy}
						show={show}
						handleClose={() => handleClose}
					/>
					<ReviewModal
						show={reviewModalShow}
						rating={rating}
						handleClose={() => handleAddReviewClose}
						handleTextFeedback={() => handleTextFeedback}
						handleRating={() => handleRating}
						handleReviewSubmit={() => handleReviewSubmit}
					/>
				</div>
			</Container>

			<Container>
				<Nav
					variant="pills"
					activeKey={selectedForum}
					onSelect={handleSelect}
				>
					<Nav.Item style={{ width: "50%" }}>
						<Nav.Link
							eventKey="1"
							onClick={() => {
								window.location.reload(false);
							}}
						>
							Sign up Forum
						</Nav.Link>
					</Nav.Item>

					{


						participantForumAccess ? (
							<Nav.Item style={{ width: "50%" }}>
								<Nav.Link eventKey="2" title="Item">
									Participant Forum
								</Nav.Link>
							</Nav.Item>
						) : (
							""
						)

					}
				</Nav>
			</Container>

			<div className="forum-wrapper">
				{selectedForum === 1 ? (
					<SignupForum eventId={eventId.toString()} />
				) : (
					<ParticipantForum eventId={eventId.toString()} />
				)}
			</div>
		</div>
	);
};

export default EventHome;
