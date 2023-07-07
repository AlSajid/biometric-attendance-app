"use client";
import Board from "@/components/Board";
import postReqHandler from "@/utils/requestHandlers/postReqHandler";
import resetForm from "@/utils/resetForm";
import validateForm from "@/utils/validateForm";
import { useEffect, useRef, useState } from "react";

export default async function Departments() {
  const [departments, setDepartments] = useState([]);
  const departmentRef: any = useRef(null);

  function getDepartments() {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getDepartments();
  }, []);

  async function handleAddDepartment(e: any) {
    e.preventDefault();

    if (validateForm([{ input: departmentRef, label: "Department Name" }])) return;

    const data = { name: departmentRef.current.value };
    const response = await postReqHandler("departments", data);

    if (response === 200) {
      getDepartments();
      resetForm([departmentRef]);
    }
  }

  const handleDelete = (id: number) => {};

  return (
    <Board title="Manage Departments">
      <form className="grid grid-cols-3 gap-7 p-7 bg-red-500">
        <div className="flex flex-col ">
          <label>Department Name</label>
          <input type="text" />
        </div>

        <div className="flex items-end">
          <button>Add</button>
        </div>
      </form>

      <hr />

      {departments && (
        <table className="my-3">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.name} Leave</td>
                <td>Delete</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      )}
    </Board>
  );
}
