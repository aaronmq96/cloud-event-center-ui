import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Nav,
	Navbar,
	Offcanvas,
	Modal,
} from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { REACT_APP_BASE_API_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const TopNav = () => {
	const [virtualTime, setVirtualTime] = useState();
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSignOut = async () => {
		try {
			const auth = getAuth();
			console.log("LL", auth);
			signOut(auth);
			localStorage.clear();
		} catch (error) {
			console.log("error signing out");
		}
	};

	const fetchVirtualTime = async () => {
		const response = await axios.get(
			`${REACT_APP_BASE_API_URL}/virtualTime/get`
		);
		setVirtualTime(
			moment(response.data.localDateTime).format("MM/DD/YYYY, hh:mm A")
		);
	};

	const updateVirtualClock = async (e) => {
		const response = await axios.get(
			`${REACT_APP_BASE_API_URL}/virtualTime/simulate/${virtualTime}`
		);
		console.log(response);
		fetchVirtualTime();
		setShowModal(false);
	};

	useEffect(() => {
		fetchVirtualTime();
	}, []);

	console.log(virtualTime);
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<div className="top-nav-wrapper">
					<div>
						<Navbar.Brand href="/">
							<img
								alt=""
								src={require("../assets/icon.png")}
								width="40"
								height="40"
								className="d-inline-block align-top"
								style={{ marginRight: "10px" }}
							/>
							{""}
							Cloud Event Center
						</Navbar.Brand>
					</div>
					<div className="top-nav-right">
						<div>
							{/* <Button variant="dark" onClick={handleShow}> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="50px"
								height="50px"
								fill="white"
								className="bi bi-person-fill"
								viewBox="0 0 16 16"
								style={{ cursor: "pointer" }}
								onClick={handleShow}
							>
								<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
							</svg>
							{/* </Button> */}
							<Offcanvas show={show} onHide={handleClose}>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title>Offcanvas</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<Nav className="me-auto">
										<Nav.Link href="/">Home</Nav.Link>
										<Nav.Link href="/createEvent">
											Create Event
										</Nav.Link>
										<Nav.Link href="/">My Events</Nav.Link>
										<Nav.Link
											onClick={handleSignOut}
											href="/login"
										>
											Sign Out
										</Nav.Link>
									</Nav>
								</Offcanvas.Body>
							</Offcanvas>
						</div>
						<Button variant="light">{virtualTime}</Button>
						<div>
							<Button
								size="sm"
								variant="primary"
								onClick={() => setShowModal(true)}
								className="px-auto py-auto"
							>
								<FontAwesomeIcon
									className="mx-auto my-auto"
									icon={faClock}
								/>
								{/* <i className="faTimer"></i> */}
							</Button>
						</div>
					</div>
				</div>
				<Modal
					show={showModal}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					onHide={() => setShowModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Fast Forward Virtual Time
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							You can select any date and time from the selector
							below, to fast forward the current virtual time to
							that time. Time must be in the future.
						</p>
						<input
							type="text"
							size="lg"
							placeholder={virtualTime}
							onFocus={(e) => (e.target.type = "datetime-local")}
							onBlur={(e) => (e.target.type = "text")}
							value={virtualTime}
							onChange={(e) => {
								setVirtualTime(e.target.value);
							}}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="success"
							onClick={() => {
								updateVirtualClock();
							}}
						>
							Simulate to new time
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</Navbar>
	);
};

export default TopNav;
