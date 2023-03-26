import React, { useMemo } from "react";
import { Button, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CONNECTION_STATE } from "@nearpaydev/nearpay-web-sdk";
import { useNearpay } from "../context/NearpayContext";

type IPayForm = {
  amount: number;
};

export default function PayForm() {
  const {
    nearpay,
    connectionState,
    addTransaction,
    addReconciliation,
    setErr,
  } = useNearpay();
  // const x = Profile;
  const { register, handleSubmit } = useForm<IPayForm>();
  const payMutation = useMutation("payment", pay);
  const reconcileMutation = useMutation("reconcile", reconcile);
  const disabled = useMemo(
    () => connectionState !== CONNECTION_STATE.CONNECTED,
    [connectionState]
  );

  async function onSubmit(data: IPayForm) {
    await payMutation.mutateAsync(data);
  }

  async function pay(data: IPayForm) {
    await nearpay
      .getTerminal()
      .purchase({ amount: data.amount })
      .then((transaction) => transaction && addTransaction(transaction))
      .catch(setErr);
  }

  async function reconcile() {
    await nearpay
      .getTerminal()
      .reconcile({})
      .then((rec) => rec !== undefined && addReconciliation(rec))
      .catch(setErr);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Pay</h3>
      <Stack gap={2} direction="horizontal">
        <input
          type="number"
          {...register("amount", { required: true, disabled: disabled })}
        />
        <Button type="submit" variant="dark">
          Pay {payMutation.isLoading && "(Loading ...)"}
        </Button>
        <Button
          type="button"
          onClick={async () => await reconcileMutation.mutateAsync()}
          variant="outline-dark"
        >
          Reconcile {reconcileMutation.isLoading && "(Loading ...)"}
        </Button>
      </Stack>
    </form>
  );
}
