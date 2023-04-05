import {useState} from 'react';
import Calendar from 'react-calendar';

function eventCalendar(){

  const [date, setDate] = useState(new Date())



  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date}/>
      </div>
      <div className="text-center">
         Selected date: {date.toDateString()}
      </div>
    </div>
     )

   }

   export default Calendar