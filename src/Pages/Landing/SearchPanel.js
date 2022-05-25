import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const SearchPanel = (props) => {
	const {
		getSearchResults,
		location,
		handleLocationChange,
		status,
		handleStatusChange,
		startTime,
		handleStartTimeChange,
		endTime,
		handleEndTimeChange,
		keyword,
		handleKeywordChange,
		organizer,
		handleOrganizerChange,
	} = props;

	return (
		<div className="search-panel-wrapper">
			<div className="search-wrapper">
				<Form id="searchPanelForm">
					<h2>BROWSE EVENTS AROUND YOU</h2>
					<Row>
						<Col>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Location"
								value={location}
								onChange={handleLocationChange()}
							/>
						</Col>
						<Col>
							<Form.Select
								value={status}
								onChange={handleStatusChange()}
								style={{
									height: "100%",
									fontSize: "20px",
									minWidth: "200px",
								}}
							>
								<option default value="Active">
									Active
								</option>
								<option value="OpenForRegistration">
									OpenForRegistration
								</option>
								<option value="All">All</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Start Time"
								onFocus={(e) =>
									(e.target.type = "datetime-local")
								}
								onBlur={(e) => (e.target.type = "text")}
								value={startTime}
								onChange={handleStartTimeChange()}
							/>
						</Col>
						<Col>
							<Form.Control
								type="text"
								size="lg"
								placeholder="End Time"
								onFocus={(e) =>
									(e.target.type = "datetime-local")
								}
								onBlur={(e) => (e.target.type = "text")}
								value={endTime}
								onChange={handleEndTimeChange()}
							/>
						</Col>

						<Col>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Keyword"
								value={keyword}
								onChange={handleKeywordChange()}
							/>
						</Col>
						<Col>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Organizer"
								onChange={handleOrganizerChange()}
								value={organizer}
							/>
						</Col>

						<Col>
							<Button
								size="lg"
								type="button"
								onClick={getSearchResults()}
							>
								Search
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default SearchPanel;
