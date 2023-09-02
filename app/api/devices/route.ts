import connectDevices from '@/utils/connectDevices'
import errorHandler from '@/utils/errorHandler'
import { NextResponse } from 'next/server'
import os from 'os'

export async function POST(request: Request) {
	try {
		const ips = await request.json()
		const { connectedDevices } = await connectDevices(ips)
		return NextResponse.json(connectedDevices)
	} catch (error) {
		return NextResponse.json({ error: errorHandler(error) }, { status: 500 })
	}
}

export async function GET() {
	const networkInterfaces = os.networkInterfaces()
	const defaultGateway = Object.values(networkInterfaces)
		.flatMap((interfaces: any) => interfaces.filter((networkInterface: { internal: boolean; family: string }) => !networkInterface.internal && networkInterface.family === 'IPv4'))
		.map(networkInterface => networkInterface.address)[0]

	return NextResponse.json({ default: defaultGateway })
}
