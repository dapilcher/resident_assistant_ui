const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionPool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "",
	database: "assistance_test"
});

// Activities routes -------------------------------------

app.route("/api/activities/:location").get((req, res) => {
	const sql =
		req.params.location === "all"
			? "SELECT * FROM tblActivitySchedule;"
			: `SELECT * FROM tblActivitySchedule WHERE (strLocation='${
					req.params.location
			  }');`;

	connectionPool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
		}

		connection.query(sql, (err, rows, fields) => {
			if (err) {
				console.log(err);
				res.send(err);
			}
			console.log("Activities rows sent successfully");
			// console.log(fields);
			connection.release();
			const data = { rows, fields };
			res.send(data);
		});
	});
});

// post
app.route("/api/activities/").post((req, res) => {
	let {
		strLocation,
		strVenue,
		datStartDate,
		datEndDate,
		timTime,
		strActivity,
		strActivityType
	} = req.body;

	// TODO: validate & sanitize

	let sql =
		"INSERT INTO tblActivitySchedule (strLocation, strVenue, datStartDate, datEndDate, timTime, strActivity, strActivityType) ";
	sql += `VALUES (${(strLocation,
	strVenue,
	datStartDate,
	datEndDate,
	timTime,
	strActivity,
	strActivityType)});`;

	connectionPool.getConnection((err, connection) => {
		if (err) console.log(err);

		connection.query(sql, (err, results, fields) => {
			if (err) console.log(err);

			console.log("Activities row inserted");
			console.log(results);
		});
	});
});

// put
app.route("/api/activities/").put((req, res) => {
	const { newActivity, oldActivity } = req.body;

	// TODO: validate & sanitize

	let sql = "UPDATE tblActivitySchedule ";

	sql += `SET strLocation=${newActivity.strLocation}, strVenue=${
		newActivity.strVenue
	}, datStartDate=${newActivity.datStartDate}, datEndDate=${
		newActivity.datEndDate
	}, timTime=${newActivity.timTime}, strActivity=${
		newActivity.strActivity
	}, strActivityType=${newActivity.strActivityType} `;

	sql += `WHERE strLocation=${oldActivity.strLocation} AND strVenue=${
		oldActivity.strVenue
	} AND datStartDate=${oldActivity.datStartDate} AND datEndDate=${
		oldActivity.datEndDate
	} AND timTime=${oldActivity.timTime} AND strActivity=${
		oldActivity.strActivity
	} AND strActivityType=${oldActivity.strActivityType};`;

	connectionPool.getConnection((err, connection) => {
		if (err) console.log(err);

		connection.query(sql, (err, results, fields) => {
			if (err) console.log(err);

			console.log("Activities row updated");
			console.log(results);
		});
	});
});

// delete

// TV Guide routes ---------------------------------------

app.route("/api/television-channels/:location").get((req, res) => {
	const sql =
		req.params.location === "all"
			? "SELECT * FROM tblTelevisionChannels"
			: `SELECT * FROM tblTelevisionChannels WHERE (strLocation='${
					req.params.location
			  }')`;
	connectionPool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
		}

		connection.query(sql, (err, rows, fields) => {
			if (err) {
				console.log(err);
				res.send(err);
			}
			console.log("TV Channels rows sent successfully");
			// console.log(fields);
			connection.release();
			const data = { rows, fields };
			res.send(data);
		});
	});
});

// post
app.route("/api/television-channels/").post((req, res) => {
	let {
		strLocation,
		strChannelName,
		strChannelNameAbv,
		strEntertainmentType,
		intChannelNumber,
		strCategory
	} = req.body;

	// TODO: validate & sanitize

	let sql =
		"INSERT INTO tblActivitySchedule (strLocation, strVenue, datStartDate, datEndDate, timTime, strActivity, strActivityType) ";
	sql += `VALUES (${(strLocation,
	strChannelName,
	strChannelNameAbv,
	strEntertainmentType,
	intChannelNumber,
	strCategory)});`;

	connectionPool.getConnection((err, connection) => {
		if (err) console.log(err);

		connection.query(sql, (err, results, fields) => {
			if (err) console.log(err);

			console.log("Television channel row inserted");
			console.log(results);
		});
	});
});

// put
app.route("/api/activities/").put((req, res) => {
	const { newChannel, oldChannel } = req.body;

	// TODO: validate & sanitize

	let sql = "UPDATE tblActivitySchedule ";

	sql += `SET strLocation=${newChannel.strLocation}, strChannelName=${
		newChannel.strChannelName
	}, strChannelNameAbv=${newChannel.strChannelNameAbv}, strEntertainmentType=${
		newChannel.strEntertainmentType
	}, intChannelNumber=${newChannel.intChannelNumber}, strCategory=${
		newChannel.strCategory
	} `;

	sql += `WHERE strLocation=${oldChannel.strLocation} AND strChannelName=${
		oldChannel.strChannelName
	} AND strChannelNameAbv=${
		oldChannel.strChannelNameAbv
	} AND strEntertainmentType=${
		oldChannel.strEntertainmentType
	} AND intChannelNumber=${oldChannel.intChannelNumber} AND strCategory=${
		oldChannel.strCategory
	};`;

	connectionPool.getConnection((err, connection) => {
		if (err) console.log(err);

		connection.query(sql, (err, results, fields) => {
			if (err) console.log(err);

			console.log("Activities row updated");
			console.log(results);
		});
	});
});

// Dining menu routes --------------------------------------

app.route("/api/dining-menu/:location").get((req, res) => {
	const sql =
		req.params.location === "all"
			? "SELECT * FROM tblDiningMenu"
			: `SELECT * FROM tblDiningMenu WHERE (strLocation='${
					req.params.location
			  }')`;
	connectionPool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
		}

		connection.query(sql, (err, rows, fields) => {
			if (err) {
				console.log(err);
				res.send(err);
			}

			console.log("Dining Menu rows sent successfully");
			// console.log(fields);
			connection.release();
			const data = { rows, fields };
			res.send(data);
		});
	});
});

// Users routes ----------------------------------------------
// TODO: Users/auth

app.listen(port, () => console.log(`Listening on port ${port}`));
