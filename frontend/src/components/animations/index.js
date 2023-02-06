import LoadingAnimation from './LoadingAnimation';
import ForbiddenAnimation from './ForbiddenAnimation';
import NoDataAnimation from './NoDataAnimation';
import NotFoundAnimation from './NotFoundAnimation';
import Animation from './Animation';

import statisticsAnimationData from '../../assets/animations/statistics.json';
import calendarAnimationData from '../../assets/animations/calendar.json';
import expensesAnimationData from '../../assets/animations/expenses.json';

const ANIMATION_DATA = {
  STATISTICS: statisticsAnimationData,
  CALENDAR: calendarAnimationData,
  EXPENSES: expensesAnimationData,
};

export {
  Animation,
  LoadingAnimation,
  ForbiddenAnimation,
  NoDataAnimation,
  NotFoundAnimation,
  ANIMATION_DATA,
};
