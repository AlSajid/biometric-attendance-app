import User from '@/db/models/user'
import { getData } from '@/db/operations/getData'
import { insertData } from '@/db/operations/insertData'
import connectDevices from '@/utils/connectDevices'
import { NextResponse } from 'next/server'

export async function GET() {
	return await getData(User)
}

export async function POST(request: Request) {
	try {
		const data = await request.json()

		const { zkInstance } = await connectDevices([data.ip])
		if (!zkInstance) return NextResponse.json({ error: 'The device is not connected' }, { status: 500 })

		const insert = await zkInstance.setUser(data.name, '', data.id, data.id)
		await zkInstance.disconnect()
		if (insert !== true) return NextResponse.json({ error: 'Could not create a new user on the device' }, { status: 500 })

		return insertData(User, data, 'A new employee is added successfully')
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Could not communicate with the device' }, { status: 500 })
	}
}

export async function DELETE(request: Request) {
	console.log('delete')
	try {
		const data = await request.json()
		console.log(data)

		const { zkInstance } = await connectDevices([data.ip])
		if (!zkInstance) return NextResponse.json({ error: 'The device is not connected' }, { status: 500 })

		const remove = await zkInstance.deleteUser(data.id)
		await zkInstance.disconnect()
		if (remove !== true) return NextResponse.json({ error: 'Could not delete the user on the device' }, { status: 500 })

		return NextResponse.json({ message: 'The user has been deleted successfully' })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Could not communicate with the device' }, { status: 500 })
	}
}
