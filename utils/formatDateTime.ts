export default function formatDateTime(date: any, type: string) {
	if (date === undefined) return "";
	const inputDate = new Date(date);

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const day = String(inputDate.getDate()).padStart(2, "0");
	const month = months[inputDate.getMonth()];
	const year = inputDate.getFullYear();
	let hours = inputDate.getHours();
	const minutes = String(inputDate.getMinutes()).padStart(2, "0");
	const seconds = String(inputDate.getSeconds()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	const formattedTime = `${hours}.${minutes}.${seconds} ${ampm}`;

	switch (type) {
		case "date":
			return `${day} ${month} ${year}`;
		case "time":
			return formattedTime;
		case "input":
			return `${year}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

		case "compare":
			return parseInt(inputDate.getHours() + minutes + seconds);

		default:
			return `${day} ${month} ${year} ${formattedTime}`;
	}
}
