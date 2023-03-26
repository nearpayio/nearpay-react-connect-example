import React, { useState } from "react";
import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider";
import { useForm } from "react-hook-form";
import { NEARPAY_CONNECTOR } from "@nearpaydev/nearpay-web-sdk";
import { useNearpay } from "../context/NearpayContext";

type connectForm = {
  ip: string;
  port: string;
};

export default function ConnectForm() {
  const { register, handleSubmit } = useForm<connectForm>();
  const { nearpay, connectionState, err, setErr, isPause, isBusy } =
    useNearpay();

  async function onSubmit({ ip, port }: connectForm) {
    await nearpay
      .connect({ type: NEARPAY_CONNECTOR.WS, ip, port })
      .then(() => setErr(undefined))
      .catch(setErr);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="connect-form">
      <h3>Connect</h3>
      <input
        type="text"
        {...register("ip", { required: true })}
        placeholder={"Ip"}
      />
      <input
        type="text"
        {...register("port", { required: true })}
        placeholder={"Port"}
      />
      <div>
        Errors: <span style={{ color: "red" }}>{err}</span>
      </div>

      <div>ConnectionState: {connectionState}</div>
      <div>is Busy: {JSON.stringify(isBusy)}</div>
      <div>is Paused: {JSON.stringify(isPause)}</div>

      <button type="submit">connect</button>
      <button onClick={() => nearpay.disconnectDevice()} type="button">
        disconnect
      </button>
    </form>
  );
}
