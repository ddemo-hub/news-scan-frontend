import React from 'react'

import './TrendEntry.css'

function Trends(props) {
    return (
        <div className='trend-entry'>
            
            <h1 className='trend-head'>{props.trendHead}:</h1>
            
            <ul style={{paddingLeft: "7.5%"}}>
                {
                    props.points.map((point) => {
                        return <li className='trend-list-item' key={point} onClick={(event) => {props.navigator(`/brief/${event.target.innerText}`)}}>{point}</li>
                    })
                }
            </ul>
            
            <div className='seperator' />

        </div>
    )
}

export default Trends