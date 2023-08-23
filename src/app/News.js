import { useParams } from 'react-router-dom';

import './News.css';

function News() {
    const { title } = useParams(); 

    return (
    <div>
        News {title}
    </div>
);
}

export default News;
