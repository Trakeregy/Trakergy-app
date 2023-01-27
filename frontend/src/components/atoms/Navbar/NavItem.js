import React from 'react';
import { Flex, Text, Icon, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import '../../../App.scss';

function NavItem({ icon, text, link = '#', onClick = () => {} }) {
  return (
    <Box w='100%' px={5}>
      <NavLink
        to={link}
        style={{
          textDecoration: 'none',
          color: link === '#' ? 'black' : '',
        }}
        onClick={onClick}
      >
        <Flex
          align='center'
          p='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          _hover={{
            bg: 'secondary.500',
            color: 'white',
          }}
        >
          {icon && <Icon as={icon} />}
          <Text display={{ md: 'none', lg: 'none' }} mx={10}>
            {text}
          </Text>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default NavItem;
