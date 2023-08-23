import { useParams } from 'react-router-dom';

import './Briefing.css';

function Briefing() {
  const params = useParams(); 

  return (
    <div>
      Briefing {JSON.stringify(params)}
    </div>
  );
}

export default Briefing;
