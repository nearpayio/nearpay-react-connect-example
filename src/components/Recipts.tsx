import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNearpay } from "../context/NearpayContext";
import useTransactions from "../hooks/useTransactions";
import { useMutation } from "react-query";
import { RemotePurchaseResponse } from "@nearpaydev/nearpay-web-sdk";

export default function Recipts() {
  const { transactions } = useNearpay();

  return (
    <div>
      <h3>Recipts</h3>
      <div>
        {transactions.map((trans, idx) => (
          <TransactionSlot key={idx} transaction={trans} />
        ))}
      </div>
    </div>
  );
}

type trProps = {
  transaction: RemotePurchaseResponse;
};

function TransactionSlot({ transaction }: trProps) {
  const { nearpay, deleteTransaction } = useNearpay();

  const reverseMutaion = useMutation("reverse", reverse);
  const refundMutaion = useMutation("reverse", refund);

  const amount = parseInt(
    String(transaction.payload.transactionReceipts![0].amount_authorized.value)
      .split(".")
      .join("")
  );
  const transaction_uuid =
    transaction.payload.transactionReceipts![0].transaction_uuid;
  const currency = transaction.payload.transactionReceipts![0].currency.english;

  async function reverse() {
    await nearpay
      .getTerminal()
      .reversal({ original_transaction_uuid: transaction_uuid });
  }

  async function refund() {
    await nearpay
      .getTerminal()
      .refund({ amount, original_transaction_uuid: transaction_uuid });
  }

  return (
    <Container className="border border-dark rounded-1 p-3">
      <Row className="align-items-between">
        <Col xs={4}>
          <div>{transaction_uuid}</div>
        </Col>
        <Col className="text-end" xs={8}>
          <div>
            {amount} {currency}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col xs={5}>
          <Button
            onClick={async () => await refundMutaion.mutateAsync()}
            variant="outline-dark"
            className="w-100"
          >
            Refund {refundMutaion.isLoading && "(Loading ...)"}
          </Button>
        </Col>
        <Col xs={5}>
          <Button
            onClick={async () => await reverseMutaion.mutateAsync()}
            variant="outline-dark"
            className="w-100"
          >
            Reverse {reverseMutaion.isLoading && "(Loading ...)"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
