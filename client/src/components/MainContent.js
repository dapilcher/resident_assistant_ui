import React from "react";
import DataTable from "./DataTable";

const MainContent = props => (
	<div className="content">
		<h1>Ascensnion Living</h1>
		<h2>Resident Assistant</h2>
		<div className="data-tables">
			<DataTable
				title="activities"
				data={props.activities}
				limit={10}
				linkToAll={true}
			/>
			<DataTable
				title="television-channels"
				data={props.televisionChannels}
				limit={10}
				linkToAll={true}
			/>
			<DataTable
				title="dining-menu"
				data={props.diningMenu}
				limit={10}
				linkToAll={true}
			/>
		</div>
	</div>
);

export default MainContent;
