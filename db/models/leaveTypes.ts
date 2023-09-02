import { models, model, Schema } from 'mongoose'

const leaveTypeSchema = new Schema(
	{
		type: { type: String, unique: true },
		count: { type: Number }
	},
	{ versionKey: false }
)

const LeaveType = model('LeaveType', leaveTypeSchema)
export default LeaveType
