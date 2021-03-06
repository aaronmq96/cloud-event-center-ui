import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";
import uploadImageToS3 from "../../utils/uploadImage";

const SignupForum = ({ eventId }) => {
	const [messages, setMessages] = useState();
	const [input, setInput] = useState();
	const [image, setImage] = useState();

	const getSignupForumMessages = async () => {
		//make a call to get signup forum messages
		const res = await axios.get(
			`${REACT_APP_BASE_API_URL}/signupForum/${eventId}`
		);
		console.log(res.data);
		setMessages(res.data);
		setInput("");
		setImage(null);
	};

	const handleNewMessage = async (e) => {
		e.preventDefault();
		const payload = {
			userId: localStorage.getItem("userId"),
			messageText: input,
			eventId: eventId,
		};
		if (image) {
			const imageLocation = await uploadImageToS3(image);
			payload.imageUrl = imageLocation;
		}
		const response = await axios.post(
			`${REACT_APP_BASE_API_URL}/signupForum/addMessage`,
			payload
		);
		console.log(
			"Response for posting new message in signup forum: ",
			response
		);
		getSignupForumMessages();
	};

	const showMessage = (message) => {
		return (
			<div key={message.messageId} className="message-wrapper">
				<div>
					<Image
						roundedCircle="true"
						src="https://statinfer.com/wp-content/uploads/dummy-user.png"
						alt="user"
						style={{ maxHeight: "80px" }}
					/>
					{message?.byOrganizer ? <div>[Organizer]</div> : ""}
				</div>
				<div>
					<div>{message?.userInfo?.screenName}</div>

					{message?.imageUrl !== "null" ? (
						<div>
							<Image
								rounded="true"
								src={message.imageUrl}
								alt="user"
								style={{ maxHeight: "300px" }}
							></Image>
						</div>
					) : (
						""
					)}
					<div>{message?.messageText}</div>
					<div>
						<i>
							{moment(message?.timestamp).format(
								"Do MMMM YYYY - hh:mm a"
							)}
						</i>
					</div>
				</div>
			</div>
		);
	};

	const scrollToEnd = () => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const divRef = useRef(null);

	useEffect(() => {
		getSignupForumMessages();
	}, []);

	useEffect(() => {
		scrollToEnd();
	}, [messages]);

	return (
		<div className="forum-wrapper">
			<Container>
				<div className="messages-wrapper">
					{messages?.map(showMessage)}
					<div
						style={{ backgroundColor: "aliceblue" }}
						ref={divRef}
					></div>
				</div>
				<br />
				<div>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label style={{ textAlign: "left" }}>
								Post a new message
							</Form.Label>
							<Form.Control
								placeholder="What's on your mind?"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								as="textarea"
								rows={3}
							/>
						</Form.Group>
						OR
						<Form.Group className="mb-3">
							<Form.Label style={{ textAlign: "left" }}>
								Post an image
							</Form.Label>
							<Form.Control
								type="file"
								onChange={(e) => {
									setImage(e.target.files[0]);
								}}
							/>
						</Form.Group>
						<div>
							<Button
								variant="dark"
								type="submit"
								style={{
									minWidth: "250px",
									minHeight: "60px",
									fontSize: "24px",
								}}
								onClick={handleNewMessage}
							>
								Post
							</Button>
						</div>
					</Form>
				</div>
			</Container>
		</div>
	);
};

export default SignupForum;
