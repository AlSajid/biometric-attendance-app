import Hours from '@/db/models/hours'
import { getData } from '@/db/operations/getData'
import errorHandler from '@/utils/errorHandler'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { userID, filter }: any = request
	const { start, end } = filter
	console.log(userID, filter)

	const startDate = new Date(`${start}T00:00:00.000+06:00`)
	const endDate = new Date(`${end}T00:00:00.000+06:00`)

	try {
		const hours = await getData(Hours)
		const attendance = await Hours.find({
			deviceUserId: userID,
			recordTime: { $gte: startDate, $lte: endDate }
		})

		return NextResponse.json({ attendance, hours })
	} catch (error) {
		errorHandler(error)
	}
}
