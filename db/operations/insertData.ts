import connect from '@/db/connect'
import errorHandler from '@/utils/errorHandler'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function insertData(model: any, data: any, successMsg: string) {
	try {
		const connection = await connect()

		if (connection) {
			await model.create(data)
			mongoose.connection.close()
			return NextResponse.json({ success: successMsg })
		}

		return NextResponse.json({ error: 'Could not connect to the database' })
	} catch (error) {
		return NextResponse.json({ error: errorHandler(error) }, { status: 500 })
	}
}
