import { Transaction } from "plaid";
import { OauthTransaction } from "../../types/shared";

export const transaction = ({ transaction }: { transaction: Transaction }): OauthTransaction => ({
  id: transaction.pending_transaction_id || transaction.transaction_id,
  name: transaction.name,
  account_id: transaction.account_id,
  amount: -transaction.amount,
  currency: transaction.iso_currency_code || transaction.unofficial_currency_code,
  authorized_date: transaction.authorized_date,
  date: transaction.date,
  pending: transaction.pending,
  merchant_name: transaction.merchant_name,
  check_number: transaction.check_number,
  payment_channel: transaction.payment_channel,
  tags: transaction.category?.join(', '),
  sub_account: transaction.account_owner
})