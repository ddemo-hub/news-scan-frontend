import React from "react";
import './UserHeader.css'
import searchIcon from './icon_images/search-icon.svg'
import calendarIcon from './icon_images/calendar-icon.svg'

function UserHeader() {
    return (
     
    <header class="header">    
      <div class="left-section">
        NewsGPT

      </div>
      <div class="middle-section">
 
      </div>
      <div class="right-section">
        <button class='calendar-button'>
          <img class='calendar-icon' src={calendarIcon} alt=""></img>   
        </button>
        <div class='searchbox'>
          <button class='search-button'>
          <img class='search-icon' src={searchIcon} alt=""></img>
          </button>
          <input class= 'search-bar' type="text"></input>
        </div> 
      </div>          
    </header>
    


    );
}

export default UserHeader;