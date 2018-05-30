function formatMysqlDate(sql) {
	// eslint-disable-next-line
	const [year, month, day, hour, minute, second] = sql.split(/[- :T]/);
	const date = `${month}-${day}-${year}`;
	const time = `${hour}:${minute}`;
	return { date, time };
}

function formatMysqlDateForHtml(sql) {
	// eslint-disable-next-line
	const [year, month, day, hour, minute, second] = sql.split(/[- :T]/);
	const date = `${year}-${month}-${day}`;
	const time = `${hour}:${minute}`;
	return { date, time };
}

function formatMysqlTblName(str) {
	return str
		.slice(3)
		.split(/(?=[A-Z])/)
		.join(" ");
}

function toTitleCase(str) {
	if (str.includes("-")) {
		return str
			.split("-")
			.map(word => word.replace(word[0], word[0].toUpperCase()))
			.join(" ");
	} else {
		return str.replace(str[0], str[0].toUpperCase());
	}
}

function today() {
	const today = new Date();
	return `${today.getFullYear()}-${
		today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
	}-${today.getDate()}`;
}

function now() {
	const today = new Date();
	return `${
		today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
	}:${today.getMinutes()}`;
}

export {
	formatMysqlDate,
	formatMysqlTblName,
	formatMysqlDateForHtml,
	toTitleCase,
	today,
	now
};
