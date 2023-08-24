import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Briefing.css';

function Briefing() {
  const {date, keyword} = useParams();   
  const [briefingData, setBriefingData] = useState([])

  useEffect(() => {
    // If date is not specified, daily briefing will be displayed
    const postDate = (date === undefined) ? new Date() : date

    fetch(
        `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_BRIEFING_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({date: postDate, keyword: keyword})
        }
    ).then((res) => res.json()).then((data) => setBriefingData(data))
  }, [date, keyword])
 
  return (
    <div>
      <h6>{date}</h6> 
      <h6>{keyword}</h6>
      <p>Briefing {JSON.stringify(briefingData)}</p>
    </div>
  );
}

export default Briefing;
