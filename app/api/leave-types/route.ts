import LeaveType from '@/db/models/leaveTypes'
import { getData } from '@/db/operations/getData'

// export async function POST() {
// 	const result = await LeaveType.create({ ...req.body })
// 	res.status(200).json({ message: 'Leave Type Added Successfully' })
// }

export async function GET() {
	return await getData(LeaveType)
}
