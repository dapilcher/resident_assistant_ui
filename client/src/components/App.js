import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import MainContent from "./MainContent";
// import Header from "./Header";
import Sidebar from "./Sidebar";
import DataTable from "./DataTable";
import ActivityForm from "./activities/ActivityForm";
import TelevisionChannelForm from "./televisionChannels/TelevisionChannelForm";
import DataForm from "./DataForm";

class App extends React.Component {
	// State
	state = {
		user: { username: "doug", location: "Lansdowne" },
		activities: { model: [], data: [] },
		televisionChannels: { model: [], data: [] },
		diningMenu: { model: [], data: [] }
	};

	// Lifecycle Methods
	componentDidMount() {
		this.populateActivities();
		this.populateTelevisionChannels();
		this.populateDiningMenu();
	}

	// Methods for initializing state

	populateActivities = async () => {
		const response = await fetch(`/api/activities/${this.state.user.location}`);
		const data = await response.json();

		if (response.status !== 200) throw Error(data.body);

		this.setState({ activities: { data: data.rows, model: data.fields } });
	};

	populateTelevisionChannels = async () => {
		const response = await fetch(
			`/api/television-channels/${this.state.user.location}`
		);
		const data = await response.json();

		if (response.status !== 200) throw Error(data.body);

		this.setState({
			televisionChannels: {
				data: data.rows,
				model: data.fields
			}
		});
	};

	populateDiningMenu = async () => {
		const response = await fetch(
			`/api/dining-menu/${this.state.user.location}`
		);
		const data = await response.json();

		if (response.status !== 200) throw Error(data.body);

		this.setState({ diningMenu: { data: data.rows, model: data.fields } });
	};

	// CRUD methods
	// read -- populate state methods

	// create activity
	addActivity = activity => {
		// copy state
		const updatedActivities = [...this.state.activities.data];
		//change copy
		updatedActivities.push(activity);

		// post request
		this.postActivity(activity);

		// update state
		this.setState({
			activities: {
				data: updatedActivities,
				model: this.state.activities.model
			}
		});
	};

	postActivity = activity => {
		axios
			.post("/api/activities/", {
				activity
			})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	// update activity
	updateActivity = (newActivity, oldActivity) => {
		console.log("updating activities");
		console.log(newActivity);
		console.log(oldActivity);
		const activities = [...this.state.activities.data];
		const index = activities.findIndex(
			activity =>
				activity.strLocation === oldActivity.strLocation &&
				activity.strVenue === oldActivity.strVenue &&
				activity.datStartDate === oldActivity.datStartDate &&
				activity.timTime === oldActivity.timTime
		);
		console.log(index);
		activities[index] = newActivity;
		this.setState({
			activities: {
				data: activities,
				model: this.state.activities.model
			}
		});
	};
	// delete activity

	// create television channel
	addTelevisionChannel = channel => {
		// copy state
		const updatedChannels = [...this.state.televisionChannels.data];
		//change copy
		updatedChannels.push(channel);
		// update state
		this.setState({
			televisionChannels: {
				data: updatedChannels,
				model: this.state.televisionChannels.model
			}
		});
	};
	// update television channel
	updateTelevisionChannel = (newChannel, oldChannel) => {
		console.log("updating channels");
		console.log(newChannel);
		console.log(oldChannel);
		const channels = [...this.state.televisionChannels.data];
		const index = channels.findIndex(
			channel =>
				channel.strLocation === oldChannel.strLocation &&
				channel.strChannelName === oldChannel.strChannelName &&
				channel.intChannelNumber === oldChannel.intChannelNumber
		);
		console.log(index);
		channels[index] = newChannel;
		this.setState({
			televisionChannels: {
				data: channels,
				model: this.state.televisionChannels.model
			}
		});
	};
	// delete television channel

	// create dining menu
	// update dining menu
	// delete dining menu

	render() {
		return (
			<div className="flex-container">
				{/* <div>
					<Header user={this.state.user} />
				</div> */}
				<div id="main">
					<div className="left">
						<Sidebar />
					</div>
					<div className="right">
						<Switch>
							<Route
								exact
								path="/admin"
								render={() => (
									<MainContent
										activities={this.state.activities.data}
										televisionChannels={this.state.televisionChannels.data}
										diningMenu={this.state.diningMenu.data}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/activities"
								render={() => (
									<DataTable
										title="activities"
										data={this.state.activities.data}
										linkToAll={false}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/activities/new"
								render={() => (
									<ActivityForm
										title="new-activity"
										location={this.state.user.location}
										redirect="/admin/activities/"
										model={this.state.activities.model}
										handleUpdate={this.addActivity}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/activities/edit"
								render={() => (
									<ActivityForm
										title="edit-activity"
										location={this.state.user.location}
										redirect="/admin/activities/"
										model={this.state.activities.model}
										handleUpdate={this.updateActivity}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/television-channels"
								render={() => (
									<DataTable
										title="television-channels"
										data={this.state.televisionChannels.data}
										linkToAll={false}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/television-channels/new"
								render={() => (
									<TelevisionChannelForm
										title="new-television-channel"
										location={this.state.user.location}
										redirect="/admin/television-channels/"
										model={this.state.televisionChannels.model}
										handleUpdate={this.addTelevisionChannel}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/television-channels/edit"
								render={() => (
									<TelevisionChannelForm
										title="edit-television-channel"
										location={this.state.user.location}
										redirect="/admin/television-channels/"
										model={this.state.televisionChannels.model}
										handleUpdate={this.updateTelevisionChannel}
									/>
								)}
							/>
							<Route
								exact
								path="/admin/dining-menu"
								render={() => (
									<DataTable
										title="dining-menu"
										data={this.state.diningMenu.data}
										linkToAll={false}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
