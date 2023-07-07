"use client";
import Board from "@/components/Board";
import Input from "@/components/Input";
import delReqHandler from "@/utils/requestHandlers/delReqHandler";
import postReqHandler from "@/utils/requestHandlers/postReqHandler";
import resetForm from "@/utils/resetForm";
import validateForm from "@/utils/validateForm";

import { useEffect } from "react";
import { useRef, useState } from "react";

export default function LeaveType() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const leaveTypeRef: any = useRef();
  const leaveDaysRef: any = useRef();

  const loadLeaveTypes = async () => {
    fetch("http://localhost:7000/api/leave-types")
      .then((res) => res.json())
      .then((data) => setLeaveTypes(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLeaveTypes();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      validateForm([
        { input: leaveTypeRef, label: "Leave type" },
        { input: leaveDaysRef, label: "Maximum leave days" },
      ])
    )
      return;

    const data = {
      type: leaveTypeRef.current.value,
      count: leaveDaysRef.current.value,
    };

    const response = await postReqHandler("leave-types", data);
    if (response === 200) {
      loadLeaveTypes();
      resetForm([leaveTypeRef, leaveDaysRef]);
    }
  };

  const handleDelete = (id: number) => {
    delReqHandler();
  };

  return (
    <Board title={"Leave Types"}>
      <form className="grid grid-cols-3 gap-7 p-7">
        <Input label="Leave Type" type="text" inputRef={leaveTypeRef} />
        <Input label="Maximum Leave days" type="number" min={1} max={100} inputRef={leaveDaysRef} />
        <div className="flex items-end">
          <button onClick={handleSubmit}>Add</button>
        </div>
      </form>

      {leaveTypes.length > 0 && (
        <table className="my-3">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Leave Count</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {leaveTypes.map((leave: any) => (
              <tr key={leave._id}>
                <td>{leave.type}</td>
                <td>{leave.count}</td>
                <td
                  onClick={() => {
                    handleDelete(leave._id);
                  }}
                  className="hover:bg-red-700 hover:text-white cursor-pointer">
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Board>
  );
}
