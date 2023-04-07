import React from 'react'
import players from '../../fakePlayers';
/*
NOTES for leaderboard

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Part 1:
axios GET request will be inside of useEffect so that we are rendering on refresh?

Handle a get request from database to capture =>
username: "Teddy"

This username will be used to dynamically update the database.

We also want to somehow capture the score at the end of the player playing the game 
(POINTS TO PART 2)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Part 2:
Send a post request at the end of the user playing the quiz =>

This will be a function that runs at the end of playing the quiz, on reset

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DATABASE IDEAs:
* might want to capture the google profile image on login, so that we can add it to leaderboard *

* want to display the top 10 high scores of users* => requires AMENDING MODELS

*/

export default function LeaderBoard() {
  return (
    <div>
    <div className='card'>
      <div className='card-body'>
        <table className='table table-borderless'>
          <col style={{ width: '10%' }} />
          <col style={{ width: '80%', textAlign: 'center' }} />
          <col style={{ width: '10%' }} />
          <tbody>
            {players.map((player, index) => {
              return (
                <tr>
                  <td className='border-0'> <b>{index + 1 === 1 ? "1st" : index + 1 === 2 ? "2nd" : index + 1 === 3 ? "3rd" : index + 1 + 'th'}</b></td>
                  <td className='border-0'>
                    <div className='d-flex'>
                    <div>
                      <img src={player.imgSrc}  style={{width: '50px', height: '40px'}} alt="image-thumbnail" />
                        <span>
                          {player.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='border-0'>
                    <b>{player.score }</b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
