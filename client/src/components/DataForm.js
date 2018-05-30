// deprecated

import React from "react";
import { withRouter } from "react-router-dom";
import {
	toTitleCase,
	formatMysqlTblName,
	formatMysqlDateForHtml
} from "../helpers";

const RenderInput = props => {
	let type = "";
	switch (props.type) {
		case 1:
			type = "number";
			break;
		case 3:
			type = "number";
			break;
		case 10:
			type = "date";
			break;
		case 11:
			type = "time";
			break;
		case 253:
			type = "text";
			break;
		default:
			type = "text";
	}
	return (
		<input
			className="new-data-form-input"
			type={type}
			name={props.name}
			defaultValue={
				props.value && props.name.includes("Date")
					? formatMysqlDateForHtml(props.value).date
					: props.value
			}
			onChange={props.onChange}
		/>
	);
};

class DataForm extends React.Component {
	state = this.props.location.state ? { ...this.props.location.state } : {};

	handleChange = e => {
		const newState = {};
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
				<h3>Create New {toTitleCase(this.props.title)}</h3>
				{this.props.model.map(field => (
					<div
						className="new-data-form-element"
						key={`form-element-${field.name}`}
					>
						<label className="new-data-form-label" htmlFor={field.name}>
							{formatMysqlTblName(field.name)}
						</label>
						<RenderInput
							type={field.type}
							name={field.name}
							value={
								this.state[field.name] ? this.state[field.name] : undefined
							}
							onChange={this.handleChange}
						/>
					</div>
				))}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default withRouter(DataForm);
