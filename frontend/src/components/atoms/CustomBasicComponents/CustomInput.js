import React from 'react';
import { Box, FormControl, Input, Text } from '@chakra-ui/react';

function CustomInput({
  id,
  isRequired,
  placeholder,
  type = 'text',
  value,
  onChange,
  errorLabelText,
  label,
  ...otherProps
}) {
  return (
    <Box flex={1}>
      {label && (
        <Text fontSize={14} ml={5} color='grey.500'>
          {label}
        </Text>
      )}
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
          {...otherProps}
        />
        {errorLabelText && (
          <Text fontSize='sm' color='primary.500' px='6'>
            {errorLabelText}
          </Text>
        )}
      </FormControl>
    </Box>
  );
}

export default CustomInput;
