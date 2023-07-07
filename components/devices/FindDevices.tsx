import postReqHandler from "@/utils/requestHandlers/postReqHandler";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { Devices } from "@/app/devices/connections/page";

function getIPAddresses(ipAddress: string) {
  const ipRange: string[] = [];
  const networkPrefix = ipAddress.split(".").slice(0, 3).join(".");

  for (let i = 0; i < 255; i++) {
    ipRange.push(networkPrefix + "." + i);
  }

  return ipRange;
}

export default function FindDevices({
  defaultIP,
  devices,
  setDevices,
  setConnectedDevices,
}: {
  defaultIP: string;
  devices: Devices[];
  setDevices: Function;
  setConnectedDevices: Function;
}) {
  const [loading, setLoading] = useState(false);

  const handleFindDevices = async () => {
    setLoading(true);
    const IPs = getIPAddresses(defaultIP);
    const connectedDevices: string[] = await postReqHandler("devices", IPs);
    setLoading(false);
    
    if (connectedDevices.length > 0) {
      const newIPAddresses = connectedDevices.filter((ip) => devices.every((device) => device.ip !== ip));

      if (newIPAddresses.length > 0) {
        newIPAddresses.map((newIPAddress: string) => {
          const newIpAddresses = [...devices, { ip: newIPAddress, tag: "New Device" }];
          localStorage.setItem("devices", JSON.stringify(newIpAddresses));
          setDevices(newIpAddresses);
        });

        toast.success(newIPAddresses.length + " new" + (newIPAddresses.length > 1 ? " devices" : " device") + " found");
      } else {
        toast.error("No new device found");
      }

      setConnectedDevices(connectedDevices);
    }
  };

  return <>{loading ? <Loader msg="Finding" /> : <button onClick={handleFindDevices}>Find Devices</button>}</>;
}
