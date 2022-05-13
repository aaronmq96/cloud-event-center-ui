import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TopNav from '../../components/TopNav'
import SearchPanel from './SearchPanel'
import SearchResults from './SearchResults';
import { REACT_APP_BASE_API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const [data, setData] = useState();
    const [userData, setUserData] = useState()
    const [location, setLocation] = useState("")
    const [status, setStatus] = useState("Active")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [keyword, setKeyword] = useState("")
    const [organizer, setOrganizer] = useState("")
    const navigate = useNavigate()




    const handleLocationChange = (e) => {
        // console.log(e.target.value)
        setLocation(e.target.value)
    }

    const handleStatusChange = (e) => {
        console.log(e.target.value)

        setStatus(e.target.value)
    }
    const handleStartTimeChange = (e) => {
        console.log(e.target.value)
        setStartTime(e.target.value)
    }

    const handleEndTimeChange = (e) => {
        console.log(e.target.value)
        setEndTime(e.target.value)
    }

    const handleKeywordChange = (e) => {
        console.log(e.target.value)
        setKeyword(e.target.value)
    }

    const handleOrganizerChange = (e) => {
        console.log(e.target.value)
        setOrganizer(e.target.value)
    }


    const getSearchResults = async (e) => {
        let userLocation = location
        if (userLocation == undefined) {
            const userDataObj = await getUserDetails()
            userLocation = userDataObj.address.city
        }

        const payload = {
            location: userLocation,
            eventStatus: status,
            startTime,
            endTime,
            keyword,
            organizer
        }


        // console.log("payload", payload)
        const res = await axios.get(`${REACT_APP_BASE_API_URL}/event/search`, { params: payload })
        setData(res.data)
    }

    const getUserDetails = async () => {

        const userId = localStorage.getItem('userId')

        if (!userId) {
            navigate('/login')
            return
        }
        else {
            console.log(userId)

        }

        const res = await axios.get(`${REACT_APP_BASE_API_URL}/user/getUser/${userId}`);
        if (res.data) {
            setUserData(res.data)
            setLocation(res.data?.address.city)

            console.log(res.data)
        }
        else {
            console.log("here")
        }
        return res.data


    }

    useEffect(() => {
        getSearchResults()
    }, [])

    return (
        <div>
            <br />
            <br />
            <SearchPanel
                data={data}
                getSearchResults={() => getSearchResults}

                location={location}
                handleLocationChange={() => handleLocationChange}

                status={status}
                handleStatusChange={() => handleStatusChange}

                startTime={startTime}
                handleStartTimeChange={() => handleStartTimeChange}

                endTime={endTime}
                handleEndTimeChange={() => handleEndTimeChange}

                keyword={keyword}
                handleKeywordChange={() => handleKeywordChange}

                organizer={organizer}
                handleOrganizerChange={() => handleOrganizerChange}
            />
            <SearchResults
                data={data}
            />
        </div>
    )
}

export default LandingPage