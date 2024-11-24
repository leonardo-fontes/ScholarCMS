export type Pay = {
  amount: number;
  receiver_id: number | string;
  idempotency_key: string
}
