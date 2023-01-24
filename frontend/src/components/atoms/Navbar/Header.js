import React from 'react';
import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BellIcon, MenuIcon } from '../icons';
import { connect } from 'react-redux';
import CustomAvatar from '../CustomBasicComponents/CustomAvatar';

function Header({ onOpen, currentUser }) {
    const {
        first_name: firstName,
        last_name: lastName,
        image_url: imageUrl,
    } = currentUser ? currentUser : {};
    const userName = firstName + ' ' + lastName;

    return (
        <Box p={6} h={120} pos='fixed' w='full' bg='grey.100' zIndex={1}>
            <Flex
                ml={{ base: 0, md: 116 }}
                px={{ base: 6, md: 6 }}
                borderRadius={20}
                h='full'
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
                            {userName}
                        </Text>
                        <CustomAvatar src={imageUrl} name={userName} />
                    </Flex>
                </HStack>
            </Flex>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps)(Header);
