import React, { useContext, useEffect, useState } from "react";
import {
  CONNECTION_STATE,
  NearPay,
  RemotePurchaseResponse,
  RemoteReconciliationResponse,
} from "@nearpaydev/nearpay-web-sdk";
import useReconciliations from "../hooks/useReconciliations";
import useTransactions from "../hooks/useTransactions";

type props = {
  nearpay: NearPay;
  connectionState: CONNECTION_STATE;
  transactions: RemotePurchaseResponse[];
  err: string | undefined;
  reconciliations: RemoteReconciliationResponse[];
  isPause: boolean;
  isBusy: boolean;
  addTransaction: (transaction: RemotePurchaseResponse | undefined) => void;
  deleteTransaction: (transaction: RemotePurchaseResponse | undefined) => void;
  addReconciliation: (
    reconciliation: RemoteReconciliationResponse | undefined
  ) => void;
  deleteReconciliation: (
    reconciliation: RemoteReconciliationResponse | undefined
  ) => void;
  setErr: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ctx = React.createContext({} as props);

/**
 * use it to access the provider values anywhere
 */
export function useNearpay() {
  return useContext(ctx);
}

/**
 * provider for nearpay object and outher useful util values and functions
 */
export default function NearpayProvider({
  children,
  nearpay,
}: {
  children: any;
  nearpay: NearPay;
}) {
  // saves the nearpay connection state, managed by the nearpay connectivity listener
  const [connectionState, setConnectionState] = useState<CONNECTION_STATE>(
    CONNECTION_STATE.LOGGED_OUT
  );
  const [err, setErr] = useState<string | undefined>(undefined);

  // saves the POS pause state, managed by the nearpay puase listener
  const [isPause, setIsPause] = useState(false);

  // saves the POS busy state, managed by the nearpay busy listener
  const [isBusy, setIsBusy] = useState(false);

  // transaction and reconciliation hooks
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const { reconciliations, addReconciliation, deleteReconciliation } =
    useReconciliations();

  // listen to connection change
  useEffect(() => {
    const remover = nearpay.addConnectivityListener(setConnectionState);
    return () => {
      remover();
    };
  });

  // busy listener
  useEffect(() => {
    const remover = nearpay.addBusyListener(setIsBusy);
    return () => remover();
  }, []);

  // pause listener
  useEffect(() => {
    const remover = nearpay.addPauseListener(setIsPause);
    return () => remover();
  }, []);

  const values: props = {
    nearpay,
    connectionState,
    transactions,
    reconciliations,
    err,
    isBusy,
    isPause,

    setErr,
    addTransaction,
    deleteTransaction,
    deleteReconciliation,
    addReconciliation,
  };
  return <ctx.Provider value={values}>{children}</ctx.Provider>;
}
