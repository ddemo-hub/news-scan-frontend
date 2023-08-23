import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './News.css';

function News() {
    const { title } = useParams()
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_NEWS_BY_TITLE_ENDPOINT}`,
            {
                method: "POST",
                body: JSON.stringify({title: title})
            }
        ).then((res) => res.json()).then((data) => setNewsData(data))
    }, [title])

    return (
        <div>
            <h1> {title} </h1>
            <p> {JSON.stringify(newsData)} </p>
        </div>
    );
}

export default News;
