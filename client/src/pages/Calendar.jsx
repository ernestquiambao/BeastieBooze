import React, {useState} from 'react';
import ReactModal from 'react-modal'
import Calendar from 'react-calendar';
//import Times from './Time.jsx';
import { useForm } from 'react-hook-form'
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment';

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   type: yup.string().required(),
//   description: yup.string().required(),
//   startTime: yup.string().required(),
//   endTime: yup.string().required(),
//   location: yup.string().required()
// });
const time = []


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

  const [currDate, setDate] = useState(new Date())

  const [eventDate, setEventDate] = useState(moment().format("YYYY-MM-DD"))

  const [entryDate, setEntryDate] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const [eventsList, setEventsList] = useState('');

  const types = ['party', 'date drinks', 'business drinks', 'special occasion drinks', 'drinks with friends', 'holiday drinks', 'bar crawl drinks', 'just need an alone drink']

console.log(currDate);





  const eventCreate = () => {
    setIsOpen(true);
  }

  const onSubmit = data => {
    axios.post('/routes/calendar/events', data)
      .then((data) => {
        console.log('You have saved a calendar entry:', data);
      })
      .then(alert('You have saved an event for:', data.date))
      .then(setIsOpen(false))
      .catch((err) => {
        console.error('failed to post calendar entry', err);
      })
  }

  const handleEventDate = (newDate) =>{
    setEventDate(newDate);
    }




    const eventList = () => {
    axios.get(`routes/calendar/events/${currDate}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error('unable to get calendar day', err);
    })
}




  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={currDate} onClickDay={() => setEntryDate(true)}/>
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
     <span>Default selected date:</span>{currDate.toDateString()}
  </p>
         )
  }
  <button onClick={eventCreate}> Create an Event</button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        This is the content of the modal.
<form className='input-form ' onSubmit={handleSubmit(onSubmit)}>
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
        <input className='form-control' {...register('name')} />
        <h4 className='create-form-heading'>Type of Event:</h4>
        <select className='form-control' {...register('type')}>
          <option>none </option>
          {types.map((type, index) => {
            return <option type={type} key={index}>{type}</option>;
          })}
        </select>
        <h4 className='create-form-heading'>Details</h4>
        <input className='form-control' {...register("description", {required: true})} />
        <h4 className='create-form-heading'>Start Time</h4>
        <select className='form-control' {...register('startTime')}>
        {time.map((times, index) => {
    return <option entryDate ={entryDate} key={index}>{times}</option>
     })}
        </select>
        <h4 className='create-form-heading'>End Time</h4>
        <select className='form-control' {...register('endTime')}>
        {time.map((times, index) => {
    return <option entryDate ={entryDate} key={index}>{times}</option>
     })}
        </select>
        <h4 className='create-form-heading'>Location of Drinks</h4>
        <input className='form-control' {...register("location", {required: true})} />
        <h4 className='create-form-heading'>Invite Friends</h4>
        <input className='form-control' {...register("invited", {required: false})} />
        <div className='create-button'>
          <button className='btn btn-dark' type='submit'>
            {' '}
            Submit{' '}
          </button>
          </div>
      </form>
      </ReactModal>
      <div>
        <button onClick={eventList}> Show Today's Events </button>


        </div>
</div>

      )
    }


   export default eventCalendar




