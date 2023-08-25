import React from "react";
import './NewsGrid.css'
import NewsStats from "./NewsStats"
import NewsEntry from "./NewsEntry"
import NewsTopics from "./NewsTopics";

function NewsGrid() {
    return(
        <div class='NewsGrids'>
          <div class='left-part'>
            
            <NewsTopics />
          
          </div>              
          <div class='middle-part'>
            <NewsEntry />

          </div>
          <div class='right-part'>
            
            <NewsStats />          
          </div>  
        </div>

    );


}

export default NewsGrid;