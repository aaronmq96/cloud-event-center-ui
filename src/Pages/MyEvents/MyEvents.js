import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";


const MyEvents = () => {

	const [myEventsData, setMyEventsData] = useState()
	const [eventList, setEventList] = useState()
	const [selectedEvent, setSelectedEvent] = useState()
	const [toApproveList, setToApproveList] = useState()

	const getMyEvents = async () => {

		const userId = localStorage.getItem("userId")
		const res = await axios.get(`${REACT_APP_BASE_API_URL}/event/byOrganizer/${userId}`)
		console.log(res)
		setMyEventsData(res.data)
	}

	const getUnapprovedParticipants = async (e) => {
		console.log(e.target.value)
		// const res = axios.get(`${REACT_APP_BASE_API_URL}/eventReg/approvalRequests`, { params: { eventId: e.target.value } })
		const res = await axios.get(`http://localhost:8080/eventReg/approvalRequests?eventId=11`)
		console.log("participants", res.data)
		setToApproveList(res.data)
	}

	useEffect(() => {
		getMyEvents();
	}, [])


	return <div>

		<div className="container">

			<h3 style={{ padding: "20px 0px" }}>My Events</h3>
			<div style={{ display: "flex" }}>

				<h6 style={{ padding: "10px" }}> Choose event: </h6>
				{/* 
				<select onChange={eventList} >Choose Event:
					{
						eventList.map(event => {
							<option value={event?.name}>{event.name}</option>

						})

					}
				</select> */}
			</div>
		</div>
		<hr />
		<div>
			{/* <ul className="list-group">
				{
					view === "Reviews" ?
						reviewsData?.map(item => {
							console.log("ITEM", item.name)

							return (
								<div className="container"  >
									<li class="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
										<div style={{ width: "50%" }} >

											<p><b>Review Summary: </b>  {item.reviewSummary}</p>
											<div
												className="overflow-auto"
												style={{
													border: "1px solid grey", padding: '5px', borderRadius: '5px',
													width: "100%",
													height: "200px",
													wordWrap: "break-word"
												}}>

												{item.review}
											</div>
										</div>


										<div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

											<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-success" onClick={() => handleApproveReviewStatus(item._id)}>Approve</button>
											<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-danger" onClick={() => handleDisapproveReviewStatus(item._id)}>Disapprove</button>
										</div>

									</li>
								</div>


							)


						}) :
						picturesData?.map(item => {
							console.log("ITEM", item)
							return (
								<div className="container"  >
									<li class="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
										<div style={{ height: "100%", width: "50%" }} >

											<img style={{ height: "200px", width: "50%" }} src={item.S3Url} alt="" ></img>

										</div>


										<div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

											<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-success" onClick={() => handleApprovePhotoStatus(item)}>Approve</button>
											<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-danger" onClick={() => handleDisapprovePhotoStatus(item)}>Disapprove</button>
										</div>

									</li>
								</div>

							)
						})
				}
			</ul> */}
		</div >
		<div>
			{
				myEventsData?.map(event => {
					return (<>

						<Button value={event?.eventId} onClick={getUnapprovedParticipants}>{event?.eventId}</Button>
					</>)
				})
			}
		</div>
		<div>
			{
				toApproveList?.map(participant => {
					return <div>
						<div className="container"  >
							<li class="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
								<div style={{ height: "100%", width: "50%" }} >

									{participant?.registrationId}
								</div>


								<div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

									<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-success" >Approve</button>
									<button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-danger">Disapprove</button>
								</div>

							</li>
						</div>

					</div>
				})
			}
		</div>
	</div>;
};

export default MyEvents;
