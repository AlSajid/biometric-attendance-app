import { FormEvent, useRef } from "react";
import { toast } from "react-hot-toast";
import Input from "@/components/Input";
import { Devices } from "@/app/devices/connections/page";
import validateForm from "@/utils/validateForm";
import resetForm from "@/utils/resetForm";

const validateIpAddress = (ipAddress: string | undefined) => {
  if (!ipAddress) return false;

  const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return regex.test(ipAddress);
};

export default function AddIP({
  IP,
  devices,
  setDevices,
  setConnectedDevices,
}: {
  IP: string | undefined;
  devices: Devices[];
  setDevices: Function;
  setConnectedDevices: any;
}) {
  const ipRef = useRef<HTMLInputElement>(null);
  const infoRef = useRef<HTMLInputElement>(null);

  const handleAddDevice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validateForm([
        { input: ipRef, label: "Device IP" },
        { input: infoRef, label: "Device Info" },
      ])
    )
      return;

    if (!validateIpAddress(ipRef?.current?.value)) {
      toast.error("Invalid IP address");
      return;
    }

    const duplicateIP = devices.filter((device: { ip: string }) => device.ip === ipRef?.current?.value);
    if (duplicateIP.length > 0) {
      toast.error("This IP address already exists");
      return;
    }

    const updatedDevices = [...devices, { ip: ipRef?.current?.value, tag: infoRef?.current?.value }];
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setDevices(updatedDevices);
    setConnectedDevices([]);

    resetForm([ipRef, infoRef]);
    ipRef?.current?.focus();
    toast.success("A new device is added successfully");
  };

  return (
    <form onSubmit={handleAddDevice} className="col-span-3 mb-7 grid grid-cols-12 gap-3">
      <div className="col-span-3">
        <Input label="Device IP" inputRef={ipRef} placeholder={IP} autoComplete="off" />
      </div>

      <div className="col-span-7">
        <Input label="Device Information" inputRef={infoRef} placeholder="Device Info" autoComplete="off" />
      </div>

      <div className="col-span-2 self-end text-center">
        <button>Add Device</button>
      </div>
    </form>
  );
}
