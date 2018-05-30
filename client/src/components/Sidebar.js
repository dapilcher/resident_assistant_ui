import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
	<div id="sidebar">
		<ul className="sidebar-links">
			<li className="sidebar-link">
				<Link to="/admin/">Home</Link>
			</li>
			<li className="sidebar-link">
				<Link to="/admin/activities">Activities</Link>
			</li>
			<li className="sidebar-link">
				<Link to="/admin/television-channels">Television Channels</Link>
			</li>
			<li className="sidebar-link">
				<Link to="/admin/dining-menu">Dining Menu</Link>
			</li>
		</ul>
	</div>
);

export default Sidebar;
