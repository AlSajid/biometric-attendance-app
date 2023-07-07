"use client";
import Board from "@/components/Board";
import Loader from "@/components/Loader";
import getReqHandler from "@/utils/requestHandlers/getReqHandler";
import postReqHandler from "@/utils/requestHandlers/postReqHandler";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Hours() {
  const [loading, setLoading] = useState(false);

  const [start, setStart] = useState("");
  const [late, setLate] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    async function fetchData() {
      const hours = await getReqHandler("hours");
      setStart(hours[0].start);
      setLate(hours[0].late);
      setEnd(hours[0].end);
    }

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (start === "" || end === "" || late === "") {
      toast.error("Please fill up all the fields");
      return;
    }

    setLoading(true);
    const update = await postReqHandler("hours", { start, late, end });
    setLoading(false);
    console.log(update);

    // toast.promise(update, {
    //   loading: "Updating...",
    //   success: (response) => {
    //     if (response === "success") {
    //       return "Office hour has been updated!";
    //     } else throw new Error();
    //   },
    //   error: "Something went wrong!",
    // });
  };

  return (
    <Board title="Office Hours">
      <Head>
        <title>Office Hours</title>
      </Head>

      <div className="m-3 flex justify-center items-center">
        <form className="flex flex-col my-3">
          <div className="my-1 flex flex-col">
            <label>in</label>
            <input type="time" className="w-96" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>

          <div className="my-3 flex flex-col">
            <label>break</label>
            <input type="time" className="w-96" value={late} onChange={(e) => setLate(e.target.value)} />
          </div>

          <div className="my-3 flex flex-col">
            <label>out</label>
            <input type="time" className="w-96" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>

          <div className="flex justify-center items-center my-7">
            {loading ? (
              <Loader msg="Updating" />
            ) : (
              <button onClick={handleSubmit} className="btn w-1/3">
                Set Time
              </button>
            )}
          </div>
        </form>
      </div>
    </Board>
  );
}
