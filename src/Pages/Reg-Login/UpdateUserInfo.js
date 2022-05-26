import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { REACT_APP_BASE_API_URL } from "../../config";
const UpdateUserInfo = () => {
	const navigate = useNavigate();

	const [accountType, setAccountType] = useState();
	const [fullName, setFullName] = useState("");
	const [screenName, setScreenName] = useState();
	const [gender, setGender] = useState();
	const [description, setDescription] = useState();
	const [street, setStreet] = useState();
	const [apartment, setApartment] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [zipcode, setZipcode] = useState();

	const handleUpdate = async (e) => {
		e.preventDefault();

		const userId = localStorage.getItem("userId");
		try {
			const userPayload = {
				userId,
				accountType,
				fullName,
				screenName,
				gender,
				description,
				street,
				apartment,
				city,
				state,
				zipcode,
				emailId: localStorage.getItem("userEmail"),
			};

			const res = await axios.post(
				`${REACT_APP_BASE_API_URL}/user/createUser`,
				userPayload
			);
			console.log(res.data);

			if (res.data) navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleAccountType = (e) => {
		console.log(e.target.value);
		setAccountType(e.target.value);
	};


	useEffect(() => {
		if (!localStorage.getItem("userId")) {
			navigate("/login");
			return;
		}
	}, [])

	return (
		<div className="register-wrapper">
			<div className="register-content">
				<h2>Update Details</h2>
				<br />
				<Form>
					<fieldset>
						<Form.Group as={Col}>
							<Form.Label as="legend">Account Type</Form.Label>
							<Row>
								<Form.Group as={Col}>
									<Form.Check
										type="radio"
										label="Person"
										value="Person"
										name="formHorizontalRadios"
										id="formHorizontalRadios1"
										onChange={handleAccountType}
										checked={accountType === "Person"}
									/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Check
										type="radio"
										label="Organization"
										value="Organization"
										name="formHorizontalRadios"
										id="formHorizontalRadios2"
										onChange={handleAccountType}
										checked={accountType === "Organization"}
									/>
								</Form.Group>
							</Row>
						</Form.Group>
					</fieldset>
					<Form.Group className="mb-3" controlId="formGridFullName">
						<Form.Label as="legend">Full Name</Form.Label>
						<Form.Control
							className="input-main"
							placeholder="Full Name"
							onChange={(e) => {
								console.log(e.target.value);
								setFullName(e.target.value);
							}}
							value={fullName}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridScreenName">
						<Form.Label as="legend">Screen Name</Form.Label>
						<Form.Control
							className="input-main"
							placeholder="UserName"
							onChange={(e) => setScreenName(e.target.value)}
							value={screenName}
						/>
					</Form.Group>

					<fieldset>
						<Form.Group as={Col}>
							<Form.Label as="legend">Gender</Form.Label>
							<Row>
								<Form.Group as={Col}>
									<Form.Check
										type="radio"
										label="Male"
										name="radioGroup"
										id="formHorizontalRadios3"
										checked={gender === "Male"}
										onChange={(e) =>
											setGender(e.target.value)
										}
										value="Male"
									/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Check
										type="radio"
										label="Female"
										name="radioGroup"
										id="formHorizontalRadios4"
										checked={gender === "Female"}
										onChange={(e) =>
											setGender(e.target.value)
										}
										value="Female"
									/>
								</Form.Group>
							</Row>
						</Form.Group>
					</fieldset>
					<Form.Group
						className="mb-3"
						controlId="formGridDescription"
					>
						<Form.Label as="legend">Description </Form.Label>
						<Form.Control
							className="input-main"
							placeholder="Description"
							as="textarea"
							rows={3}
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						/>
					</Form.Group>
					<Row>
						<Form.Group
							as={Col}
							className="mb-3"
							controlId="formGridStreet"
						>
							<Form.Label as="legend">Street</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="1234 Main Street"
								onChange={(e) => setStreet(e.target.value)}
								value={street}
							/>
						</Form.Group>
						<Form.Group
							as={Col}
							className="mb-3"
							controlId="formGridStreet"
						>
							<Form.Label as="legend">Apartment</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="Apartment, studio, or floor"
								onChange={(e) => setApartment(e.target.value)}
								value={apartment}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label as="legend">City</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="San Jose"
								onChange={(e) => setCity(e.target.value)}
								value={city}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label as="legend">State</Form.Label>
							<Form.Control
								className="input-main"
								placeholder="California"
								onChange={(e) => setState(e.target.value)}
								value={state}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label as="legend">Zipcode</Form.Label>
							<Form.Control
								className="input-main"
								type="number"
								placeholder="95110"
								onChange={(e) => setZipcode(e.target.value)}
								value={zipcode}
							/>
						</Form.Group>
					</Row>
					<Button
						variant="primary"
						type="submit"
						style={{
							minWidth: "250px",
							minHeight: "60px",
							fontSize: "24px",
						}}
						onClick={handleUpdate}
					>
						Update
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default UpdateUserInfo;
