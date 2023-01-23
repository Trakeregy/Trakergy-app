import React from 'react';
import { Avatar, Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BellIcon, MenuIcon } from '../icons';

function Header({ onOpen }) {
    return (
        <Box p={{ base: 0, md: 6, lg: 6 }}>
            <Flex
                ml={{ base: 0, md: 126 }}
                px={{ base: 6, md: 6 }}
                borderRadius={20}
                h='20'
                alignItems='center'
                bg='white'
                justifyContent={{ base: 'space-between', md: 'flex-end' }}
            >
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onOpen}
                    variant='outline'
                    aria-label='open menu'
                    icon={<MenuIcon />}
                />

                <HStack spacing={{ base: 0, md: 6 }}>
                    <IconButton
                        size='md'
                        variant='solid'
                        aria-label='open menu'
                        icon={<BellIcon size='15pt' />}
                    />
                    <Flex alignItems={'center'}>
                        <Text fontSize='md' mx={5}>
                            Justina Clark
                        </Text>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                    </Flex>
                </HStack>
            </Flex>
        </Box>
    );
}

export default Header;
