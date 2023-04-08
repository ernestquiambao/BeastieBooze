import React, {useState} from "react";
import axios from 'axios';




function TodayEvent({ event }){





return (

    <div className="today-event-entry">
    <ul className="today-event-data-list">
    <li className="today-event-data">{event.name}</li>
    <li className="today-event-data">{event.date}</li>
    <li className="today-event-data">{event.type}</li>
    <li className="today-event-data">{event.description}</li>
    <li className="today-event-data">{event.startTime}</li>
    <li className="today-event-data">{event.endTime}</li>
    <li className="today-event-data">{event.location}</li>
    <li className="today-event-data">{event.invites}</li>
    </ul>
  </div>

)

}


export default TodayEvent;