import React from "react";
import './NewsGrid.css'



function NewsTopics() {
    return(
        
            <div class= 'stats-entry'>
              <p class='stats-title'>TODAY'S STATS</p>
              <div class='stats-contents'>
                <p class='stats-subjects'>Sentiments:</p>
                <p class='stats-article'>
                  <span class='boldpart'> &#x2022;86%</span> of the news are <span class='boldpart'>negative</span>
                </p>
                <p class='stats-article'>
                  <span class='boldpart'> &#x2022;10%</span> of the news are <span class='boldpart'>neutral</span>    
                </p>
                <p class='stats-article'>
                  <span class='boldpart'> &#x2022;4%</span> of the news are <span class='boldpart'>positive</span>  
                </p>
              </div>  
            </div>
    );

}

export default NewsTopics;