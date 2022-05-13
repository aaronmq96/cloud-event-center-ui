import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { REACT_APP_BASE_API_URL } from '../../config'


const Signup = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    // console.log(auth)
    const createAccount = async (e) => {
        e.preventDefault();
        try {

            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log("Credentials", credentials)
            await axios.get(`${REACT_APP_BASE_API_URL}/user/signupMail/${email}`)

            await sendEmailVerification(credentials.user, {
                url: `${REACT_APP_BASE_API_URL}/user/verificationSuccess/${email}`
            })

            // console.log("Verify", res)

            setMessage("Verification link sent to mail. Please complete step to login.")
            // alert("Verification link sent to mail. Please complete step to login.")
        }
        catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            switch (errorCode) {
                case 'auth/weak-password':
                    console.log("Password should be atleast 6 characters");
                    setMessage('Password should be atleast 6 characters !')
                    break
                case 'auth/invalid-email':
                    setMessage('Email Address entered is invalid!')
                    break
                case 'auth/internal-error':
                    setMessage('Internal Server Error !')
                    break
                default:
                    console.log("Unknown  Error Occured")
            }
        }
    }

    const handleEmailChange = (e) => {

        console.log(e.target.value)
        setEmail(e.target.value)

    }

    const handlePasswordChange = (e) => {

        console.log(e.target.value)
        setPassword(e.target.value)

    }

    const checkIfUserLoggedIn = () => {
        const userId = localStorage.getItem('userId')


        if (userId) {
            navigate('/')
            return
        }
    }

    useEffect(() => {
        const auth = getAuth()
        console.log("Auth", auth)

        checkIfUserLoggedIn()

    }, [])
    return (
        <div className='signup-wrapper' >
            <div className='signup-sub-wrapper'>
                <h2 style={{ textAlign: "center" }}>Create your acccount</h2>
                <br />

                <Form>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="s-input-main" type="email" placeholder="Enter email" onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="s-input-main" type="password" placeholder="Password" onChange={handlePasswordChange} />
                    </Form.Group>

                    <div className='buttons-wrapper'>
                        <Button variant="primary" type="submit" onClick={createAccount}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <p style={{ textAlign: "center", marginTop: "10px" }}>Already have an account? <span><a href="/login">Login </a></span></p>
                <p style={{ color: "red" }}> {message}</p>
            </div>
        </div>
    )
}

export default Signup