import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";
import uploadImageToS3 from "../../utils/uploadImage";
import toast, { Toaster } from "react-hot-toast";
import ENUM_MAPPING from "../../utils/enumMappings";

const ParticipantForum = ({ eventId }) => {
	const [messages, setMessages] = useState();
	const [input, setInput] = useState();
	const [image, setImage] = useState();

	const getParticipantForumMessages = async () => {
		//make a call to get participant forum messages
		const res = await axios.get(
			`${REACT_APP_BASE_API_URL}/participantForum/${eventId}`
		);
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
		try {
			const response = await axios.post(
				`${REACT_APP_BASE_API_URL}/participantForum/addMessage`,
				payload
			);
			console.log(
				"Response for posting new message in participant forum: ",
				response
			);
			toast.success(response.data);
		} catch (err) {
			console.log("Error: ", err);
			toast.error(`Participant Forum ${ENUM_MAPPING[err.response.data]}`);
		}
		getParticipantForumMessages();
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

	useEffect(() => {
		getParticipantForumMessages();
	}, []);

	return (
		<div className="forum-wrapper">
			<Container>
				<div className="messages-wrapper">
					{messages?.map(showMessage)}
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

export default ParticipantForum;
