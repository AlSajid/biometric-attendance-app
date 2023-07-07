import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema(
	{
		type: {type: String, unique: true},
		count: {type: Number}
	},
	{versionKey: false}
);

const LeaveType = mongoose.models.LeaveType || mongoose.model("LeaveType", leaveTypeSchema);
export default LeaveType;
