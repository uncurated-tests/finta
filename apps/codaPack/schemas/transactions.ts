import * as coda from "@codahq/packs-sdk";
import { AccountReferenceSchema } from "./accounts";
import { schemaAttribution } from "./attribution";

export const TransactionSchema = coda.makeObjectSchema({
  properties: {
    transactionId: {
      description: "The ID of the transaction",
      type: coda.ValueType.String,
      required: true
    },
    name: {
      description: "The merchant's name or transaction description",
      type: coda.ValueType.String,
      required: true
    },
    amount: {
      description: "The amount of the transaction",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: true
    },
    currency: {
      description: "The currency of the transaction",
      type: coda.ValueType.String,
      required: false
    },
    authorizedDate: {
      description: "The date the transaction was authorized",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: false
    },
    date: {
      description: "For pending transactions, the date the transaction occurred. For posted transactions, the date the transaction posted",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: false
    },
    isPending: {
      description: "Indicates if the transaction is still pending",
      type: coda.ValueType.Boolean,
      required: true
    },
    merchantName : {
      description: "The merchant's name",
      type: coda.ValueType.String,
      required: false
    },
    checkNumber: {
      description: "The check number of the transaction if the transaction is a check transaction",
      type: coda.ValueType.String,
      required: false,
    },
    paymentChannel: {
      description: "The channel used to make the payment for the transaction",
      type: coda.ValueType.String,
      required: true
    },
    subAccount: {
      description: "If the transaction was initiated by a sub-account, the name or identifier for that sub-account",
      type: coda.ValueType.String,
      required: false
    },
    tags: {
      description: "Categories that this transaction belongs to",
      type: coda.ValueType.String,
      required: false
    },
    account: AccountReferenceSchema
  },
  idProperty: "transactionId",
  displayProperty: "name",
  attribution: schemaAttribution,
  identity: {
    name: "Transaction"
  },
  featuredProperties: ["amount", "currency", "date", "isPending", "account", "tags"]
});