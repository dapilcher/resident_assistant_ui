import React from "react";
import { formatMysqlDate, formatMysqlTblName } from "../helpers";
// import { Link } from "react-router-dom";

const formatData = (key, value) => {
	let newValue = value;
	if (!value) newValue = "none";
	if (key.toUpperCase().includes("DATE")) {
		newValue = formatMysqlDate(value).date;
	}
	return `${formatMysqlTblName(key)}: ${newValue}`;
};

const DataItem = props => {
	let keys = Object.keys(props.item);
	if (props.limit > 0) keys = keys.slice(0, props.limit);
	return (
		<li className="data-item">
			<ul>
				{keys.map(key => (
					<li className="data-item-value" key={`${props.id}-${key}`}>
						{formatData(key, props.item[key])}
					</li>
				))}
			</ul>
		</li>
	);
};

export default DataItem;
