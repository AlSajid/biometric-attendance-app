"use client";
import Board from "@/components/Board";
import formatDateTime from "@/utils/formatDateTime";

// export const getServerSideProps = async () => {
// 	const res = await fetch("http://localhost:7000/api/leave");
// 	const leaves = await res.json();
// 	return {props: {leaves}};
// };

export default function ManageLeave() {
  const leaves: any = [];
  return (
    <Board title="Manage Leave">
      <div className="rounded text-white mx-auto">
        {leaves?.length === 0 ? (
          <div className="text-center text-2xl font-semibold my-10 text-gray-500">No Information Found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th colSpan={3}>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>

            <tbody>
              {leaves?.map((leave:any, index:number) => (
                <tr key={index}>
                  <td style={{ justifyContent: "start" }}>{leave.id}</td>
                  <td colSpan={3}>{leave.user.name}</td>
                  <td>{leave.user.designation}</td>
                  <td>{leave.user.department}</td>
                  <td>{formatDateTime(leave?.start, "date")}</td>
                  <td>{formatDateTime(leave?.end, "date")}</td>

                  {/* <div className="col-span-1 flex justify-around">
                    <Link
                      href={`/users/${user.id}`}
                      className=" table-content w-1/2"
                    >
                      <RxOpenInNewWindow />
                    </Link>

                    <div
                      className="bg-red-500  table-content cursor-pointer font-black
                                                        hover:bg-red-600 transition-all duration-300 ease-in-out w-1/2"
                      onClick={() => handleDelete(user.id)}
                      style={{ backgroundColor: "red" }}
                    >
                      {" "}
                      -
                    </div>
                  </div> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Board>
  );
}
