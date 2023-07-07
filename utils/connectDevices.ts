import ZKLib from "@/node_zklib/zklib";

export default async function connectDevices(ips: string[]) {
  const connectedDevices: string[] = [];

  for (let index = 0; index < ips.length; index++) {
    const ip = ips[index];
    let timeout = 1000;
    if (ips.length > 1) timeout = 40;

    var zkInstance: any = new ZKLib(ip, 4370, timeout, 4000, 0);

    try {
      const start = performance.now();
      const connection = await zkInstance.createSocket();
      const end = performance.now();

      console.log("Time to communicate to", ip, ":", end - start, "ms");

      if (connection === true) {
        console.log("Connected to", ip);
        connectedDevices.push(ip);
      }
    } catch (e) {
      console.log("Could not connect to", ip + "'");
    }
  }

  return { connectedDevices, zkInstance };
}
