import React from "react";
import { Link } from "react-router-dom";
import { toTitleCase, formatMysqlDate, formatMysqlTblName } from "../helpers";

// eslint-disable-next-line
const NoData = () => <h4>No data was found ☹️</h4>;
const YesData = props => (
	<table className="data-table">
		<thead>
			<tr>
				{Object.keys(props.data[0]).map(key => (
					<th key={`${props.title}-table-header-${key}`}>
						{formatMysqlTblName(key)}
					</th>
				))}
				<th>Edit</th>
			</tr>
		</thead>
		<tbody>
			{props.data.slice(0, props.limit).map(item => (
				<tr
					key={`${props.title}-row${props.data.indexOf(item)}`}
					className={props.data.indexOf(item) % 2 === 1 ? "odd-table-row" : ""}
				>
					{Object.keys(item).map(key => (
						<td key={`${props.title}-row${props.data.indexOf(item)}-${key}`}>
							{key.includes("Date")
								? formatMysqlDate(item[key]).date
								: item[key]}
						</td>
					))}
					<td>
						<Link
							to={{
								pathname: `/admin/${props.title}/edit`,
								state: { ...item }
							}}
						>
							edit
						</Link>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

const LinkToAll = props => (
	<Link to={`/admin/${props.title}/`} className="link-to-all">
		See all
	</Link>
);

const DataTable = props => (
	<div className="data-table-container">
		<div className="data-table-header">
			<h2>{toTitleCase(props.title)}</h2>
			<Link to={`/admin/${props.title}/new`} className="new-data-item-link">
				<button>
					<span>Create New</span>
					<span className="new-data-item-plus fas fa-plus" />
				</button>
			</Link>
		</div>
		{props.linkToAll ? <LinkToAll title={props.title} /> : ""}
		{props.data.length ? (
			<YesData limit={props.limit} title={props.title} data={props.data} />
		) : (
			<NoData />
		)}
	</div>
);
export default DataTable;
