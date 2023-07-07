"use client";
import Board from "@/components/Board";
import formatDateTime from "@/utils/formatDateTime";
import { useState } from "react";
import Report from "@/components/Report";

export default function AttendanceReport() {
  const [info, setInfo] = useState([]);
  return (
    <Board title={"Attendance Report"} actions={<Report setInfo={setInfo} />}>
      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          {info?.map((data: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.department}</td>
              <td>{data.designation}</td>
              <td>{formatDateTime(data.in, "time")}</td>
              <td>{formatDateTime(data.out, "time")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Board>
  );
}
