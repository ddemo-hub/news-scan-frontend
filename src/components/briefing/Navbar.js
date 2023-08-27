import React from 'react'

import searchIcon from '../icon_images/search-icon.svg'
import calendarIcon from '../icon_images/calendar-icon.svg'

import "./Navbar.css"

function Navbar(props) {

    return (

        <div className="navbar">

            {
                (props.briefingType === "daily") ?
                    <h1 className="briefing"> Daily Brief </h1> :
                    (props.briefingType === "date") ?
                        <h1 className="briefing"> Briefing for <span style={{fontStyle: "italic"}}>{new Date(props.briefingFor).toLocaleString('en-US', {day:'numeric', month: 'long', year: 'numeric'})}</span></h1> :
                        <h1 className="briefing"> Briefing for <span style={{fontStyle: "italic"}}>{props.briefingFor} </span></h1>
            }

            <div>
                <button className='calendar-button'>
                    <img className='calendar-icon' src={calendarIcon} alt=""></img>   
                </button>

                <input type="date" className='date-input' max={new Date().toJSON().slice(0, 10)} onChange={ event => props.navigator(`/brief/${event.target.value}`) } />
            </div>

            <div>
                <input type="text" class="keyword" onKeyDown={ (event) => { if (event.key === "Enter") {props.navigator(`/brief/${event.target.value}`)} } }/>
            </div>

            <div className="black-hr" /> 

        </div>

    )
    
}

export default Navbar