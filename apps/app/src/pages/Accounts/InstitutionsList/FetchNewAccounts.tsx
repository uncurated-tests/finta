import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import _ from "lodash";

import { LoadingSpinner } from "src/components/LoadingSpinner";
import * as analytics from "src/lib/analytics";
import { useToast } from "src/lib/useToast";
import { nhost } from "src/lib/nhost";
import { StringOrNumber } from "@chakra-ui/utils";
import { useApolloClient } from "@apollo/client";

import { useInsertPlaidAccountsMutation } from "src/graphql";
import { PlaidItemModel } from "src/types";

export const FetchNewAccounts = ({ plaidItem }: { plaidItem: PlaidItemModel }) => {
  const apolloClient = useApolloClient();
  const [ isFetchingNewAccounts, setIsFetchingNewAccounts ] = useState(false);
  const [ allAccounts, setAllAccounts ] = useState(null as any[] | null);
  const [ accountIdsToAdd, setAccountIdsToAdd ] = useState(null as StringOrNumber[] | null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ createAccountsMutation, { loading: isCreatingAccounts } ] = useInsertPlaidAccountsMutation({})
  const renderToast = useToast();

  useEffect(() => {
    if ( isOpen && allAccounts === null && !isFetchingNewAccounts ) {
      setIsFetchingNewAccounts(true);
      nhost.functions.call(
        '/plaid/getAccounts', 
        { accessToken: plaidItem.accessToken },
        { method: "POST" }
      )
      .then(response => {
        setIsFetchingNewAccounts(false);
        const { res, error } = response;
        if ( error ) {
          renderToast({
            status: "error",
            title: "Uh Oh",
            message: "There was an error fetching new accounts. Please try again later."
          })
          return null;
        }

        const data = res?.data as any;
        const accounts = data ? data.accounts : [];
        setAllAccounts(accounts);
      })
    }
  }, [ isOpen, plaidItem, renderToast, allAccounts, isFetchingNewAccounts ]);

  const newAccountsIds = useMemo(() => _.difference(allAccounts?.map(account => account.account_id) || [], plaidItem.accounts.map(account => account.id)), [ allAccounts, plaidItem ]);
  const newAccounts = useMemo(() => allAccounts?.filter(account => newAccountsIds.includes(account.account_id)) || [], [ allAccounts, newAccountsIds ]);
  
  useEffect(() => {
    setAccountIdsToAdd(newAccountsIds)
  }, [ newAccountsIds ]);

  useEffect(() => {
    if ( !isOpen ) {
      setAllAccounts(null);
      setAccountIdsToAdd(null);
    }
  }, [ isOpen ])

  const onAddAccounts = () => {
    const accountsToAdd = allAccounts?.filter(account => accountIdsToAdd?.includes(account.account_id )) || [];
    createAccountsMutation({ 
      variables: {
        plaid_accounts: accountsToAdd.map(account => ({
          id: account.account_id,
          name: account.name,
          mask: account.mask,
          plaid_item_id: plaidItem.id
        }))
      }
    })
    .then(() => {
      apolloClient.refetchQueries({ include: 'all' })
      .then(() => {
        renderToast({
          status: "success",
          title: "Accounts Added"
        })
      })

      analytics.track({ event: analytics.EventNames.NEW_ACCOUNTS_CONNECTED, properties: {
        count: accountsToAdd?.length || 0
      }});
      onClose();
    })
  }

  const isMenuItemVisible = !plaidItem.error;

  return (
    <>
      <MenuItem
        display = { isMenuItemVisible ? "flex" : "none" }
        icon = { <CardStackPlusIcon /> }
        onClick = { onOpen }
      >Check for New Accounts</MenuItem>

      <Modal
        isOpen = { isOpen }
        onClose = { onClose }
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fetch New Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb = "4">
            { isFetchingNewAccounts ? <LoadingSpinner /> : (
              <Box width = "full">
                { newAccounts.length === 0 ? (
                  <>
                    <Text textAlign = "center">All available accounts for this institution have been connected.</Text>
                  </>
                ) : (
                  <>
                    <Heading mb = "4" fontSize = "large" fontWeight = "medium">New Accounts</Heading>
                    <CheckboxGroup defaultValue = { newAccountsIds } onChange = { setAccountIdsToAdd }>
                      <VStack spacing = "2" width = "full" alignItems = "flex-start">
                        { newAccounts.map(account => <Checkbox value = { account.account_id } key = { account.account_id }>{ account.name }</Checkbox>) }
                      </VStack>
                    </CheckboxGroup>
                  </>
                )}
              </Box>
            )}
          </ModalBody>
          { (accountIdsToAdd || []).length > 0 ? (
            <ModalFooter justifyContent = "flex-end">
              <Button 
                variant = "primary"
                width = {{ base: "full", md: "unset" }} 
                onClick = { onAddAccounts }
                isLoading = { isCreatingAccounts }
              >Add Accounts</Button>
            </ModalFooter>
          ) : null }
        </ModalContent>
      </Modal>
    </>
  )
}