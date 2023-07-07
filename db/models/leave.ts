import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
	{
		id: {type: String},
		start: {type: Date},
		end: {type: Date},
		leaveType: {type: String}
	},
	{versionKey: false}
);

const Leave = mongoose.models.Leave || mongoose.model("Leave", leaveSchema);
export default Leave;
