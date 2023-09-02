import { models, model, Schema } from 'mongoose'

const userSchema = new Schema(
	{
		id: { type: String, required: true },
		name: { type: String, required: true },
		designation: { type: String, required: true },
		department: { type: String, required: true },
		birth: { type: Date, required: true },
		floor: { type: Number, required: true },
		section: { type: String, required: true },
		blood: { type: String, required: true },
		joined: { type: Date, required: true }
	},
	{ versionKey: false }
)

const User = model('User', userSchema)
export default User
