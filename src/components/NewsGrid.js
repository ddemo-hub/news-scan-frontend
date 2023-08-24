import React from "react";
import './NewsGrid.css'
import NewsStats from "./NewsStats"
import NewsEntry from "./NewsEntry"
import NewsTopics from "./NewsTopics";

function NewsGrid() {
    return(
        <div class='NewsGrids'>
          <div class='left-part'>

            <NewsStats />
          
          </div>

          
    
          <div class='middle-part'>
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
            <NewsEntry />
          </div>
          <div class='right-part'>
            <NewsTopics />

            
          </div>  
        </div>

    );


}

export default NewsGrid;