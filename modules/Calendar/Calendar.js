import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// How the event will display on the calendar. This is optional.
function Event({ event }) {
    return (
        <div>
            {event.title}
        </div>
    )
}

const Calendar = (props) => {
    const events = props.events.map(event => ({
        title: event.title.rendered,
        start: new Date(event.acf.start_date),
        end: new Date(event.acf.end_date)
    }));

    return (
        <div>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
                components={{
                    event: Event
                }}
            />
        </div>
    );
}

export default Calendar;
