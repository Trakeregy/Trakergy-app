import React, { useState } from 'react';
import {
  IconButton,
  AvatarGroup,
  Icon,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRightShortIcon,
  OptionsVerticalIcon,
  EditIcon,
  MoneyIcon,
  CalendarIcon,
  TagIcon,
} from './icons';
import { format } from 'date-fns';
import { CustomAvatar } from './CustomBasicComponents';
import ExpenseCreate from './ExpenseCreate';

const ExpenseView = ({ expense, trip }) => {
  const { t } = useTranslation();
  const [openExpenseEdit, setOpenExpenseEdit] = useState(false);
  const onCloseExpenseEdit = () => setOpenExpenseEdit(false);
  return (
    <Box
      direction='column'
      p='4'
      borderRadius='20'
      bgColor='primary.500'
      color='white'
      w='260px'
    >
      <ExpenseCreate
        expenseData={expense}
        editMode={true}
        isOpen={openExpenseEdit}
        close={onCloseExpenseEdit}
        trip={trip}
      />
      <Flex mb='2' direction='row' alignItems='space-between'>
        <Heading noOfLines={1} size='sm' flexGrow='1'>
          {expense.description}
        </Heading>
        <Flex direction='row' gap='1'>
          <Icon as={MoneyIcon} size='16pt' color='white' />
          <Text fontSize='16px'>{expense.amount}</Text>
        </Flex>
      </Flex>
      <Flex alignItems='center' gap='1'>
        <Icon as={CalendarIcon} size='16pt' color='white' />
        <Text fontSize='16px'>
          {format(new Date(expense.date), 'E, LLL d')}
        </Text>
      </Flex>
      <Flex alignItems='center' gap='1' mt='2'>
        <Icon as={TagIcon} size='16pt' color='white' />
        <Text fontSize='16px'>{expense.tag.name}</Text>
      </Flex>
      <Flex alignItems='center' gap='1' mt='2'>
        {expense.users_to_split?.length > 0 && (
          <AvatarGroup max={3}>
            {expense.users_to_split.map((member, i) => (
              <CustomAvatar
                ml='0'
                height='42px'
                width='42px'
                key={`trip-members-${i}`}
                name={member.first_name + ' ' + member.last_name}
                src={member.image_url}
              />
            ))}
          </AvatarGroup>
        )}
        <Icon as={ArrowRightShortIcon} size='21pt' color='white' />
        <CustomAvatar
          ml='0'
          height='42px'
          width='42px'
          name={expense.payer?.first_name + ' ' + expense.payer?.last_name}
          src={expense.payer?.image_url}
        />
        <Menu>
          <MenuButton
            ml='auto'
            size='sm'
            as={IconButton}
            aria-label='Options'
            borderRadius='full'
            colorScheme='primary'
            icon={<OptionsVerticalIcon size='12pt' />}
          />
          <MenuList>
            <MenuItem
              color='gray.700'
              colorScheme='primary'
              fontSize='16px'
              icon={<EditIcon size='16pt' />}
              onClick={() => setOpenExpenseEdit(true)}
            >
              {t('edit-expense')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default ExpenseView;
