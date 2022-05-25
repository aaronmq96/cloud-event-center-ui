import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";
import { Link } from "react-router-dom";
import ReviewModal from "../../components/ReviewModal";


const MyEvents = () => {
	const [approvalList, setApprovalList] = useState()
	const [approvedList, setApprovedList] = useState()
	const [events, setEvents] = useState()
	const [selectedEvent, setSelectedEvent] = useState()

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const fetchAllOrganizerEvents = async () => {
		const organizerId = localStorage.getItem("userId");
		const res = await axios.get(`${REACT_APP_BASE_API_URL}/event/byOrganizer/${organizerId}`)
		console.log("organizer", res.data)
		setEvents(res.data);
	}


	const fetchUnapprovedList = async () => {
		const res = await axios.get(`${REACT_APP_BASE_API_URL}/eventReg/approvalRequests`, { params: { eventId: selectedEvent } })
		console.log("Unapproved List", res.data)
		setApprovalList(res.data)
	}


	const fetchApprovedList = async () => {
		const res = await axios.get(`${REACT_APP_BASE_API_URL}/eventReg/approvedRequests`, { params: { eventId: selectedEvent } })
		console.log("Approved List", res.data)
		setApprovedList(res.data)
	}


	const handleEventSelector = async (e) => {
		console.log("Selected Event", e.target.value);
		setSelectedEvent(e.target.value);
	}


	const handleApprove = async (registrationId) => {

		const payload = {
			registrationId
		}
		const res = await axios.put(`${REACT_APP_BASE_API_URL}/eventReg/approve`, payload)
		console.log("Approved", res.data)
		await fetchUnapprovedList();
	}

	const handleReject = async (registrationId) => {

		const payload = {
			registrationId
		}
		console.log("decline")
		const res = await axios.put(`${REACT_APP_BASE_API_URL}/eventReg/decline`, payload)
		console.log("Rejected", res.data)
		await fetchUnapprovedList();
	}

	useEffect(() => {
		fetchAllOrganizerEvents();
	}, [])

	useEffect(() => {
		fetchUnapprovedList()
		fetchApprovedList()
	}, [selectedEvent])

	return (
		<div>
			<div className="container">

				<h3 style={{ padding: "20px 0px" }}>Event Registration Requests</h3>
				<div style={{ display: "flex" }}>

					<h5 style={{ padding: "10px" }}> Choose Event: </h5>

					<select onChange={handleEventSelector} >Choose what to view:
						{
							events?.map(event => {
								return (
									<option key={event.eventId} value={event.eventId}>
										{event.title}
									</option>
								)
							})
						}
					</select>
				</div>
			</div>
			<hr />
			<Container>
				<h3 style={{ textAlign: "left" }}>Pending Approval</h3>

				<div>
					<ul className="list-group">
						{
							approvalList?.map(participant => {

								return (
									<div className="container" key={participant?.registrationId}  >
										<li className="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
											<div style={{
												fontSize: "18px", textAlign: 'left',
												padding: "15px", width: "75%"
											}} >
												<div><b>Name: </b>  {participant?.userInfo?.fullName}</div>
												<div>  {participant?.userInfo?.emailId}</div>

												<Link to={`/`}><div>@{participant?.userInfo?.screenName}
												</div></Link>
											</div>


											<div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

												<button type="button"
													style={{ padding: "10px", margin: "10px" }}
													className="btn btn-success"
													onClick={() => handleApprove(participant.registrationId)}>
													Approve</button>

												<button type="button"
													style={{ padding: "10px", margin: "10px" }}
													className="btn btn-danger"
													onClick={() => handleReject(participant.registrationId)}>
													Decline</button>
											</div>

										</li>
									</div>
								)
							})
						}
					</ul>
				</div >
			</Container>
			<br />
			<br />
			<br />
			<Container>
				<h3 style={{ textAlign: "left" }}>Approved Participants</h3>
				<div>
					<ul className="list-group">
						{
							approvedList?.map(participant => {

								return (
									<div className="container" key={participant?.registrationId}  >
										<li className="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
											<div style={{
												fontSize: "18px", textAlign: 'left',
												padding: "15px", width: "75%"
											}} >
												<div><b>Name: </b>  {participant?.userInfo?.fullName}</div>
												<div>  {participant?.userInfo?.emailId}</div>

												<Link to={`/`}>
													<div>@{participant?.userInfo?.screenName}
													</div>
												</Link>
											</div>

											<div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

												<button type="button"
													style={{ padding: "10px", margin: "10px" }}
													className="btn btn-primary"
													onClick={handleShow}
												>
													Add Review</button>
											</div>
										</li>
									</div>
								)
							})
						}
					</ul>
				</div >
			</Container>
			<ReviewModal
				show={show}
				handleClose={() => handleClose} />
		</div >
	)
}

export default MyEvents



