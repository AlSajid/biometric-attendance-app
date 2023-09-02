'use client'
import Board from '@/components/Board'
import Loader from '@/components/Loader'
import formatDateTime from '@/utils/formatDateTime'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Home() {
	const [attendance, setAttendance] = useState([])
	const [loading, setLoading] = useState(false)

	const backupAttendance = (data: any) => {
		const attendance: string[] = JSON.parse(localStorage.getItem('attendance') || '')
		attendance.push(...data)
		localStorage.setItem('attendance', JSON.stringify(attendance))
		console.log(attendance)

		fetch('/api/backupAttendance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(attendance)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Attendance backed up')
					localStorage.setItem('attendance', '')
				}
			})
			.catch(err => console.log(err))
	}

	const fetchAttendance = () => {
		setLoading(true)
		setAttendance([])

		const ipAddress = localStorage.getItem('ipAddress') ?? '[]'
		const ips = JSON.parse(ipAddress).map((obj: { ip: string }) => obj.ip)

		fetch('/api/getAttendance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ips)
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					toast.error(data.error)
					return
				}

				if (data.length > 0) {
					backupAttendance(data)
				}

				if (data.length === 0) {
					toast.success('No new attendance')
				}

				setAttendance(data)
			})
			.catch(err => console.log('error:' + err))
			.finally(() => setLoading(false))
	}

	return (
		<Board title={'Backup Data'} actions={<>{loading ? <Loader msg='Pulling data' /> : <button onClick={fetchAttendance}>Pull & Backup</button>}</>}>
			<div className='flex flex-col items-center justify-center mx-auto'>
				{attendance.length > 0 && (
					<table>
						<thead>
							<th>ID</th>
							<th>IP</th>
							<th>Time</th>
						</thead>

						{attendance.map((item: { _id: string; deviceUserId: string; ip: string; recordTime: Date }) => (
							<tr key={item._id}>
								<td>{item.deviceUserId}</td>
								<td>{item.ip}</td>
								<td>{formatDateTime(item.recordTime, 'time')}</td>
							</tr>
						))}
					</table>
				)}
			</div>
		</Board>
	)
}
