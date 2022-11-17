import {
  Accordion,
  Avatar, 
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Table,
  Tbody,
  Text,
  Thead,
  Th,
  Tr,
  useColorModeValue as mode
} from "@chakra-ui/react";
import { AiOutlineBank } from "react-icons/ai";
import moment from "moment-timezone";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import _ from "lodash";

import { Account } from "./Account";
import { FetchNewAccounts } from "./FetchNewAccounts";
import { FixConnection } from "./FixConnection";
import { RemovePlaidItem } from "./RemovePlaidItem";
import { AccordionItem } from "src/components/AccordionItem";
import { Card } from "src/components/Card";
import { PlaidItemModel } from "src/types";
import { nhost } from "src/lib/nhost";


export const Institution = ({ plaidItem }: { plaidItem: PlaidItemModel}) => {
  const logoFileId = plaidItem.institution.logo_file?.id;
  const logoSrc = logoFileId ? nhost.storage.getPublicUrl({ fileId: logoFileId }): undefined;

  return (
    <Card width = "full">
      {/* Header */}
      <HStack justifyContent = "space-between">
        <HStack>
          <Avatar
            size = "sm"
            mr = "1"
            src = { logoSrc } 
            icon = { <AiOutlineBank /> }
            fontSize = "1.25rem"
            shadow = { mode('xs', 'dark.xs') }
          />
          <Text fontWeight = "semibold">{ plaidItem.institution.name }</Text>
        </HStack>

        <HStack>
          { ['ITEM_LOGIN_REQUIRED', 'NO_ACCOUNTS'].includes(plaidItem.error || "")|| plaidItem.consent_expires_at ? <FixConnection plaidItem = { plaidItem } /> : null }
          <Menu>
            <MenuButton
              as = { IconButton }
              aria-label = "Bank account options"
              icon = { <DotsHorizontalIcon /> }
              variant = "icon"
            />
            <MenuList>
              { plaidItem.error !== 'ITEM_LOGIN_REQUIRED' ? <FetchNewAccounts plaidItem = { plaidItem } /> : null }
              <RemovePlaidItem plaidItem = { plaidItem } />
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <Text fontSize = "sm" mt = "1" variant = "helper">
        { plaidItem.synced_at ? `Last sync: ${ moment(plaidItem.synced_at).format("MMMM D hh:mm a") }` : null }
      </Text>

      <Divider my = { 2 } />

      {/* Accounts List */}
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem
          buttonLabel = { `${plaidItem.accounts.length} account${plaidItem.accounts.length === 1 ? "" : "s"}` }
          buttonChildren = {(
            <HStack>Integrations</HStack>
          )}
        >
          <Table size = "sm">
            <Thead>
              <Tr>
                <Th width = {{ base: "80%", md: "75%" }} py = "3" fontSize = "sm">Account</Th>
                <Th display = {{ base: "none", md: "table-cell" }} py = "3" fontSize = "sm">Mask</Th>
                <Th display = {{ base: "none", md: "table-cell" }} width = "20%" py = "3" fontSize = "sm">Destinations</Th>
              </Tr>
            </Thead>

            <Tbody>
            { _.sortBy(plaidItem.accounts, [ 'created_at', 'id'])
            .map(account => <Account account = { account } key = { account.id } /> )}
            </Tbody>
          </Table>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}