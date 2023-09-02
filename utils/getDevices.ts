import { toast } from 'react-hot-toast'

export default function getDevices() {
	const stringifiedDevices: string | null = localStorage.getItem('devices')

	if (stringifiedDevices) {
		try {
			const devices = JSON.parse(stringifiedDevices)
			return devices
		} catch (e) {
			console.error('localStorage devices is not a valid JSON string')
			toast.error('Failed to load devices')
		}
	}

	return []
}
