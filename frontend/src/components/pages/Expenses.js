import {
  Box,
  Flex,
  Icon,
  IconButton,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthPage } from ".";
import {
  deleteExpense,
  getExpenseInfo as getExpenseInfoAction,
  getUserExpenses as getUserExpensesAction,
} from "../../state/actions/expenses";
import ROUTES from "../../utils/routes";
import { Forbidden } from "../atoms";
import {
  EditIcon,
  PlusIcon,
  UserGroupIcon,
  OptionsVerticalIcon,
  TrashIcon,
} from "../atoms/icons";
import ExpenseCreate from "../atoms/ExpenseCreate";

function Expense({
  getExpenseInfo,
  expenseInfo,
  expenses,
  currentUser,
  deleteExpense,
}) {
  const { expenseId } = useParams();
  const { id: userId } = currentUser;
  const [forbidden, setForbidden] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const navigate = useNavigate();

  const handleDeleteExpense = () => {
    deleteExpense(expenseId);
    navigate(ROUTES.EXPENSES);
  };

  useEffect(() => {
    if (expenses && expenseId) {
      const expenseIds = expenses.map((exp) => exp.id);
      const ioe = expenseIds.indexOf(parseInt(expenseId)) === -1;
      setForbidden(ioe);
      if (ioe) return;

      getExpenseInfo(expenseId);
    } else if (expenseId === undefined) {
      setExpenseData({});
      setForbidden(false);
    }
  }, [expenses, expenseId]);

  useEffect(() => {
    if (expenseInfo && expenseId) {
      setExpenseData(expenseInfo);
    }
  }, [expenseInfo]);

  const [openEditExpense, setOpenEditExpense] = useState(false);
  const onCloseExpenseEdit = () => setOpenEditExpense(false);
  const [openMemberAccess, setOpenMemberAccess] = useState(false);
  const onCloseMemberAccess = () => setOpenMemberAccess(false);

  if (forbidden) {
    return (
      <AuthPage>
        <Forbidden />
      </AuthPage>
    );
  }

  const {
    name: expenseName,
    tag: tagName,
    payer: payerName,
    amount: amountName,
  } = expenseData;

  const isAdmin = expenseData?.admin?.id === userId;

  // EXPENSE BOX
  if (expenseId) {
    return (
      <AuthPage>
        {expenseData.id && (
          <ExpenseCreate
            isOpen={openExpenseCreate}
            close={onCloseExpenseCreate}
            expense={expenseData}
          />
        )}
        <Flex
          direction="row"
          h="calc(100vh - 48px)"
          borderRadius={20}
          position="relative"
          overflow="hidden"
        >
          <Flex direction="column" w="60%">
            <Box
              bg="white"
              p={5}
              pl="12"
              overflowY="auto"
              borderTopRightRadius="12"
              borderBottomRightRadius="12"
              h="100%"
            >
              <Box my="auto" mt="16">
                <Flex direction="row" align="center" mb="5" gap="2">
                  <Heading fontSize="36px">{expenseName}</Heading>
                  <IconButton
                    size="sm"
                    borderRadius="full"
                    colorScheme="primary"
                    icon={<PlusIcon size="18pt" />}
                    onClick={() => setOpenExpenseCreate(true)}
                  ></IconButton>
                  <Menu>
                    <MenuButton
                      size="sm"
                      as={IconButton}
                      aria-label="Options"
                      borderRadius="full"
                      colorScheme="primary"
                      icon={<OptionsVerticalIcon size="12pt" />}
                    />
                    <MenuList>
                      {isAdmin && (
                        <MenuItem
                          colorScheme="primary"
                          fontSize="16px"
                          onClick={() => setOpenEditExpense(true)}
                          icon={<EditIcon size="16pt" />}
                        >
                          {t("edit-expense")}
                        </MenuItem>
                      )}
                      <MenuItem
                        fontSize="16px"
                        icon={<UserGroupIcon size="16pt" />}
                        onClick={() => setOpenMemberAccess(true)}
                      >
                        {t("manage-members")}
                      </MenuItem>
                      {isAdmin && (
                        <MenuItem
                          fontSize="16px"
                          icon={
                            <Icon as={TrashIcon} size="16pt" color="red.500" />
                          }
                          onClick={handleDeleteExpense}
                          color="red.500"
                        >
                          {t("delete-expense")}
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </AuthPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenseInfo: state.expenses.expenseInfo,
    expenses: state.expenses.expenses,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenseInfo: (id) => dispatch(getExpenseInfoAction(id)),
    getUserExpenses: () => dispatch(getUserExpensesAction()),
    deleteExpense: (id) => dispatch(deleteExpense(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
