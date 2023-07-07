"use client";
import Board from "@/components/Board";
import AddIP from "@/components/devices/AddIP";
import FindDevices from "@/components/devices/FindDevices";
import TestConnections from "@/components/devices/TestConnections";
import getDevices from "@/utils/getDevices";
import getReqHandler from "@/utils/requestHandlers/getReqHandler";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export interface Devices {
  ip: string;
  tag: string;
}

export default function Connections() {
  const [devices, setDevices] = useState<Devices[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [gateway, setGateway] = useState<{ default: string }>();

  useEffect(() => {
    const devices = getDevices();
    if (devices.length > 0) setDevices(devices);

    async function checkNetwork() {
      const gateway = await getReqHandler("devices");
      gateway?.default && setGateway(gateway);
    }

    checkNetwork();
  }, []);

  return (
    <Board
      title="Device Connections"
      actions={
        gateway?.default && (
          <>
            <FindDevices defaultIP={gateway.default} devices={devices} setDevices={setDevices} setConnectedDevices={setConnectedDevices} />
            <TestConnections devices={devices} setConnectedDevices={setConnectedDevices} />
          </>
        )
      }>
      <div className="flex flex-col m-3">
        <AddIP IP={gateway?.default} devices={devices} setDevices={setDevices} setConnectedDevices={setConnectedDevices} />

        {devices?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>IP Address</th>
                <th>Device Info</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {devices.map((device, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className={(connectedDevices.includes(device.ip) && "text-bold bg-green-100") + " cursor-pointer"}>
                    {device.ip}
                    {connectedDevices.includes(device.ip) && <span className="ml-3 animate-pulse">(Connected)</span>}
                  </td>

                  <td>{device.tag}</td>

                  <td
                    className="hover:bg-red-700 hover:text-white cursor-pointer smooth-transition"
                    onClick={() => {
                      const updateDevices = devices.filter((_ip, i) => i !== index);
                      setDevices(updateDevices);
                      localStorage.setItem("devices", JSON.stringify(updateDevices));
                      toast.success(device.ip + ` has been disconnected`);
                    }}>
                    Remove
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Board>
  );
}
