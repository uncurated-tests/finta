import { OauthAccount, OauthHolding, OauthInstitution, OauthInvestmentTransaction, OauthTransaction } from "./types"

export const accounts = (account: OauthAccount) => ({
  accountId: account.id,
  name: account.name,
  institution: {
    institutionId: account.plaid_item_id,
    name: "Not Found" // If sync'ed, the real name will be shown instead
  },
  mask: account.mask,
  type: account.type,
  subtype: account.subtype,
  availableBalance: account.available_balance,
  currentBalance: account.current_balance,
  limit: account.limit,
  currency: account.currency,
  interestRate: account.interest_rate / 100,
  lastPaymentAmount: account.last_payment_amount,
  lastPaymentDate: account.last_payment_date,
  nextPaymentDueDate: account.next_payment_due_date,
  lastStatementBalance: account.last_statement_balance,
  minimumPaymentAmount: account.minimum_payment_amount,
  nextMonthlyPayment: account.next_monthly_payment,
  originationDate: account.origination_date,
  originationPrincipalAmount: account.origination_principal_amount
})

export const institutions = (institution: OauthInstitution) => ({
  institutionId: institution.id,
  name: institution.name,
  createdAt: institution.created_at,
  lastUpdate: institution.synced_at,
  error: institution.error
});

export const investmentHoldings = (holding: OauthHolding) => ({
  investmentHoldingId: holding.account_id + (holding.symbol || holding.security_name),
  name: holding.symbol || holding.security_name,
  costBasis: holding.cost_basis,
  currency: holding.currency,
  quantity: holding.quantity,
  closePrice: holding.close_price,
  symbol: holding.symbol,
  securityName: holding.security_name,
  securityType: holding.security_type,
  account: {
    accountId: holding.account_id,
    name: "Not Found"
  }
});

export const investmentTransactions = (investmentTransaction: OauthInvestmentTransaction) => ({
  investmentTransactionId: investmentTransaction.id,
  name: investmentTransaction.name,
  amount: investmentTransaction.amount,
  fees: investmentTransaction.fees,
  price: investmentTransaction.price,
  quantity: investmentTransaction.quantity,
  currency: investmentTransaction.currency,
  date: investmentTransaction.date,
  type: investmentTransaction.type,
  subtype: investmentTransaction.subtype,
  symbol: investmentTransaction.symbol,
  securityName: investmentTransaction.security_name,
  securityType: investmentTransaction.security_type,
  account: {
    accountId: investmentTransaction.account_id,
    name: "Not Found"
  }
})

export const transactions = (transaction: OauthTransaction) => ({
  transactionId: transaction.id,
  name: transaction.name,
  amount: transaction.amount,
  currency: transaction.currency,
  authorizedDate: transaction.authorized_date,
  date: transaction.date,
  isPending: transaction.pending,
  merchantName: transaction.merchant_name,
  checkNumber: transaction.check_number,
  paymentChannel: transaction.payment_channel,
  tags: transaction.tags,
  subAccount: transaction.sub_account,
  account: {
    accountId: transaction.account_id,
    name: "Not Found"
  }
})
