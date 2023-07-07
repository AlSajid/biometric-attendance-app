export default async function getLeaves(model:any) {
	const data = await model.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "id",
				foreignField: "id",
				as: "user"
			}
		},
		{$unwind: "$user"},
		{
			$project: {
				"user.name": 1,
				"user.designation": 1,
				"user.department": 1,
				"start": 1,
				"end": 1,
				"id": 1
			}
		}
	]);

	return data;
}
