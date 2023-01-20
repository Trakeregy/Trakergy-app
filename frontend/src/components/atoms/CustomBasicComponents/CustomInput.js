import React from 'react';
import { FormControl, Input } from '@chakra-ui/react';

function CustomInput({
    id,
    isRequired,
    placeholder,
    type = 'text',
    value,
    onChange,
}) {
    return (
        <FormControl id={id} isRequired={isRequired}>
            <Input
                size='md'
                borderRadius='full'
                placeholder={placeholder}
                bgColor='grey.100'
                border='none'
                fontSize='md'
                p='6'
                focusBorderColor='grey.500'
                value={value}
                onChange={onChange}
                type={type}
            />
        </FormControl>
    );
}

export default CustomInput;
