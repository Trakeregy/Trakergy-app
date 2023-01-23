import React from 'react';
import { Flex, Link, Text, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function NavItem({ icon, text, link = '#', onClick = () => {} }) {
    return (
        <Link
            _focus={{ boxShadow: 'none' }}
            px={{ base: 6 }}
            w='full'
            onClick={onClick}
        >
            <NavLink to={link} style={{ textDecoration: 'none' }}>
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
        </Link>
    );
}

export default NavItem;
