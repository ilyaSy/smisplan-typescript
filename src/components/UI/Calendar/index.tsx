import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const calendarModes = { today: 'Сегодня', month: 'Месяц', week: 'Неделя', day: 'День', list: 'Список' };

interface ICalendar {
  dates: any[],
  handleDayClick: (event: any) => void,
  handleEventClick: (event: any) => void
};

export const Calendar: React.FC<ICalendar> = ({dates, handleDayClick, handleEventClick}) => {
  let initialView = 'dayGridMonth';
  if (/\/calendar\/list/.test(document.location.pathname)) {
    initialView = 'listWeek';
  }

  return (
    <FullCalendar
      events={dates}
      eventTimeFormat={{ hour: '2-digit', minute: '2-digit' }}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView={initialView}
      dateClick={handleDayClick}
      eventClick={handleEventClick}
      locale="ru"
      selectable
      weekNumberCalculation="ISO"
      weekends={false}
      slotMinTime="08:00:00"
      headerToolbar={{
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title',
        right: 'today prev,next',
      }}
      buttonText={calendarModes}
    />
  )
}
