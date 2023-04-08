import React, {useState} from 'react';
import ReactModal from 'react-modal'
import Calendar from 'react-calendar';
import Times from './Time.jsx';
import { useForm } from 'react-hook-form'
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment';
import TodayEvent from './EventsToday.jsx';

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   type: yup.string().required(),
//   description: yup.string().required(),
//   startTime: yup.string().required(),
//   endTime: yup.string().required(),
//   location: yup.string().required()
// });
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

function eventCalendar(){
// current date for the calendar
  const [currDate, setDate] = useState(new Date())
// controls the calendar click
  const [entryDate, setEntryDate] = useState(false);
// controls the state of the pop up
  const [isOpen, setIsOpen] = useState(false);
//callbacks required for the form to work
  const { register, handleSubmit } = useForm();

  const [eventDate, setEventDate] = useState(moment().format("YYYY-MM-DD"))

  const [name, setName] = useState('');

  const [eventType, setEventType] = useState('');

  const [startTime, setStartTime] = useState('');

  const [endTime, setEndTime] = useState('');

  const [description, setDescription] = useState('');

  const [location, setLocation] = useState('');

  const [invites, setInvites] = useState([]);


//is the current day for the get request
  const [eventsListDate, setEventsListDate] = useState(moment().format("YYYY-MM-DD"));
// events list for the current day
  const [eventsList, setEventsList] = useState([]);
// event types
  const types = ['party', 'date drinks', 'business drinks', 'special occasion drinks', 'drinks with friends', 'holiday drinks', 'bar crawl drinks', 'just need an alone drink']









// this opens the popup to create an event
  const eventCreate = () => {
    setIsOpen(true);
  }
// when a form is submitted this creates an event for a certain day selected in the form
  const onSubmit = () => {
    axios.post('/routes/calendar/events', {
      date: eventDate,
      name: name,
      type: eventType,
      startTime: startTime,
      endTime: endTime,
      description: description,
      location: location,
      invited: invites
    })
      .then((data) => {
        console.log('You have saved a calendar entry:', data);
      })
      .then(alert(`You have saved an event for: ${eventDate}` ))
      .then(setIsOpen(false))
      .catch((err) => {
        console.error('failed to post calendar entry', err);
      })
  }


  // this converts the Date object into a string to be used for the axios get request to get a date
const changeDateformat = () => {
  let today = currDate;
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  const yyyy = today.getFullYear();
  if(dd < 10)
  {
      dd=`0${dd}`;
  }
  if(mm < 10)
  {
      mm=`0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;
setEventsListDate(today);
}

console.log(eventsListDate);



// this sets the date for the event form
  const handleEventDate = (newDate) =>{
    setEventDate(newDate);
    }


 console.log(eventDate);
// this pulls a list of all of the events that occur on today's date
//     const eventList = () => {
//     axios.get(`routes/calendar/events/${eventsListDate}`)
//     .then((response) => {
//       setEventsList(response.data);
//     })
//     .catch((err) => {
//       console.error('unable to get calendar day', err);
//     })
// }


  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate}
          value={currDate}
          onClickDay={() => {
            setEntryDate(true); eventCreate()}}/>
      </div>
      {currDate.length > 0 ? (
    <p>
    <span>Start:</span>
    {currDate[0].toDateString()}
    &nbsp;
    &nbsp;
    <span>End:</span>{currDate[1].toDateString()}
  </p>
         ) : (
  <p>
     <span> Selected date: </span>{currDate.toDateString()}
  </p>
         )
  }
  {/* <button onClick={eventCreate}> Create an Event For Today </button> */}
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        This is the content of the modal.
<form className='input-form ' onSubmit={handleSubmit(onSubmit)}>
<h4 className='create-form-heading'> Create an Event</h4>
<h4 className='create-form-heading'> Pick a Date</h4>
<input className='form-control' {...register('date')} type="date"
          id="event-date"
          name="event-entry-date"
          value={eventDate}
          onChange={(e) => {
            handleEventDate(e.target.value);
          }}
        ></input>
        <h4 className='create-form-heading'>Name Your Drinks Event</h4>
        <input className='form-control' {...register('name')} onChange={event => setName(event.target.value)}/>
        <h4 className='create-form-heading'>Type of Event:</h4>
        <select className='form-control' {...register('type')} onChange={event => setEventType(event.target.value)}>
          <option>none </option>
          {types.map((type, index) => {
            return <option type={type} key={index}>{type}</option>;
          })}
        </select>
        <h4 className='create-form-heading'>Details</h4>
        <input className='form-control' {...register("description", {required: true})} onChange={event => setDescription(event.target.value)}/>
        <h4 className='create-form-heading'>Start Time</h4>
        <select className='form-control' {...register('startTime')} onChange={event => setStartTime(event.target.value)}>
        {time.map((times, index) => {
    return <option entryDate ={entryDate} key={index}>{times}</option>
     })}
        </select>
        <h4 className='create-form-heading'>End Time</h4>
        <select className='form-control' {...register('endTime')} onChange={event => setEndTime(event.target.value)}>
        {time.map((times, index) => {
    return <option entryDate ={entryDate} key={index}>{times}</option>
     })}
        </select>
        <h4 className='create-form-heading'>Location of Drinks</h4>
        <input className='form-control' {...register("location", {required: true})} onChange={event => setLocation(event.target.value)}/>
        <h4 className='create-form-heading'>Invite Friends</h4>
        <input className='form-control' {...register("invited", {required: false})} onChange={event => setInvites (event.target.value)}/>
        <div className='create-button'>
          <button className='btn btn-dark' type='submit'>
            {' '}
            Submit{' '}
          </button>
          </div>
      </form>
      </ReactModal>
      <div>

        <Times/>
        <div className='todays-events-data'>
        </div>
        { eventsList.map(event => <TodayEvent event={event} key={event.name} />)}
        </div>
</div>

      )
    }


   export default eventCalendar




