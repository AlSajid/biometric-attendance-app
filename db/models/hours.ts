import { models, model, Schema } from 'mongoose'

const hoursSchema = new Schema(
	{
		start: { type: String },
		late: { type: String },
		end: { type: String }
	},
	{ versionKey: false }
)

const Hours = model('Hours', hoursSchema)

export default Hours
