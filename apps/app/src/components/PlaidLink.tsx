import { useCallback, useEffect } from "react";
import { 
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOnExit,
  PlaidLinkOnEvent
} from 'react-plaid-link';
import * as Sentry from "@sentry/react";

import * as analytics from "src/lib/analytics";

export interface PlaidLinkProps {
  linkToken: string;
  onExitCallback: () => void;
  onSuccessCallback?: (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => void;
  receivedRedirectUri?: string;
  itemId?: string;
}

export type { PlaidLinkOnSuccessMetadata };

export const PlaidLink = ({ linkToken, onExitCallback, receivedRedirectUri, onSuccessCallback = () => null }: PlaidLinkProps) => {
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    if ( ["HANDOFF", "EXIT"].includes(eventName) ) {
      localStorage.removeItem('link_token');
      localStorage.removeItem('link_mode');
      localStorage.removeItem('link_item_id');
      onExitCallback();
    }
  }, [ onExitCallback ]);

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    if ( error ) {
      const errorContext = { error, metadata };
      Sentry.captureException(new Error("Plaid Link error"), scope => scope.setContext("On Exit Context", errorContext));
    }

    analytics.track({ event: analytics.EventNames.ADD_INSTITUTION_PORTAL_CLOSED, properties: {
      provider: 'plaid',
      has_error: !!error
    }});

    onExitCallback()
  }, [ onExitCallback ]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
    Sentry.setContext("Link Context", { link_session_id: metadata.link_session_id });
    onSuccessCallback && onSuccessCallback(public_token, metadata)
  }, [ onSuccessCallback ]);

  const plaidConfig = {
    token: linkToken,
    onSuccess,
    onExit,
    onEvent,
    receivedRedirectUri
  };

  const { open, ready, error } = usePlaidLink(plaidConfig);

  useEffect(() => {
    if ( ready ) {
      open();
    }
  }, [ ready, open, error ]);

  return <></>
}