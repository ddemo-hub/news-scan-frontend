import React from "react";
import './NewsGrid.css'



function NewsEntry() {
    return(
        <div class='news-entry'>
        <p class= 'news-title'>
          Icardi Trabzonspor'a 2 tane tıklattı
        </p>
        <p class='news-teaser'>
          Ünlü Arjantinli golcü Mauro Emmanuel Icardi Trabzonspor karşısında iki gol atarak, etkileyici bir performans sergiledi
        </p>
        <p class='news-date'>
          -August 23,2023
        </p>
      </div>
    );
}

export default NewsEntry;