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
		// try {
		// 	const response = await axios.get(
		// 		`${REACT_APP_BASE_API_URL}/systemReport/get/${localStorage.getItem(
		// 			"virtualTime"
		// 		)}`
		// 	);
		// 	console.log("Response: ", response);
		// } catch (err) {
		// 	console.log("Error: ", err);
		// }
	};

	useEffect(() => {}, []);

	return (
		<div>
			<br />
			<h3>System Reports</h3>
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

					<ReportCard title="Statistic 3" value="200" />
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />

				<div className="report-wrapper">
					<ReportCard title="Statistic 1" value="90" />

					<ReportCard title="Statistic 2" value="100" />
				</div>
			</Container>
		</div>
	);
};

export default SystemReports;
