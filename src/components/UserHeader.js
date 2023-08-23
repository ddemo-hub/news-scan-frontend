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
        <button class='calendar-button'>
          <img class='calendar-icon' src={calendarIcon}></img>   
        </button>
        <div class='searchbox'>
          <button class='search-button'>
          <img class='search-icon' src={searchIcon}></img>
          </button>
          <input class= 'search-bar' type="text"></input>
        </div>  
      </div>
      <div class="right-section">
        <button class = "per-button">PER</button>
        <button class = "loc-button">LOC</button>
        <button class = "org-button">ORG</button>
        <button class = "misc-button">MISC</button>
      </div>          
    </header>


    );
}

export default UserHeader