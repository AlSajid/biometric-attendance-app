"use client";
import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// export const getServerSideProps = async () => {
// 	const res = await fetch("http://localhost:7000/api/leave");
// 	const leaveTypes = await res.json();
// 	return {props: {leaveTypes}};
// };

export default function Leave({ leaveTypes }: any) {
  const [loading, setLoading] = useState(false);
  const [forAll, setForAll] = useState(false);
  const idRef: any = useRef(null);
  const startDateRef: any = useRef(null);
  const endDateRef: any = useRef(null);
  const leaveTypeRef: any = useRef(null);

  useEffect(() => {
    if (forAll) {
      idRef.current.value = "";
    }
  }, [forAll]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (startDateRef.current.value === "" || endDateRef.current.value === "" || leaveTypeRef.current.value === "") {
      toast.error("Please fill up all the fields");
      return;
    }

    fetch("http://localhost:7000/api/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: forAll ? "All" : idRef.current.value,
        start: startDateRef.current.value,
        end: endDateRef.current.value,
        leaveType: leaveTypeRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          idRef.current.value = "";
          startDateRef.current.value = "";
          endDateRef.current.value = "";
          leaveTypeRef.current.value = "";
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  console.log(leaveTypes);
  return (
    <Board title={"Apply Leave"}>
      <form className="flex flex-col my-3 w-11/12 mx-auto">
        <div className="my-3 flex flex-col w-1/3 mx-auto">
          <div className="my-3 flex flex-col">
            <label>User ID</label>
            <input type="text" className="disabled:bg-slate-300 text-center" ref={idRef} disabled={forAll} />
          </div>

          <div className="my-3 flex">
            <div className="flex flex-col justify-between">
              <label>Start Date</label>
              <input type="date" className="" ref={startDateRef} />
            </div>
            <div>
              <label className="flex flex-col">End Date</label>
              <input type="date" className="" ref={endDateRef} />
            </div>
          </div>

          <div className="my-3 flex flex-col">
            <label>Leave Type</label>

            <select ref={leaveTypeRef}>
              {leaveTypes?.map((leave: { type: string }, index: number) => (
                <option key={index} value={leave.type}>
                  {leave.type} Leave
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center my-7">
          {loading ? <Loader msg="Updating" /> : <button onClick={handleSubmit}>Register Leave</button>}
        </div>
      </form>
    </Board>
  );
}
