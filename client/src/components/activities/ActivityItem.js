import React from "react";
import { formatMysqlDate } from "../../helpers";
// import { Link } from "react-router-dom";

class ActivityItem extends React.Component {
	state = {
		activity: {},
		activityName: "",
		date: "",
		startTime: "",
		endTime: ""
	};

	componentDidMount() {
		const activity = this.props.activity;
		const activityName = activity.activityName;
		const date = formatMysqlDate(activity.date).date;
		const startTime = formatMysqlDate(activity.startTime).time;
		const endTime = formatMysqlDate(activity.endTime).time;

		this.setState({
			activity,
			activityName,
			date,
			startTime,
			endTime
		});
	}

	render() {
		return (
			<li className="activity-item">
				<h3>{this.state.activityName}</h3>
				<hr />
				<p>Date: {this.state.date}</p>
				<p>Start: {this.state.startTime}</p>
				<p>End: {this.state.endTime}</p>
			</li>
		);
	}
}

export default ActivityItem;
