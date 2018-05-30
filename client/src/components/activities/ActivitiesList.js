import React from "react";
import { Link } from "react-router-dom";
import ActivityItem from "./ActivityItem";

// eslint-disable-next-line
const NoList = () => <h4>No activities were found ☹️</h4>;
const YesList = props => (
	<ul className="activities-list">
		{props.activities.map(activity => (
			<ActivityItem activity={activity} key={activity.id} />
		))}
	</ul>
);

const ActivitiesList = props => (
	<div className="activities">
		<h2>Activities</h2>
		{props.activities.length ? (
			<YesList activities={props.activities} />
		) : (
			<NoList />
		)}
		<Link to="/admin/activities/new">
			<div className="activity-item">
				<h3 id="add-activity">
					<span>Add Activity</span>
					<span id="add-activity-arrow" className="fas fa-arrow-right" />
				</h3>
			</div>
		</Link>
	</div>
);
export default ActivitiesList;
