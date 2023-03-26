import React, { useMemo } from "react";
import { serialize } from "v8";
import {
  PURCHASE_STATUS,
  REFUND_STATUS,
  REVERSAL_STATUS,
  RECONCILIATION_STATUS,
  RemotePurchaseResponse,
} from "@nearpaydev/nearpay-web-sdk";
import useLocalStorage from "./useLocalStorage";

/**
 * manage transactions on the localstorage
 */
export default function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<
    RemotePurchaseResponse[]
  >("transactions", []);

  function addTransaction(transaction: RemotePurchaseResponse | undefined) {
    if (
      transaction !== undefined &&
      transaction.payload.status === PURCHASE_STATUS.APPROVED
    ) {
      setTransactions((old) => [transaction, ...old]);
    }
  }

  function deleteTransaction(transaction: RemotePurchaseResponse | undefined) {
    if (transaction === undefined) return;
    const json = transaction;
    setTransactions((old) =>
      old.filter((jsonTrans) => jsonTrans.jobId === json.jobId)
    );
  }

  return { transactions, addTransaction, deleteTransaction };
}
