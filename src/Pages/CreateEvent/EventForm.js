import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";
import uploadImageToS3 from "../../utils/uploadImage";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const EventForm = () => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [deadline, setDeadline] = useState();
	const [street, setStreet] = useState();
	const [apartment, setApartment] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [zipcode, setZipcode] = useState();
	const [fee, setFee] = useState(0);
	const [admissionPolicy, setAdmissionPolicy] = useState();
	const [minParticipants, setMinParticipants] = useState();
	const [maxParticipants, setMaxParticipants] = useState();
	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState();


	const navigate = useNavigate()

	const notifySuccess = (message) => {
		toast.success(message)
	}

	const notifyError = (message) => {
		toast.error(message)
	}

	const handleCreateEvent = async (e) => {
		e.preventDefault();

		const organizerId = localStorage.getItem("userId");
		const imageLocation = await uploadImageToS3(image);
		const payload = {
			organizerId,
			title,
			description,
			startTime,
			endTime,
			deadline,
			street,
			apartment,
			city,
			imageURL: imageLocation,
			// "https://www.livenationentertainment.com/wp-content/uploads/2021/07/Live_Nation_Entertainment_Return_to_LIVE.jpg",
			state,
			zipcode,
			minParticipants: parseInt(minParticipants),
			maxParticipants: parseInt(maxParticipants),
			fee: parseFloat(fee),
			admissionPolicy,
		};
		console.log(payload);

		try {

			const res = await axios.post(
				`${REACT_APP_BASE_API_URL}/event`,
				payload
			);
			console.log("EVENT DEETS", res.data);
			notifySuccess(res.data)

			navigate("/")

		}
		catch (err) {
			console.log("error", err.response.data)
			notifyError(err.response.data)

		}
	};

	return (
		<div className="create-event-wrapper">
			<h2 style={{ marginLeft: "100px" }}>CREATE YOUR EVENT</h2>
			<br />

			<Form>
				<Container>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control
							className="input-main"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							className="input-main"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							as="textarea"
							rows={3}
						/>
					</Form.Group>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<Form.Label>Start Time</Form.Label>
							<Form.Control
								type="datetime-local"
								className="input-main"
								placeholder="Start Time"
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<Form.Label>End Time</Form.Label>
							<Form.Control
								type="datetime-local"
								className="input-main"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
								placeholder="EndTime "
							/>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<Form.Label>Deadline</Form.Label>
							<Form.Control
								type="datetime-local"
								className="input-main"
								placeholder="Deadline"
								value={deadline}
								onChange={(e) => setDeadline(e.target.value)}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group
							as={Col}
							className="mb-3"
							controlId="formGridStreet"
						>
							<Form.Label as="legend">Street</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="1234 Main Street"
								onChange={(e) => setStreet(e.target.value)}
								value={street}
							/>
						</Form.Group>
						<Form.Group
							as={Col}
							className="mb-3"
							controlId="formGridStreet"
						>
							<Form.Label as="legend">Apartment</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="Apartment, studio, or floor"
								onChange={(e) => setApartment(e.target.value)}
								value={apartment}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label as="legend">City</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="San Jose"
								onChange={(e) => setCity(e.target.value)}
								value={city}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label as="legend">State</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="California"
								onChange={(e) => setState(e.target.value)}
								value={state}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label as="legend">Zipcode</Form.Label>
							<Form.Control
								className="input-main"
								type="number"
								placeholder="95110"
								onChange={(e) => setZipcode(e.target.value)}
								value={zipcode}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<Form.Label>Minimum Participants</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="Minimum Participants"
								onChange={(e) =>
									setMinParticipants(e.target.value)
								}

								type="number"
								value={minParticipants}
							/>
						</Form.Group>

						<Form.Group as={Col} className="mb-3">
							<Form.Label>Maximum Participants</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="Maximum Participants"
								onChange={(e) =>
									setMaxParticipants(e.target.value)
								}
								type="number"

								value={maxParticipants}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} className="mb-3">
							<Form.Label>Fee ($)</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="Fee"
								value={fee}
								onChange={(e) => setFee(e.target.value)}
								type="float"
							// type="number"

							/>
						</Form.Group>
						<Form.Group as={Col} className="mb-3">
							<Form.Label>Admission Policy</Form.Label>

							<Form.Select
								value={admissionPolicy}
								onChange={(e) =>
									setAdmissionPolicy(e.target.value)
								}
							>
								<option default value="FirstComeFirstServe">
									First Come First Served
								</option>
								<option value="OnApproval">
									Approval Required
								</option>
							</Form.Select>
						</Form.Group>
					</Row>

					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Upload cover image</Form.Label>
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
							onClick={handleCreateEvent}
						>
							CREATE EVENT
						</Button>
					</div>
				</Container>
			</Form>
			<Toaster />
		</div>
	);
};

export default EventForm;
