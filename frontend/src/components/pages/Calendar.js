import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { getUserTrips as getUserTripsAction } from '../../state/actions/trips';
import { getExpensesSpecificTrips as getExpensesSpecificTripsAction } from '../../state/actions/expenses';
import { CustomHeading } from '../atoms/CustomBasicComponents';
import COLORS from '../../theme/_colors.scss';
import { BigCalendar } from '../atoms';

function Calendar({
  getUserTrips,
  getExpensesSpecificTrips,
  trips,
  expenses,
  currentUser,
}) {
  const { t } = useTranslation();
  const { id: userId } = currentUser;
  const [events, setEvents] = useState([]);
  const [tripEvents, setTripEvents] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  useEffect(() => {
    if (!trips || trips.length === 0) return;

    const tripIds = new Set();
    const tripEventData = trips.map((trip) => {
      const { id, name, from_date, to_date } = trip;
      tripIds.add(id);
      return {
        id,
        title: name,
        allDay: false,
        start: new Date(from_date),
        end: new Date(to_date),
        color: COLORS.secondary,
      };
    });

    getExpensesSpecificTrips(Array.from(tripIds));
    setTripEvents(tripEventData);
  }, [trips, getExpensesSpecificTrips]);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const isOthersPersonal = (exp) =>
      exp.users_to_split.length === 1 && exp.users_to_split[0] !== userId;

    const exps = expenses.filter((exp) => !isOthersPersonal(exp));

    const expenseEventsData = exps.map((exp) => {
      const { id, description, date } = exp;
      return {
        id,
        title: description,
        allDay: true,
        start: new Date(date),
        end: new Date(date),
        color: COLORS.primary,
      };
    });

    setEvents([...tripEvents, ...expenseEventsData]);
  }, [expenses]);

  return (
    <AuthPage>
      <CustomHeading text={t('calendar')} />
      <BigCalendar events={events} />
    </AuthPage>
  );
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
    expenses: state.expenses.allExpensesCurrentUser,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserTrips: () => dispatch(getUserTripsAction()),
    getExpensesSpecificTrips: (tripIds) =>
      dispatch(getExpensesSpecificTripsAction(tripIds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
