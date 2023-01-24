import React from 'react';
import { Avatar } from '@chakra-ui/react';

export default function CustomAvatar({ src = '', name = '', ...otherProps }) {
    return (
        <Avatar
            src={src}
            name={name}
            fontWeight='bold'
            m='0'
            color='white.300'
            size='md'
            {...otherProps}
        />
    );
}
