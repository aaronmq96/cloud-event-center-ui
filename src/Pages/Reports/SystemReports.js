import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { REACT_APP_BASE_API_URL } from "../../config";
import ReportCard from "./ReportCard";

// {
//     "eventParticipantsToMinRequirementsRatio": 0,
//     "numberOfCancelledEvents": 0,
//     "avgTotalParticipantsForFinishedEvents": 0,
//     "percentageOfPaidEvents": 0.0,
//     "numberOfCreatedEvents": 18,
//     "numberOfFinishedEvents": 0
// }

const SystemReports = () => {
	const [stat1, setStat1] = useState(0);
	const [stat2, setStat2] = useState(0);
	const [stat3, setStat3] = useState(0);
	const [stat4, setStat4] = useState(0);
	const [stat5, setStat5] = useState(0);
	const [stat6, setStat6] = useState(0);

	const getReport = async () => {
		try {
			const response = await axios.get(
				`${REACT_APP_BASE_API_URL}/systemReport/get/${localStorage.getItem(
					"virtualTime"
				)}`
			);
			console.log("Response: ", response);
			setStat1(response.data.numberOfCreatedEvents);
			setStat2(response.data.percentageOfPaidEvents);
			setStat3(response.data.numberOfCancelledEvents);
			setStat4(response.data.eventParticipantsToMinRequirementsRatio);
			setStat5(response.data.numberOfFinishedEvents);
			setStat6(response.data.avgTotalParticipantsForFinishedEvents);
		} catch (err) {
			console.log("Error: ", err);
		}
	};

	useEffect(() => {
		getReport();
	}, []);

	return (
		<div>
			<br />
			<h2>System Statistics</h2>
			<br />
			<br />
			<br />
			<Container>
				<div className="report-wrapper">
					<ReportCard
						title="Number of created events"
						value={stat1}
					/>

					<ReportCard
						title="Percentage of paid events"
						value={stat2}
					/>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />

				<div className="report-wrapper">
					<ReportCard
						title="Number of cancelled events"
						value={stat3}
					/>

					<ReportCard
						title="Participant Requests : Minimum Participants"
						value={stat4}
					/>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />

				<div className="report-wrapper">
					<ReportCard
						title="Number of finished events"
						value={stat5}
					/>

					<ReportCard
						title="Average number of participants"
						value={stat6}
					/>
				</div>
				<br />

			</Container>
		</div>
	);
};

export default SystemReports;
