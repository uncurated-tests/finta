import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from "src/App";
import reportWebVitals from './reportWebVitals';
import { InMemoryCache } from '@apollo/client';
import { NhostReactProvider } from '@nhost/react';
import { NhostApolloProvider } from "@nhost/react-apollo";

import { nhost } from "src/lib/nhost";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <NhostReactProvider nhost = { nhost }>
    <NhostApolloProvider 
      nhost = { nhost }
      cache = { new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              accounts: { merge: ( existing = [], incoming = [] ) => incoming },
              destination_accounts: { merge: ( existing = [], incoming = [] ) => incoming },
              destinations: { merge: ( existing = [], incoming = [] ) => incoming },
              plaid_items: { merge: ( existing = [], incoming = [] ) => incoming },
              sync_logs: { merge: ( existing = [], incoming = [] ) => incoming },
              user_profiles: { merge: ( existing = [], incoming = [] ) => incoming },
            }
          }
        }
      })}
    >
      <ColorModeScript />
      <App />
    </NhostApolloProvider>
  </NhostReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();