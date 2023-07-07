import {toast} from "react-hot-toast";

export default function delReqHandler() {
	toast((t) => (
		<div className="flex flex-col">
			<h6>Are you sure you want to delete it?</h6>

			<div className="flex justify-around">
				<button className="w-64 h-64 bg-red-700" onClick={() => toast.dismiss(t.id)}>
					Delete
				</button>
				<button className=" bg-red-700" onClick={() => toast.dismiss(t.id)}>
					Dismiss
				</button>
			</div>
		</div>
	));
}
