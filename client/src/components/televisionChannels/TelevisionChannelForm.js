import React from "react";
import { withRouter } from "react-router-dom";
import { toTitleCase } from "../../helpers";

class TelevisionChannelForm extends React.Component {
	state = this.props.location.state ? { ...this.props.location.state } : {};

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
							this.state.strLocation ? this.state.strLocation : undefined
						}
					>
						<option value="Lansdowne">Lansdowne Place</option>
						<option value="The Village">The Village</option>
						<option value="The Lodge">The Lodge</option>
					</select>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strChannelName" className="new-data-form-label">
						Channel Name
					</label>
					<input
						className="new-data-form-input"
						type="text"
						name="strChannelName"
						onChange={this.handleChange}
						defaultValue={
							this.state.strChannelName ? this.state.strChannelName : undefined
						}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strChannelNameAbv" className="new-data-form-label">
						Channel Name Abbreviation
					</label>
					<input
						className="new-data-form-input"
						type="text"
						name="strChannelNameAbv"
						onChange={this.handleChange}
						defaultValue={
							this.state.strChannelNameAbv
								? this.state.strChannelNameAbv
								: undefined
						}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strEntertainmentType" className="new-data-form-label">
						Entertainment Type
					</label>
					<select
						className="new-data-form-input"
						name="strEntertainmentType"
						onChange={this.handleChange}
						defaultValue={
							this.state.strEntertainmentType
								? this.state.strEntertainmentType
								: undefined
						}
					>
						<option value="TV Shows">TV Shows</option>
						<option value="Movies">Movies</option>
						<option value="News">News</option>
						<option value="Sports">Sports</option>
						<option value="Family">Family</option>
						<option value="Infotainment">Infotainment</option>
						<option value="Church">Church</option>
					</select>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="intChannelNumber" className="new-data-form-label">
						Channel Number
					</label>
					<input
						className="new-data-form-input"
						type="number"
						name="intChannelNumber"
						onChange={this.handleChange}
						defaultValue={
							this.state.intChannelNumber
								? this.state.intChannelNumber
								: undefined
						}
					/>
				</div>
				<div className="new-data-form-element">
					<label htmlFor="strCategory" className="new-data-form-label">
						Category
					</label>
					<select
						className="new-data-form-input"
						name="strCategory"
						onChange={this.handleChange}
						defaultValue={
							this.state.strCategory ? this.state.strCategory : undefined
						}
					>
						<option value="TV Shows">TV Shows</option>
						<option value="Movies">Movies</option>
						<option value="News">News</option>
						<option value="Sports">Sports</option>
						<option value="Family">Family</option>
						<option value="Infotainment">Infotainment</option>
						<option value="Church">Church</option>
					</select>
				</div>

				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default withRouter(TelevisionChannelForm);
