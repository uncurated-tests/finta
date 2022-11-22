import * as coda from "@codahq/packs-sdk";
import { AccountReferenceSchema } from "./accounts";
import { schemaAttribution } from "./attribution";

export const InvestmentTransactionsSchema = coda.makeObjectSchema({
  properties: {
    investmentTransactionId: {
      description: "The ID of the investment transaction",
      type: coda.ValueType.String,
      required: true
    },
    name: {
      description: "The description of the investment transacions",
      type: coda.ValueType.String,
      required: true
    },
    amount: {
      description: "The amount of the investment transaction",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: true
    },
    fees: {
      description: "The combined value of all fees applied to this transaction",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    price: {
      description: "The price of the security at thich this transaction occured",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: true
    },
    quantity: {
      description: "The number of units of the security involved in the transaction",
      type: coda.ValueType.Number,
      precision: 4,
      useThousandsSeparator: true,
      required: true
    },
    currency: {
      description: "The currency of the investment transaction",
      type: coda.ValueType.String,
      required: false
    },
    date: {
      description: "The date of the investment transaction",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: true
    },
    type: {
      description: "The type of the investment transaction",
      type: coda.ValueType.String, // TODO: Make these select list column type when Coda makes functionality available
      required: true
    },
    subtype: {
      description: "The subtype of the investment transaction",
      type: coda.ValueType.String,
      required: false
    },
    symbol: {
      description: "The security's trading symbol",
      type: coda.ValueType.String,
      required: false
    },
    securityName: {
      description: "The name of the security",
      type: coda.ValueType.String,
      required: false
    },
    securityType: {
      description: "The security type of the holding",
      type: coda.ValueType.String,
      required: false
    },
    account: AccountReferenceSchema
  },
  idProperty: "investmentTransactionId",
  displayProperty: "name",
  attribution: schemaAttribution,
  identity: {
    name: "InvestmentTransaction"
  },
  featuredProperties: ["date", "quantity", "price", "fees", "amount", "currency", "type", "subtype", "symbol", "securityName", "securityType", "account"]
})