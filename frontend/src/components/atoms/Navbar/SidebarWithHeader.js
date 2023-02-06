import React from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { Sidebar, Header } from '.';

function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg='grey.100' h='auto'>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen} />

      <Box ml={{ base: 0, md: 116, lg: 116 }} p={6} minH='100vh'>
        {children}
      </Box>
    </Box>
  );
}

export default SidebarWithHeader;
