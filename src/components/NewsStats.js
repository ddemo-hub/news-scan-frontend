import React from "react";
import './NewsGrid.css'


function NewsStats() {
    return(
    <div class= 'stats-entry'>
    <p class='stats-title'>TODAY'S TRENDS</p>
    <div class='stats-contents'>
      <p class='stats-subjects'>Trending topics:</p>
      <p class='stats-article'>&#x2022; Transfer Çalımı</p>
      <p class='stats-article'>&#x2022; Futbol</p>
    </div>  
    <div class='stats-contents'>
      <p class='stats-subjects'>Popular People:</p>
      <p class='stats-article'>&#x2022; Icardi</p>
      <p class='stats-article'>&#x2022; Wanda Nara</p>
    </div>  
    <div class='stats-contents'>
      <p class='stats-subjects'>&#x2022; Popular Organizations:</p>
      <p class='stats-article'>&#x2022; Trabzonspor</p>
      <p class='stats-article'>&#x2022; Salatasaray</p>
    </div>  
  </div>
    );

}

export default NewsStats;