import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { REACT_APP_BASE_API_URL } from '../../config';
import ReportCard from './ReportCard'

const UserLevelReports = () => {

    const [stat1, setStat1] = useState(0);
    const [stat2_1, setStat2_1] = useState(0);
    const [stat2_2, setStat2_2] = useState(0);
    const [stat3, setStat3] = useState(0);
    const [stat4_1, setStat4_1] = useState(0);
    const [stat4_2, setStat4_2] = useState(0);
    const [stat5, setStat5] = useState(0);
    const [stat6, setStat6] = useState(0);
    const [stat7_1, setStat7_1] = useState(0);
    const [stat7_2, setStat7_2] = useState(0);

    const [stat8_1, setStat8_1] = useState(0);
    const [stat8_2, setStat8_2] = useState(0);


    const getReport = async () => {
        try {

            const userId = localStorage.getItem("userId")
            const virtualTime = localStorage.getItem("virtualTime")
            const response = await axios.get(
                `${REACT_APP_BASE_API_URL}/userReport/get/${userId}/${virtualTime}`
            );
            console.log("Response: ", response.data);
            setStat1(response.data.numberOfEventsForParticipant);
            setStat2_1(response.data.numberOfRejectsForParticipant);
            setStat2_2(response.data.numberOfAcceptsForParticipant);
            setStat3(response.data.numberOfFinishedEventsForParticipant);

            setStat4_1(response.data.numberOfEventsCreatedForOrganizer);
            setStat4_2(response.data.percentageOfPaidEventsCreatedForOrganizer);

            setStat5(response.data.numberOfCancelledEventsForOrganizer);

            setStat6(response.data.ratioOfRegisteredToMinimumParticipantsForCancelledEvents);

            setStat7_1(response.data.numberOfFinishedEventsForOrganization);
            setStat7_2(response.data.averageNumberOfParticipantsAmongFinishedEventsForOrganization);

            setStat8_1(response.data.totalFinishedPaidAndEventsForOrganizer);
            setStat8_2(response.data.revenueOfPaidAndFinishedEventsForOrganizer);

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
            <h3>My Statistics</h3>
            <br />
            <br />
            <br />
            <Container>
                <h3 style={{ textAlign: 'left' }}>As a Participant</h3>
                <br />
                <div className='report-wrapper'>
                    <ReportCard title="Events Signed Up" value={stat1} />
                    <ReportCard title="Rejects/Approvals" value={stat2_1 + "/" + stat2_2} />
                    <ReportCard title="Finished Events" value={stat3} />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3 style={{ textAlign: 'left' }}>As an Organizer</h3>
                <br />

                <div className='report-wrapper'>
                    <ReportCard title="Created Events / % of Paid Events" value={stat4_1 + "/" + stat4_2} />
                    <ReportCard title="Cancelled Events" value={stat5} />
                    <ReportCard title="# participation requests/# of minimum participants " value={stat6} />

                </div>
                <br />
                <div className='report-wrapper'>
                    <ReportCard title="# of Finished Events / Avg. # of participants" value={stat7_1 + "/" + stat7_2} />
                    <ReportCard title="# of Paid Events/ Total Revenue " value={stat8_1 + "/" + stat8_2} />
                </div>
                <br />
            </Container >
        </div >
    )
}

export default UserLevelReports