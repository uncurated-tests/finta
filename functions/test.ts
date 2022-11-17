// import { google, sheets_v4 } from "googleapis";
// import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
// const CLIENT_EMAIL = "finta-app@finta-integration.iam.gserviceaccount.com";
// const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCorcJKsKFFVuov\nYuDp1fECwj95zv7YFjkxGLs2W/5lN7SL7hU0NQfsrv82MFee4zUAxKLsuh1caU1H\nzyde5xKY2adNrLawlmOmSz8G36+vx/Ifb4t6eDUqaw0xWK5euoyf6BL9XvKDYNP+\nFm6Pd3vRe28lzZ/2gn8BwGhWOn3BRDot7aMuRjsDEotokXnsChfqXM2UNVMMDwNi\nlIgCKp26nE/NGmRJ4bSLGHMDbG5XKo29Cq1Q488ExbX2SQNYrJfZuGqijDyGpFgD\nE2CCNQMcC7YZMmOx7nSAH/YJOFrOQxWWVXNjuPYurJJpKTdgERGKQQBlc17D2C89\nXd7bfriDAgMBAAECggEABZlrAy6008fsUzFdlPWQoA5RrBn2dLbcJCiVglrwaWy9\ndg2rr4V5I161wxc8uV4CcumUHPaapegq9BDI1komYGONPbNXhyoe2bTSvUgsnVGu\nVGPQBfs6jJNsJzCx7RwVMfOyua1usHTE5MDa37FQL2aBDIi0YCr5y1WXQRGE/ibX\nT2e2f6X0BvAA3A+VP4OuFA/fTVoKSrFrbRpBgslVYeB8n4aSr77OYdzw+s4YJ7zC\njX4+jM2OFwzHITjI03lxSvxxEutuZpGol5ALrjWcKWSOn5y+67rllGAey7C0frZd\nFMc7yRR9nSr97yiOykmCRELRqWKn4hJwSS7y5krUaQKBgQDgUprsyLDY2UV4DgTT\n/d8bEa0c8aBYY2zYrIv2KpQFaZwoCoK8OmVhrmSW9LXV++uCwiCGvUcLBFi4o5Qu\nscGk3LlSsTrXow16Mx7KxIq1zStzB4kSbB5bwVh62RDE9XIMTmoJo1XO13bpan35\ndkL3uoU8tPl/wY7UmHwkbW1Y+QKBgQDAf5fqivNiaVds5WleUG8rPYnuvZtREBpb\nXd/IQuzjmmLEJcTCcNyf+kJwta8gpJE0QQNyDxlWFOqk8ypDh4aozZrjEIA/4WfH\nIk+i1N8nH15oHcwWFeHUOhQCEJ4t1S9vZ8Ww6E4gQvULh3dLds1jcZWHiKo0Hoyf\nHbSXKH7YWwKBgQDckVy0JkF9d2XPPjmRGLcfLqpBI3S+dES6aC7Wxdb123ooBO23\nltPI0Gkn5UZGOYbA85B36/TG6Gc0ZeN2ZmI5cK7omEt7bF/8H/fO+KJLUInAeVBW\nROk030/Yu0a5431YjGHHSEs/Lq1FpehoOdhvLX+EyY3qCLAgai7mwpIaQQKBgQCh\n4iuVuOjZGBHHqF4mTKpQyN3Ygme9kjc4Iwfw2CdzeQAaSFDh3BwOBV4efwwZ/YuH\nUC1fnEcIV2rE8SHXzH94MgBReC0Ci8LEepxSKYbI1d6E3Jom8JwL6BOvcN41WRUd\nMT3VemdJRkXhPjkao3wyZvEDG/FXB2Hm5gpbHFkgBQKBgQDdXyOVyCYkbpDH1OI+\n6ZgaQKG/cjJ0eoq02MOZeCqXQEUzZap2uq3Bt0WBRIL9fwSoSlpf3is0RaxbTQ17\neG4xsD2PTuY0fB6FhsokQ216UEavBWhxNeIU1Y0kZYEGiQ1LlbOtP9pS4Y1P8qYq\nmDXC2rrtr01aBSj3CJOYcdNEoA==\n-----END PRIVATE KEY-----\n";

// const doc = new GoogleSpreadsheet("1R1FicItJLAN_r7wQCxLGI2pzH_pwHqs5ewQCqNoAWrU");

// (async () => {
//   await doc.useServiceAccountAuth({
//     client_email: CLIENT_EMAIL,
//     private_key: PRIVATE_KEY
//   }).then(() => doc.loadInfo());

//   const sheet = doc.sheetsByIndex[0];
//   await sheet.loadCells();
//   await sheet.loadHeaderRow();
//   const headerRow = sheet.headerValues;
  
//   let i = 0;
//   while ( true ) {
//     const columnWithValue = headerRow.find((_, index) => {
//       const cell = sheet.getCell(i, index);
//       return !!cell.value;
//     })
//     if ( !columnWithValue ) { break; }
//     i++
//   }

//   console.log(i)
// })()

// (async () => {
//   const JwtClient = new google.auth.JWT(CLIENT_EMAIL, undefined, PRIVATE_KEY, ['https://www.googleapis.com/auth/drive']);
//   const sheets = google.sheets({ version: 'v4', auth: JwtClient });

//   const response = await sheets.spreadsheets.values.get({ 
//     spreadsheetId: '1R1FicItJLAN_r7wQCxLGI2pzH_pwHqs5ewQCqNoAWrU',
//     range: 'Accounts'
//   }).then(response => response.data.values);
//   console.log(response)
// })()

import { Configuration, PlaidApi, PlaidEnvironments, CountryCode, AccountsGetRequestOptions } from "plaid";


const client = new PlaidApi(new Configuration({
    basePath: PlaidEnvironments['production'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': "5fc97e6805b46200122a377c",
        'PLAID-SECRET': "f3055858057fb25168f952785782a6",
        }
    }
}))

const accessToken = "access-production-3860a8a7-c057-464f-a123-69fedcec1a08"

client.transactionsGet({ access_token: accessToken, start_date: '2022-10-01', end_date: '2022-10-16'})
.then(response => console.log(response.data.transactions.filter(t => !!t.pending)))

// {"stripe_customer_id":"cus_K7ND7zCVI6eFvW"}

// client.accountsGet({ access_token: accessToken })
// .then(response => console.log(response.data.accounts))

// client.accountsBalanceGet({ access_token: accessToken })
// .then(response => console.log(response.data.accounts))

//{"accounts":{"fields":[{"field":"institution","field_id":"VaBH"},{"field":"id","field_id":"MV%7CJ"},{"field":"name","field_id":"title"},{"field":"available","field_id":"ZTWH"},{"field":"current","field_id":"PKV%60"},{"field":"currency","field_id":"gktR"},{"field":"mask","field_id":"KuVA"},{"field":"type","field_id":"xEjv"},{"field":"subtype","field_id":"iAd%40"},{"field":"limit","field_id":"wLF_"}],"table_id":"bf97a2d6-a16d-4afe-bfef-58002f6b4d7a","is_enabled":true},
//"holdings":{"fields":[{"field":"summary","field_id":"title"},{"field":"account","field_id":"fLb%7B"},{"field":"cost_basis","field_id":"%3DwCK"},{"field":"currency","field_id":"gno%3F"},{"field":"quantity","field_id":"Nv%3Eq"},{"field":"security_id","field_id":"mC%60o"}],"table_id":"c942a68d-32aa-48fc-a4b0-950ed82be412","is_enabled":true},
//"securities":{"fields":[{"field":"id","field_id":"pv_C"},{"field":"symbol","field_id":"title"},{"field":"name","field_id":"YjaY"},{"field":"close_price","field_id":"jm_h"},{"field":"close_price_as_of","field_id":"ka~F"},{"field":"type","field_id":"kE_H"}],"table_id":"a1509714-3cc4-459a-acce-a603a1bb6234","is_enabled":true},
//"institutions":{"fields":[{"field":"id","field_id":"Z~fn"},{"field":"name","field_id":"title"},{"field":"last_update","field_id":"k_%3Fh"},{"field":"error","field_id":"%3ChLt"}],"table_id":"79c97685-a5ab-472b-a6d1-9f43799104c4","is_enabled":true},"transactions":{"fields":[{"field":"account","field_id":"_sFi"},{"field":"id","field_id":"fLv%3B"},{"field":"summary","field_id":"title"},{"field":"date","field_id":"%7C%5CoZ"},{"field":"amount","field_id":"hrzI"},{"field":"currency","field_id":"prdo"},{"field":"is_pending","field_id":"y%3BA%3E"}],"table_id":"957406fe-f613-444a-8f9f-35210b6779ca","is_enabled":true},"investment_transactions":{"fields":[{"field":"account","field_id":"Kk%40r"},{"field":"amount","field_id":"c%3AST"},{"field":"currency","field_id":"jpGn"},{"field":"date","field_id":"K%7BHY"},{"field":"fees","field_id":"FvGD"},{"field":"id","field_id":"D%5D%40a"},{"field":"price","field_id":"Pc%7CD"},{"field":"quantity","field_id":"by%3AZ"},{"field":"security_id","field_id":"%3CZGN"},{"field":"subtype","field_id":"SedI"},{"field":"summary","field_id":"title"},{"field":"type","field_id":"%5EY%3D%60"}],"table_id":"07283272-5d1c-4551-9ea8-ad2353c39ce2","is_enabled":true}}

// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// const client = new Client({ auth: "secret_gSbNkUqlQAYXOdFJ1FZwUHto4F9mPA8u94ZVtygiyL" });

// (async () => {
//   // Institution
//   //const response = await client.databases.query({ database_id: "79c97685-a5ab-472b-a6d1-9f43799104c4", filter: { property: 'Z~fn', rich_text: { equals: 'XEZbDeo5aYU6NNZ9R7OOtvjJMw4koNtrKXoMV' }}});

//   // Account
//   const response = await client.databases.query({ database_id: "bf97a2d6-a16d-4afe-bfef-58002f6b4d7a" })
//   console.log((response.results[0] as PageObjectResponse).properties.Institution)
// })()

// import { LogSnag } from 'logsnag';
// const logsnag = new LogSnag({
//     token: "33467c2504022593d8177e6c67c76aca",
//     project: 'finta'
// });

// logsnag.publish({
//     channel: 'activity',
//     event: 'TEST',
//     description: 'Just signed up',
//     icon: "👤",
//     notify: true,
//     tags: { "user-id": "HEY"}
// }).catch(err => console.log(err))

// (() => {
//     try {
//         const x = "hey";
//         throw new Error("ERROR")
//     } catch (err) {
//       const trace = err.stack;
//       console.log(trace)
//     }
// })()

// const stripe = require('stripe')('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');

// stripe.subscriptions.list().then(response => console.log(response.data[0]))

export {};

