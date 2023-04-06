import React, {useState} from 'react';
import ReactModal from 'react-modal'
import Calendar from 'react-calendar';
import Times from './Time.jsx';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  location: yup.string().required()
});

function eventCalendar(){

  const [date, setDate] = useState(new Date())

  const [entryDate, setEntryDate] = useState(false);

  const [startTime, setStartTime] = useState('');

  const [endTime, setEndTime] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema)});

  const types = ['party', 'date drinks', 'business drinks', 'special occasion drinks', 'drinks with friends', 'holiday drinks', 'bar crawl drinks', 'just need an alone drink']

const onSubmit = (data) => {
axios.post('/routes/calendar/entries', {
name: data.name,
date: date,
type: data.type,
description: data.description,
startTime: data.startTime,
endTime: data.endTime,
invited: []
})
.then((data) =>{

  console.log('You have saved a calendar entry:', data);
})
.catch((err) => {
  console.error('failed to post calendar entry', err);
})
}



  const eventCreate = (Event) => {
  setIsOpen(true);


  }

  const eventList = (date) => {


 }


  return (
    <div className="calendar">
      <h4 className="header">Calendar</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} onClickDay={() => setEntryDate(true)}/>
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
  <button onClick={eventCreate}> Create an Event</button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        This is the content of the modal.
<form className='input-form ' onSubmit={handleSubmit(onSubmit)}>
        <h4 className='create-form-heading'>Name your event</h4>
        <input className='form-control' {...register("name", {required: true})} />
        <h4 className='create-form-heading'>Type of Event:</h4>
        <select>
          <option>none </option>
          {types.map((type, index) => {
            return <option type={type} key={index}>{type}</option>;
          })}
        </select>
        <h4 className='create-form-heading'>Details</h4>
        <input className='form-control' {...register("description", {required: true})} />
        <h4 className='create-form-heading'>Start Time</h4>
         <Times  entryDate={entryDate} date={date}/>
        <h4 className='create-form-heading'>End Time</h4>
          <Times entryDate={entryDate} date={date}/>
        <h4 className='create-form-heading'>Location</h4>
        <input className='form-control' {...register("location", {required: true})} />
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




