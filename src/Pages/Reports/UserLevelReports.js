import React from 'react'
import { Container } from 'react-bootstrap'
import ReportCard from './ReportCard'

const UserLevelReports = () => {
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
                    <ReportCard title="Statistic 1" value="90" />
                    <ReportCard title="Statistic 2" value="100" />
                    <ReportCard title="Statistic 3" value="200" />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3 style={{ textAlign: 'left' }}>As an Organizer</h3>
                <br />

                <div className='report-wrapper'>
                    <ReportCard title="Statistic 1" value="90" />
                    <ReportCard title="Statistic 2" value="100" />
                    <ReportCard title="Statistic 3" value="200" />
                </div>
            </Container >
        </div >
    )
}

export default UserLevelReports