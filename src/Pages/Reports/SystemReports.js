import React from 'react'
import { Card, Container } from 'react-bootstrap'
import ReportCard from './ReportCard'

const SystemReports = () => {
    return (
        <div>
            <br />
            <h3>System Reports</h3>
            <br />
            <br />
            <br />
            <Container>
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

                <div className='report-wrapper'>
                    <ReportCard title="Statistic 1" value="90" />

                    <ReportCard title="Statistic 2" value="100" />
                </div>
            </Container >
        </div >
    )
}

export default SystemReports