import React, { useEffect, useRef, useState } from 'react'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig'
import { Button, Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BASE_API_URL } from '../../config';
import toast, { Toaster } from "react-hot-toast";


const Login = () => {

    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()
    // const [message, setMessage] = useState()
    const provider = new GoogleAuthProvider();

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const checkUser = async (e) => {

        const userId = localStorage.getItem('userId')

        const res = await axios.get(`${REACT_APP_BASE_API_URL}/user/checkUser/${userId}`);

        console.log(res.data)
        if (!res.data) {
            navigate('/updateUser')
        }
        else {
            navigate('/')
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {

            const res = await signInWithEmailAndPassword(auth, email.current.value, password.current.value)

            const user = res.user;
            // console.log("deets", user);


            if (user.emailVerified) {
                localStorage.setItem('userId', user.uid)
                localStorage.setItem('userEmail', user.email)
                notifySuccess("User Verified")
                checkUser()
            }
            else {
                notifyError("User not verified. Please verify to continue.")
                console.log("not verified")
            }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            switch (errorCode) {
                case 'auth/wrong-password':
                    notifyError('Entered password is incorrect !')
                    break
                case 'auth/user-not-found':
                    notifyError('No user with this email exists !')
                    break
                default:
                    notifyError("Unknown Error Occured")
            }

        }

    }
    const signInWithGoogle = async (e) => {
        e.preventDefault();

        const res = await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                console.log("Token", token)

                const user = result.user;

                console.log("User", user)

                localStorage.setItem('userId', user.uid)
                localStorage.setItem('userEmail', user.email)

                checkUser()

                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode, " : ", errorMessage, " email ", email, " credential ", credential)
            });
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
        <div className="wrap-home">
            <div className="overlay">
                <div className='signup-wrapper' >
                    <Toaster />
                    <div className='signup-sub-wrapper'>
                        <h2 style={{ textAlign: "center" }}>Login</h2>
                        <br />

                        <Form>
                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="s-input-main" type="email" placeholder="Enter email" ref={email} />
                            </Form.Group>

                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="s-input-main" type="password" placeholder="Password" ref={password} />
                            </Form.Group>

                            <div className='buttons-wrapper'>
                                <Link to="/updateUser"><Button variant="primary" type="submit" onClick={handleSignIn} style={{ width: '100%' }}>
                                    Sign In
                                </Button></Link>
                                <hr />

                            </div>
                            <div className='google-button-wrapper'>
                                <Link to="/updateUser" ><GoogleButton onClick={signInWithGoogle} style={{ backgroundColor: "#0d6efd", overflow: "hidden", width: "100%" }} /></Link>
                            </div>
                        </Form >
                        <p style={{ textAlign: "center", marginTop: "10px" }}>Dont have an account? <span><a href="/signup"> Create new acccount</a></span></p>
                        {/* <p style={{ color: "red" }}>{message}</p> */}
                    </div >
                </div >
            </div>
        </div >

    )
}

export default Login