import React from 'react';
import { Avatar, Tooltip } from '@chakra-ui/react';

export default function CustomAvatar({ src = '', name = '', ...otherProps }) {
  return (
    <Tooltip label={name}>
      <Avatar
        src={src}
        name={name}
        fontWeight='bold'
        m='0'
        color='white.300'
        size='md'
        {...otherProps}
      />
    </Tooltip>
  );
}
