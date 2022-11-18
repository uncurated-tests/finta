import { useCallback, useState } from "react";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent
} from "@chakra-ui/react";

import { ConnectNewInstitutionToDestinations } from "src/components/ConnectNewInstitutionToDestinations";
import { LoadingSpinner } from "src/components/LoadingSpinner";
import { Page } from "src/components/Page";
import { PlaidLink, PlaidLinkOnSuccessMetadata } from "src/components/PlaidLink";
import { exchangePlaidPublicToken } from "src/lib/functions";
import { useToast, UseToastProps } from "src/lib/useToast";
import { useInsertPlaidItemMutation, useUpdatePlaidItemMutation, Plaid_Institutions_Constraint, Plaid_Institutions_Update_Column } from "src/graphql";
import { PlaidItemModel } from "src/types";

const errorToastConfig = {
  title: "Uh Oh",
  message: "We've ran into an error unfortunately. The team has already been notified, and you will receive an email when Finta is up and running again.",
  status: "error"
} as UseToastProps;

export const PlaidOauth = () => {
  const [ newPlaidItem, setNewPlaidItem ] = useState(undefined as PlaidItemModel | undefined )
  const navigate = useNavigate();
  const toast = useToast();
  const linkToken = localStorage.getItem('link_token');
  const [ updatePlaidItemMutation ] = useUpdatePlaidItemMutation();
  const [ createPlaidItemMutation ] = useInsertPlaidItemMutation({ refetchQueries: 'all' });

  const onExitCallback = useCallback(() => null, []);

  const onSuccessCallback = useCallback(async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    const mode = localStorage.getItem('link_mode') || "create";

    if ( mode === "create" ) {
      const { institution, accounts, link_session_id } = metadata;
      Sentry.setContext("Link Context", { link_session_id });

      return exchangePlaidPublicToken({ publicToken: public_token })
      .then(response => {
        const { access_token: accessToken, item_id } = response;
        if ( !(accessToken && item_id) ) {
          return null;
        }

        return createPlaidItemMutation({
          variables: {
            plaid_item: {
              id: item_id,
              accessToken,
              institution: {
                data: {
                  name: institution?.name,
                  id: institution?.institution_id
                },
                on_conflict: {
                  constraint:Plaid_Institutions_Constraint.PlaidInstitutionsPkey,
                  update_columns: [ Plaid_Institutions_Update_Column.Name ]
                } 
              },
              accounts: {
                data: accounts.map(account => ({
                  id: account.id,
                  mask: account.mask,
                  name: account.name
                }))
             
              }
            }
          }
        })
        .then(response => {
          const plaidItem = response.data?.plaid_item;
          if ( !plaidItem ) { 
            navigate('/accounts');
            return; 
          };

          setNewPlaidItem(plaidItem)
        })
        .catch(err => console.log(err))
      })
      .catch(() => toast(errorToastConfig))
    } else {
      updatePlaidItemMutation({
        variables: {
          plaid_item_id: localStorage.getItem('link_item_id') || "",
          _set: { error: null, consent_expires_at: null }
        }
      })
      .then(() => {
        navigate('/accounts');
      })
    }
  }, [ navigate, createPlaidItemMutation, updatePlaidItemMutation, toast ]);

  const onFinish = () => navigate('/accounts');
  
  return (
    <Page>
      <LoadingSpinner />

      <Modal isOpen = { !!newPlaidItem } onClose = { onFinish }>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Bank Account</ModalHeader>
          <ModalCloseButton />

          { newPlaidItem && (
          <ModalBody>
            <ConnectNewInstitutionToDestinations 
              newPlaidItem = { newPlaidItem } 
              onFinish = { onFinish }
            /> 
          </ModalBody>
          )}
        </ModalContent>
      </Modal>


      { linkToken ? (
        <PlaidLink 
          linkToken = { linkToken } 
          onExitCallback = { onExitCallback } 
          onSuccessCallback = { onSuccessCallback }
          receivedRedirectUri = { window.location.href }
        /> 
      ) : null }
    </Page>
  );
}