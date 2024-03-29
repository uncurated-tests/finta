import { useEffect, useState, useMemo } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  Tooltip
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { IntegrationLogo } from "src/components/IntegrationLogo";
import { LargeIconButton } from "src/components/LargeIconButton";
import { IntegrationModel } from "src/types";

import { AddDestinationModal } from "./AddDestinationModal";
import { useGetIntegrationsQuery } from "src/graphql";
import { useAuth } from "src/lib/useAuth";

export const AddDestination = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const mode = searchParams[0].get('mode');
  const integration = searchParams[0].get('integration')

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [ selectedIntegration, setSelectedIntegration ] = useState(null as IntegrationModel | null);
  const { data } = useGetIntegrationsQuery();
  const integrations = useMemo(() => data?.integrations as IntegrationModel[] || [], [data]);
  const onOpenIntegrationComponent = (integration: IntegrationModel) => {
    onClose();
    setSelectedIntegration(integration);
  }

  useEffect(() => {
    if ( mode === 'setup' && !!integration ) {
      setSelectedIntegration(integrations.find(i => i.id === integration) || null)
    }
  }, [ integrations, mode, integration ]);

  const onCloseIntegrationComponent = () => setSelectedIntegration(null);

  const disableAddDestination = !user || !user.stripeData.hasAppAccess;
  return (
    <>
      <Tooltip shouldWrapChildren isDisabled = { !disableAddDestination } label = "Please reactivate your subscription on the settings page to add a new destination">
        <Button
          variant = "primary"
          onClick = { onOpen }
          isDisabled = { disableAddDestination }
        >Add Destination</Button>
      </Tooltip>

      <Modal isOpen = { isOpen } onClose = { onClose } size = "2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Destination</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb = "4">
            <Text mb = "2">Send your financial data to any of these integrations.</Text>
            <SimpleGrid spacing = "2" columns = {{ base: 1, sm: 2 }}>
              { integrations
                .map(integration => (
                  <LargeIconButton 
                    key = { integration.id }
                    label = { integration.name }
                    Icon = { () => <IntegrationLogo width = {{ base: '40px', sm: '50px' }} height = "auto" integration = { integration } />}
                    onClick = { () => onOpenIntegrationComponent(integration) }
                    description = ""
                    size = "sm"
                  />
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AddDestinationModal
        integration = { selectedIntegration }
        onBack = { () => { onCloseIntegrationComponent(); onOpen(); } }
        onClose = { onCloseIntegrationComponent }
      />
    </>
  )
}