import React from 'react'
import players from '../../fakePlayers';

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
                  <td className='border-0'>{index + 1}</td>
                  <td className='border-0'>
                    <div>
                      <div>
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
