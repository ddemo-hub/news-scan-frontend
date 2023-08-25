import './Briefing.css';

import React from 'react';

import UserHeader from '../components/UserHeader';
import NewsGrid from '../components/NewsGrid'

function Briefing() {
  return (
  <body>   
    <div><UserHeader /></div>
    <div><NewsGrid /></div>
  </body> 
  );
}

export default Briefing;
