import React from 'react';
import { FormControl, Input, Text } from '@chakra-ui/react';

function CustomInput({
  id,
  isRequired,
  placeholder,
  type = 'text',
  value,
  onChange,
  errorLabelText,
}) {
  return (
    <>
      <FormControl id={id} isRequired={isRequired}>
        <Input
          size='md'
          borderRadius='full'
          placeholder={placeholder + (isRequired ? ' *' : '')}
          bgColor='grey.100'
          border='none'
          fontSize='md'
          p='6'
          focusBorderColor='grey.500'
          value={value}
          onChange={onChange}
          type={type}
        />
        {errorLabelText && (
          <Text fontSize='sm' color='primary.500' px='6'>
            {errorLabelText}
          </Text>
        )}
      </FormControl>
    </>
  );
}

export default CustomInput;
