import React from "react";

const Header = props => (
	<div id="header">
		<div className="left">
			<h1>Welcome</h1>
		</div>
		<div className="right">
			<div className="user">
				{`${props.user.username} -- ${props.user.location}`}
			</div>
		</div>
	</div>
);

export default Header;
