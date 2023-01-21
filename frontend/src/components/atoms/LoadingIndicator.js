import { Box } from '@chakra-ui/react';
import React from 'react';
import { LoadingAnimation } from '../animations';

function LoadingIndicator() {
    return (
        <Box h='100px' w='100px' border='10px'>
            <LoadingAnimation />
        </Box>
    );
}

export default LoadingIndicator;
