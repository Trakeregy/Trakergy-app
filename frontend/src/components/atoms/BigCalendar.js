import React from 'react';
import { Box } from '@chakra-ui/react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../theme/calendar.scss';

const localizer = momentLocalizer(moment);

function BigCalendar({ events = [] }) {
  return (
    <Box bg='white' p={5} borderRadius={20} mt={5}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        style={{ height: '100vh' }}
        events={events}
        views={{
          month: true,
          week: true,
          day: true,
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </Box>
  );
}

export default BigCalendar;
