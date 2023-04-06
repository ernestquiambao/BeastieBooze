import React, { useState} from 'react';
import moment from 'moment';



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

function Times({entryDate}) {




return (

 <div className="times">
  <select>
   {time.map((times, index) => {
    return <option entryDate ={entryDate} key={index}>{times}</option>
     })}
    </select>
 </div>
  )
}

 export default Times;