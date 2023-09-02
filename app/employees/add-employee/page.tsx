'use client'

import Board from '@/components/Board'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import getDevices from '@/utils/getDevices'
import postReqHandler from '@/utils/requestHandlers/postReqHandler'
import resetForm from '@/utils/resetForm'
import validateForm from '@/utils/validateForm'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

function calculateAge(date: string) {
	if (date === '') return 0

	const age: number = Math.floor((new Date().getTime() - new Date(date).getTime()) / 31557600000)
	return age
}

export default function AddUser() {
	const [loading, setLoading] = useState(false)
	const [ips, setIps] = useState<string[]>([])

	// form data
	const ipRef = useRef<HTMLSelectElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const idRef = useRef<HTMLInputElement>(null)
	const designationRef = useRef<HTMLInputElement>(null)
	const departmentRef = useRef<HTMLInputElement>(null)
	const birthRef = useRef<HTMLInputElement>(null)
	const floorRef = useRef<HTMLInputElement>(null)
	const sectionRef = useRef<HTMLInputElement>(null)
	const bloodRef = useRef<HTMLSelectElement>(null)
	const joinedRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const devices = getDevices()
		setIps(devices.map((device: { ip: string }) => device.ip))
	}, [])

	const addUserHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (ips.length === 0) return toast.error('Please add a device first')
		const refs = [
			{ input: nameRef, label: 'Name' },
			{ input: idRef, label: 'ID' },
			{ input: designationRef, label: 'Designation' },
			{ input: departmentRef, label: 'Department' },
			{ input: sectionRef, label: 'Section' },
			{ input: floorRef, label: 'Floor' },
			{ input: bloodRef, label: 'Blood Group' },
			{ input: birthRef, label: 'Birthday' },
			{ input: joinedRef, label: 'Joined' }
		]

		if (validateForm(refs)) return

		const birthday: string = birthRef?.current?.value || ''
		const joined: string = joinedRef?.current?.value || ''

		if (calculateAge(birthday) < 18) {
			toast.error('User age must be 18+')
			return
		}

		if (calculateAge(birthday) < calculateAge(joined) + 18) {
			toast.error('Invalid Joining Date')
			return
		}

		setLoading(true)
		const response: number = await postReqHandler('users', {
			ip: ipRef?.current?.value,
			name: nameRef?.current?.value,
			id: idRef?.current?.value,
			designation: designationRef?.current?.value,
			department: departmentRef?.current?.value,
			birth: birthRef?.current?.value,
			floor: floorRef?.current?.value,
			section: sectionRef?.current?.value,
			blood: bloodRef?.current?.value,
			joined: joinedRef?.current?.value
		})
		setLoading(false)

		if (response === 200) {
			resetForm([nameRef, idRef, designationRef, departmentRef, birthRef, floorRef, sectionRef, bloodRef, joinedRef])
		}
	}

	return (
		<Board title='Add Employee'>
			<form className='flex flex-col p-7' onSubmit={addUserHandler}>
				<div className='grid grid-cols-3 gap-7 my-1 '>
					<div className='my-1 flex flex-col'>
						<label>Device</label>
						<select ref={ipRef}>
							{ips.map((ip, index) => (
								<option key={index} value={ip}>
									{ip}
								</option>
							))}
						</select>
					</div>

					<Input label='Name' type='text' inputRef={nameRef} />
					<Input label='ID' type='text' inputRef={idRef} maxLength={7} />
				</div>

				<div className='my-1 grid grid-cols-3 gap-7'>
					<Input label='Designation' type='text' inputRef={designationRef} />
					<Input label='Department' type='text' inputRef={departmentRef} />
					<Input label='Section' type='text' inputRef={sectionRef} />
				</div>

				<div className='my-1 grid grid-cols-4 gap-7'>
					<Input label='Floor' type='number' inputRef={floorRef} min={0} />

					<div className='my-1 flex flex-col'>
						<label>Blood Group</label>
						<select ref={bloodRef}>
							<option></option>
							{bloodGroups.map((group, index) => (
								<option key={index} value={group}>
									{group}
								</option>
							))}
						</select>
					</div>

					<Input label='Birthday' type='date' inputRef={birthRef} />
					<Input label='Joined' type='date' inputRef={joinedRef} />
				</div>

				<div className='flex items-center justify-center my-7'>{loading ? <Loader msg='Sending' /> : <button>Add Employee</button>}</div>
			</form>
		</Board>
	)
}
