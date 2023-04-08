import React, { useState} from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import axios from 'axios';

const time = []
//this is to create the start time and end time when creating the event form
for(let hour = 0; hour < 24; hour++) {
   time.push(moment({ hour }).format('h:mm A'));
   time.push(
        moment({
            hour,
            minute:30

        }).format('h:mm A')
    );
}


function Times() {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [eventsDate, setEventsDate] = useState(moment().format("YYYY-MM-DD"))

  const [eventData, setEventData] = useState([]);



  const getEvents = () => {
    axios.get(`routes/calendar/events/${eventsDate}`)
    .then((response) => {
      setEventData(response.data);
    })
    .catch((err) => {
      console.error('unable to get calendar day', err);
    })
}





  const openModal = () => {
    setIsOpen(true);
  }


  const closeModal = () => {
    setIsOpen(false);
  }


return (

<div>
<button onClick={openModal}>See Your Schedule </button>
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}

  contentLabel="Example Modal"
>
  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
  <button onClick={closeModal}>close</button>
  <button onClick={getEvents}>Get Events For a Date</button>
  <form>
  <input
      type="date"
    id="set-event-date"
    name="event-date"
    value={eventsDate}
       onChange={(e) => {
      setEventsDate(e.target.value);
       }}
      ></input>
  </form>
  <div className="today-event-entry">
    <button> Edit Event</button>
  { eventData.map((event) => {
      return <ul className="today-event-data-list">
      <EditText className="today-event-data" defaultValue={event.name}/>
      <li className="today-event-data">{event.date}</li>
      <li className="today-event-data">{event.type}</li>
      <EditText className="today-event-data" defaultValue={event.description}/>
      <li className="today-event-data">{event.startTime}</li>
      <EditText className="today-event-data" placeholder={event.endTime}>
      <select className='form-control'>
        {time.map((times, index) => {
    return <option  key={index}>{times}</option>
     })}
     </select>
      </EditText>
      <EditText className="today-event-data" defaultValue={event.location}/>
      <EditText className="today-event-data" defaultValue={event.invites}/>
      </ul>
      })}
  </div>

</Modal>
</div>


)
}
 export default Times;


//  <div className="times">
//   <select>
//    {time.map((times, index) => {
//     return <option entryDate ={entryDate} key={index}>{times}</option>
//      })}
//     </select>
//  </div>

{/* <button>tab navigation</button>
    <button>stays</button>
    <button>inside</button>
    <button>the modal</button> */}


