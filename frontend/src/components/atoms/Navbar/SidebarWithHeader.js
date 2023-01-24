import React from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { Sidebar, Header } from '.';

function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH='100vh' bg='gray.100'>
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

            <Box ml={{ base: 0, md: 126, lg: 126 }} p={6}>
                {children}
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
