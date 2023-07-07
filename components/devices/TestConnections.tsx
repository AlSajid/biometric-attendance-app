import postReqHandler from "@/utils/requestHandlers/postReqHandler";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import { useState } from "react";
import { Devices } from "@/app/devices/connections/page";

export default function TestConnections({ devices, setConnectedDevices }: { devices: Devices[]; setConnectedDevices: Function }) {
  const [loading, setLoading] = useState(false);

  const handleCheckConnection = async () => {
    if (devices.length === 0) {
      toast.error("Add a Device IP Address First");
      return;
    }

    setConnectedDevices([]);
    setLoading(true);
    const IPAddresses = devices.map((device: { ip: string }) => device.ip);
    const connectedDevices: string[] = await postReqHandler("devices", IPAddresses);
    setLoading(false);

    if (connectedDevices.length === 0) {
      toast.error("No connected devices found");
      return;
    } else if (connectedDevices.length > 0) {
      setConnectedDevices(connectedDevices);
      toast.success(connectedDevices.length + (connectedDevices.length > 1 ? " devices are" : " device is") + " connected");
    }
  };

  return <>{loading ? <Loader msg={"Connecting"} /> : <button onClick={handleCheckConnection}>Test Connections</button>}</>;
}
