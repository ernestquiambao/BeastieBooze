import React, { useState} from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'




function Times() {


  const [modalIsOpen, setIsOpen] = useState(false);

  const [eventsDate, setEventsDate] = useState(moment().format("YYYY-MM-DD"))

  //const [eventsFutureDate, setEventsFutureDate] = useState(moment().format("YYYY-MM-DD"))

  const [eventData, setEventData] = useState([]);

  const [toggle, setToggle] = useState(false);

  const { register, handleSubmit } = useForm();

  //const types = ['party', 'date drinks', 'business drinks', 'special occasion drinks', 'drinks with friends', 'holiday drinks', 'bar crawl drinks', 'just need an alone drink']

  const [eventId, setEventId] = useState('');

  const [name, setName] = useState('');

  const [eventType, setEventType] = useState('');

  const [startTime, setStartTime] = useState('');

  const [endTime, setEndTime] = useState('');

  const [description, setDescription] = useState('');

  const [location, setLocation] = useState('');

  const [invites, setInvites] = useState([]);



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




// was thinking about using this for a toggle
  // const toggleCreate = () => {
  //   setToggle(!toggle)
  //   }


  const getEvents = () => {
    axios.get(`routes/calendar/events/${eventsDate}`)
    .then((response) => {
      console.log(response);
      setEventData(response.data);
    })
    .catch((err) => {
      console.error('unable to get calendar day', err);
    })
}


// wil handle changes to a single event
// const saveEventChanges = () => {

//   axios.put(`routes/calendar/events/${eventId}`, {
//     name: name,
//     type: eventType,
//     description: description,
//     endTime: endTime,
//     location: location,
//     invited: invites
//   })
//   .then((response) => {
//     console.log('successful PUT', response);
// })
// .catch((err) => {
//   console.error('unsuccessful PUT', err);
// });
// };

// const handleInputChange = () => {

// }

// const handleEventChanges = () => {


// }


// delete events for the current day
const deleteEventList = () => {
  axios.delete(`routes/calendar/events/${eventsDate}`)
  .then((response) => {
    alert(`you deleted all your events for ${eventsDate}`)
  })
  .then(getEvents)
  .catch((err) => {
    console.error('unable to delete calendar day', err);
  })
}


// to handle deletion of a single event
// const handleEventDelete = () => {

//   axios.delete(`routes/calendar/events/`)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error('unable to delete calendar day', err);
//   })

// }

const handleChangeDate = (newDate) =>{
  setEventsDate(newDate);
  }

  // const handleFutureDate = (newDate) =>{
  //   setEventsFutureDate(newDate);
  //   }

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
>
  <h1>Create Future Events, Search For Past Events</h1>
  <button onClick={closeModal}>close</button>
  <button onClick={getEvents}>Get Events For a Date</button>
  <button onClick={deleteEventList}> Delete Today's Events </button>
  <form>
  <input
      type="date"
    id="set-event-date"
    name="event-date"
    value={eventsDate}
       onChange={(e) => {
      handleChangeDate(e.target.value);
       }}
      ></input>
  </form>
  <div className="today-event-entry">

  { eventData.map((event) => {
      return <div className="today-event-data-list" key={event._id}  value={event._id} onChange={e => setEventId(e.target.value)}>
      <EditText className="today-event-data"  defaultValue={event.name} onChange={e => setName(e.target.value)}/>
      <div className="today-event-data" >{event.date}</div>
      <EditText className="today-event-data"  defaultValue={event.type} onChange={e => setEventType(e.target.value)}/>
      <EditText className="today-event-data" defaultValue={event.description} onChange={e => setDescription(e.target.value)}/>
      <div className="today-event-data">{event.startTime}</div>
      <EditText className="today-event-data" placeholder={event.endTime} onChange={e => setEndTime(e.target.value)}/>
      <EditText className="today-event-data" defaultValue={event.location} onChange={e => setLocation(e.target.value)} />
      <EditText className="today-event-data" defaultValue={event.invites} onChange={e => setInvites(e.target.value)}/>
      {/* <button onClick={saveEventChanges}> Save Edits</button>
      <button onClick={handleEventDelete}> Delete Event</button> */}
      </div>
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



