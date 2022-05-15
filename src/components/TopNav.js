import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";

const TopNav = () => {
	const [CECTime, setCECTime] = useState();
	const [show, setShow] = useState(false);

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

	// useEffect(() => {
	//     setCECTime(moment(new Date()).format("MM/DD/YYYY"))
	// }, [])
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
						<div style={{ paddingTop: "8px" }}>
							<input
								type="date"
								onFocus={(e) => (e.target.type = "date")}
								// onBlur={(e) => e.target.type = "text"}
								value={CECTime}
								onChange={(e) => setCECTime(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</Container>
		</Navbar>
	);
};

export default TopNav;
