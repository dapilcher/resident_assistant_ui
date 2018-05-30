import React from "react";
import { withRouter } from "react-router-dom";
import {
	toTitleCase,
	formatMysqlTblName,
	formatMysqlDateForHtml,
	today,
	now
} from "../../helpers";

const VenueSelect = props => {
	const location = props.location;
	let venues = [];
	switch (location) {
		case "Lansdowne":
			venues = [
				"Chapel",
				"Main Dining Room",
				"Assisted Dining Room",
				"Pub",
				"Rehab"
			];
			break;
		case "The Village":
			venues = [
				"Chapel",
				"Activities Room",
				"Lobby",
				"Bristol Dining Room",
				"Pub",
				"Chelsea Great Room"
			];
			break;
		case "The Lodge":
			venues = ["LER", "Chapel", "Dining"];
			break;
		default:
			venues = ["Chapel", "Dining Room"];
	}
	return (
		<select
			className="new-data-form-input"
			name="strVenue"
			onChange={props.onChange}
			defaultValue={props.default ? props.default : "Chapel"}
		>
			{venues.map(venue => (
				<option key={`venue-option-${venue}`} value={venue}>
					{venue}
				</option>
			))}
		</select>
	);
};

class ActivityForm extends React.Component {
	state = this.props.location.state
		? { ...this.props.location.state }
		: {
				strLocation: "Lansdowne",
				strVenue: "Chapel",
				datStartDate: today(),
				datEndDate: today(),
				timTime: now(),
				strActivity: "",
				strActivityType: ""
		  };

	handleChange = e => {
		const newState = { ...this.state };
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	};

	handleSubmit = e => {
		e.preventDefault();
		//Do some stuff
		const oldData = this.props.location.state
			? { ...this.props.location.state }
			: null;
		const newData = { ...this.state };
		oldData
			? this.props.handleUpdate(newData, oldData)
			: this.props.handleUpdate(newData);

		console.log(oldData);
		console.log(newData);
		e.currentTarget.reset();
		this.props.history.push(this.props.redirect);
	};

	render() {
		return (
			<form className="new-data-form" onSubmit={this.handleSubmit}>
				<h3>{toTitleCase(this.props.title)}</h3>
				<div className="new-data-form-element">
					<label className="new-data-form-label" htmlFor="strLocation">
						Location
					</label>
					<select
						className="new-data-form-input"
						name="strLocation"
						onChange={this.handleChange}
						defaultValue={
							this.state.strLocation ? this.state.strLocation : "Lansdowne"
						}
					>
						<option value="Lansdowne">Lansdowne Place</option>
						<option value="The Village">The Village</option>
						<option value="The Lodge">The Lodge</option>
					</select>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strVenue" className="new-data-form-label">
						Venue
					</label>
					<VenueSelect
						location={this.state.strLocation}
						onChange={this.handleChange}
						default={this.state.strVenue ? this.state.strVenue : "Chapel"}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="datStartDate" className="new-data-form-label">
						Start Date
					</label>
					<input
						className="new-data-form-input"
						type="date"
						name="datStartDate"
						onChange={this.handleChange}
						defaultValue={
							this.state.datStartDate
								? formatMysqlDateForHtml(this.state.datStartDate).date
								: today()
						}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="datEndDate" className="new-data-form-label">
						End Date
					</label>
					<input
						className="new-data-form-input"
						type="date"
						name="datEndDate"
						onChange={this.handleChange}
						defaultValue={
							this.state.datEndDate
								? formatMysqlDateForHtml(this.state.datEndDate).date
								: today()
						}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="timTime" className="new-data-form-label">
						Time
					</label>
					<input
						className="new-data-form-input"
						type="time"
						name="timTime"
						onChange={this.handleChange}
						defaultValue={this.state.timTime ? this.state.timTime : now()}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strActivity" className="new-data-form-label">
						Activity
					</label>
					<input
						required
						className="new-data-form-input"
						type="text"
						name="strActivity"
						onChange={this.handleChange}
						defaultValue={this.state.strActivity ? this.state.strActivity : ""}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strActivityType" className="new-data-form-label">
						Activity Type
					</label>
					<select
						className="new-data-form-input"
						name="strActivityType"
						onChange={this.handleChange}
						defaultValue={
							this.state.strActivityType ? this.state.strActivityType : ""
						}
					>
						<option value="" />
						<option value="Church">Church</option>
					</select>
				</div>

				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default withRouter(ActivityForm);
