import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { RemoteReconciliationResponse } from "@nearpaydev/nearpay-web-sdk";
import { useNearpay } from "../context/NearpayContext";

export default function Reconsiliations() {
  const { reconciliations } = useNearpay();
  return (
    <div>
      <h3>Reconsiliations</h3>
      <div>
        {reconciliations.map((rec, idx) => (
          <ReconciliationSlot key={idx} reconciliation={rec} />
        ))}
      </div>
    </div>
  );
}

type recProps = {
  reconciliation: RemoteReconciliationResponse;
};

function ReconciliationSlot({ reconciliation }: recProps) {
  const { nearpay, deleteTransaction } = useNearpay();

  // const reverseMutaion = useMutation("reverse", reverse);
  // const refundMutaion = useMutation("reverse", refund);

  // async function reverse() {
  //   await nearpay.getTerminal().reversal(transaction_uuid);
  // }

  // async function refund() {
  //   await nearpay
  //     .getTerminal()
  //     .refund(amount, transaction_uuid, "", true)
  //     .then(
  //       (tr) => tr !== undefined && tr.isApproved() && deleteTransaction(tr)
  //     );
  // }

  return (
    <Container className="border border-dark rounded-1 p-3">
      <Row className="align-items-between">
        <Col xs={4}>
          <div>{reconciliation.jobId}</div>
        </Col>
        <Col className="text-end" xs={8}>
          <div>Reconciliation</div>
        </Col>
      </Row>
      <div className="justify-content-between" style={{}}></div>
    </Container>
  );
}
