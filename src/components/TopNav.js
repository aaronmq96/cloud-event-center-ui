import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { getAuth, signOut } from "firebase/auth";


const TopNav = () => {

    const [CECTime, setCECTime] = useState()

    // useEffect(() => {
    //     setCECTime(moment(new Date()).format("MM/DD/YYYY"))
    // }, [])

    const handleSignOut = async () => {
        try {
            const auth = getAuth()
            console.log("LL", auth)
            signOut(auth)
            localStorage.clear()

        }
        catch (error) {
            console.log("error signing out")
        }
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <div className='top-nav-wrapper'>

                    <div>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={require("../assets/icon.png")}
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                style={{ marginRight: "10px" }}
                            />{''}
                            Cloud Event Center
                        </Navbar.Brand>
                    </div>
                    <div className="top-nav-right">
                        <div>
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/createEvent">Create Event</Nav.Link>
                                <Nav.Link onClick={handleSignOut} href="/login">Sign Out</Nav.Link>
                            </Nav>
                        </div>
                        <div style={{ paddingTop: "8px" }}>
                            <input type="date"
                                onFocus={(e) => e.target.type = "date"}
                                // onBlur={(e) => e.target.type = "text"}
                                value={CECTime}
                                onChange={(e) => setCECTime(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}

export default TopNav