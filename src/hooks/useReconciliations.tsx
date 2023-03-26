import React, { useMemo } from "react";
import {
  RECONCILIATION_STATUS,
  RemoteReconciliationResponse,
} from "@nearpaydev/nearpay-web-sdk";
import useLocalStorage from "./useLocalStorage";

/**
 * manage the reconciliations on the localstorage
 */
export default function useReconciliations() {
  const [reconciliations, setReconciliations] = useLocalStorage<
    RemoteReconciliationResponse[]
  >("reconciliations", []);

  function addReconciliation(
    reconciliation: RemoteReconciliationResponse | undefined
  ) {
    if (reconciliation !== undefined && RECONCILIATION_STATUS.BALANCED) {
      setReconciliations((old) => [reconciliation, ...old]);
    }
  }

  function deleteReconciliation(
    reconciliation: RemoteReconciliationResponse | undefined
  ) {
    if (reconciliation === undefined) return;
    setReconciliations((old) =>
      old.filter((jsonTrans) => jsonTrans.jobId === reconciliation.jobId)
    );
  }

  return { reconciliations, addReconciliation, deleteReconciliation };
}
