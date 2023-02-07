import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  addExpense,
  editExpense,
  getAllTags,
} from '../../state/actions/expenses';
import { CustomAvatar } from './CustomBasicComponents';

const ExpenseCreate = ({
  isOpen,
  close,
  trip,
  addExpense,
  editExpense,
  editMode,
  expenseData,
}) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);
  const [expense, setExpense] = useState({});
  const [step, setStep] = useState(1);
  const [members, setMembers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchTags() {
      const response = await getAllTags();
      setTags(
        response.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))
      );
    }
    fetchTags();
  }, []);

  useEffect(() => {
    setMembers(
      trip?.members.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        image_url: user.image_url,
      }))
    );
  }, trip.members);

  const handleExpenseCreate = async () => {
    await addExpense({
      ...expense,
      trip: trip.id,
      tag: expense.tag.value,
      payer: expense.payer.value,
      users_to_split: expense.users_to_split.map((_user) => _user.value),
    });
    toast({
      title: t('notify-expense-title'),
      description: t('notify-expense-subtitle'),
      status: 'success',
      duration: 9000,
      variant: 'subtle',
      isClosable: true,
      containerStyle: {
        marginBottom: 6,
      },
    });
    handleClose();
  };

  const isDataValid = expense.amount && expense.amount > 0;

  const handleExpenseEdit = async () => {
    await editExpense({
      ...expense,
      tag: expense.tag.value,
      payer: expense.player.value,
      amount: expense.amount.value,
      users_to_split: expense.users_to_split.map((_user) => _user.value),
    });
    handleClose();
  };

  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, '');
  const nextStep = () => setStep(2);

  const handleClose = () => {
    setExpense({});
    setStep(1);
    close();
  };

  const memberOption = ({ value, label, image_url }) => (
    <Flex direction='row' gap='2' alignItems='center'>
      <CustomAvatar size='sm' src={image_url} name={label} />
      <div>{label}</div>
    </Flex>
  );

  return (
    <>
      <Modal size='xl' isOpen={isOpen} onClose={handleClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent borderRadius='16' boxShadow='xl'>
          <ModalHeader mt='2' pb='0' fontSize='23'>
            {editMode ? t('expense-edit-title') : t('expense-create-title')}
          </ModalHeader>
          <ModalCloseButton borderRadius='full' size='md' />
          <ModalBody>
            <Text fontSize='md'>
              {editMode
                ? t('expense-edit-subtitle')
                : t('expense-create-subtitle')}
            </Text>
            <Stack gap='6' mt='8'>
              {step === 1 ? (
                <>
                  <FormControl id='amount' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('expense-amount-label')}
                    </FormLabel>
                    <NumberInput
                      min={1}
                      borderRadius='xl'
                      value={format(expense.amount ?? 0)}
                      onChange={(valueString) =>
                        setExpense({
                          ...expense,
                          amount: parse(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl id='date' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('date-label')}
                    </FormLabel>
                    <Input
                      size='md'
                      type='date'
                      min={trip.from_date}
                      max={trip.to_date}
                      borderRadius='xl'
                      value={expense.date}
                      onChange={(e) =>
                        setExpense({
                          ...expense,
                          date: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl id='tag' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('tag-label')}
                    </FormLabel>
                    <Select
                      aria-labelledby='aria-label'
                      inputId='aria-tag-input'
                      name='aria-tags'
                      options={tags}
                      onChange={(newValue) =>
                        setExpense({ ...expense, tag: newValue })
                      }
                      value={expense.tag}
                    />
                  </FormControl>
                  <FormControl id='description' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('expense-description-label')}
                    </FormLabel>
                    <Textarea
                      value={expense.description}
                      borderRadius='xl'
                      onChange={(e) =>
                        setExpense({
                          ...expense,
                          description: e.target.value,
                        })
                      }
                      size='md'
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl id='payer' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('payer-label')}
                    </FormLabel>
                    <Select
                      placeholder='Select member'
                      aria-labelledby='aria-label'
                      inputId='aria-payer-input'
                      name='aria-payer'
                      options={members}
                      formatOptionLabel={memberOption}
                      onChange={(newValue) =>
                        setExpense({ ...expense, payer: newValue })
                      }
                      value={expense.payer}
                    />
                  </FormControl>
                  <FormControl id='usersToSplit' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('users-to-split-label')}
                    </FormLabel>
                    <Select
                      isMulti
                      aria-labelledby='aria-label'
                      inputId='aria-user-to-split-input'
                      name='aria-user-to-split'
                      options={members}
                      formatOptionLabel={memberOption}
                      onChange={(newValue) =>
                        setExpense({ ...expense, users_to_split: newValue })
                      }
                      value={expense.users_to_split}
                    />
                  </FormControl>
                </>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            {step !== 1 ? (
              <>
                <Button variant='ghost' mr={3} onClick={handleClose}>
                  {t('dismiss')}
                </Button>

                <Button
                  colorScheme='primary'
                  borderRadius='lg'
                  onClick={editMode ? handleExpenseEdit : handleExpenseCreate}
                >
                  {editMode ? t('edit') : t('create')}
                </Button>
              </>
            ) : (
              <Button
                isDisabled={!isDataValid}
                colorScheme='primary'
                borderRadius='lg'
                onClick={nextStep}
              >
                {t('next')}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addExpense: (expense) => dispatch(addExpense(expense)),
    editExpense: (expense) => dispatch(editExpense(expense)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCreate);
