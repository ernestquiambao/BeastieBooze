import React, {useState} from 'react';
import Calendar from 'react-calendar';
import Times from './Time.jsx';

function eventCalendar(){

  const [date, setDate] = useState(new Date())

  const [entryTime, setEntryTime] = useState(false);



  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} onClickDay={() => setEntryTime(true)}/>
      </div>
      {date.length > 0 ? (
    <p>
    <span>Start:</span>
    {date[0].toDateString()}
    &nbsp;
    &nbsp;
    <span>End:</span>{date[1].toDateString()}
  </p>
         ) : (
  <p>
     <span>Default selected date:</span>{date.toDateString()}
  </p>
         )
  }
  <Times entryTime={entryTime} date={date}/>

</div>

      )
    }


   export default eventCalendar




