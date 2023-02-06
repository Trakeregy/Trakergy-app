import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { MenuIcon } from '../icons';
import { connect } from 'react-redux';
import { CustomAvatar } from '../CustomBasicComponents';

function Header({ onOpen, currentUser }) {
  const {
    first_name: firstName,
    last_name: lastName,
    image_url: imageUrl,
  } = currentUser ? currentUser : {};
  const userName = firstName + ' ' + lastName;

  return (
    <>
      <Box pos='fixed' right='5' top='5' zIndex={5}>
        <Flex
          ml={{ base: 0, md: 116 }}
          px={{ base: 6, md: 6 }}
          borderRadius={16}
          h='full'
          alignItems='center'
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          py='2'
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant='outline'
            bg='white'
            aria-label='open menu'
            icon={<MenuIcon />}
          />
        </Flex>
      </Box>
      <Box pos='fixed' right='10' bottom='10' zIndex={5}>
        <CustomAvatar
          src={imageUrl}
          name={userName}
          h='60px'
          w='60px'
          shadow='dark-lg'
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(Header);
