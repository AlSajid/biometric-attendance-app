'use client'
import Board from '@/components/Board'
import Clock from 'react-live-clock'
import { useState } from 'react'
import formatDateTime from '@/utils/formatDateTime'

export default function Home() {
	const [date, setDate] = useState(new Date())

	return (
		<Board title='Home'>
			<div className='flex gap-10 m-10 flex-col items-center justify-center'>
				<Clock
					noSsr={true}
					className='text-7xl text-teal-950 font-bol font-mono'
					format={'hh:mm:ss'}
					timezone={'Asia/Dhaka'}
					ticking={true}
				/>
				<span className='text-3xl text-teal-950 font-thin font-mono'>
					{formatDateTime(date, 'date')}
				</span>
			</div>
		</Board>
	)
}
