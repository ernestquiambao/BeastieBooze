import { React, useState} from 'react';
import Calendar from 'react-calendar';

function eventCalendar(){

  const [date, setDate] = useState(new Date())

  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">
         Selected date: {date.toDateString()}
      </div>
    </div>
      )
    }


   export default eventCalendar


   //const [entryTime, setEntryTime] = useState(false);

//   onClickDay={() => setEntryTime(true)}

//   {date.length > 0 ? (
//     <p>
//     <span>Start:</span>
//     {date[0].toDateString()}
//     &nbsp;
//     &nbsp;
//     <span>End:</span>{date[1].toDateString()}
//   </p>
//          ) : (
//   <p>
//      <span>Default selected date:</span>{date.toDateString()}
//   </p>
//          )
//   }
//   <Time entryTime={entryTime} date={date}/>

// </div>