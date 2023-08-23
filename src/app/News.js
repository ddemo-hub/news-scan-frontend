import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './News.css';

function News() {
    const navigate = useNavigate()
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

    const parseURL = () => (newsData.link === undefined) ? "" : new URL(newsData.link).hostname

    const parseSentiment = () => {
        if (newsData.sentiment === undefined) {
            return ""
        }

        const dominantSentiment = Object.keys(newsData.sentiment).reduce((a, b) => newsData.sentiment[a] > newsData.sentiment[b] ? a : b);

        return (
            <div>
                <span style={{color: "red", fontWeight: "bold"}}>{newsData.sentiment[dominantSentiment]}%</span> {dominantSentiment.charAt(0).toUpperCase() + dominantSentiment.slice(1)}
            </div>
        )
    }

    return (
        <div>
        
            <div className="newsgpt-header" style={{textAlign: "center"}}>
                NewsGPT
            </div>

            <div className="outer-div">

                <div className="title-and-hr-container">
                    <h1 className="title"> {title} </h1>
                    <div className="red-hr" /> 
                </div>

                <div className="link-and-sentiment">
                    <div className="link">
                        <a href={newsData.link}> {title} | ({parseURL()}) </a>
                    </div>
                    <div className="sentiment">
                        {parseSentiment()}
                    </div>
                </div>

                {
                    (newsData.body === undefined) ? "" : newsData.body.map((newsBody) => {
                        return (
                            <div className='news-body'>
                                {
                                    newsBody.split('. ').map((sentence) => {
                                        return (newsData.summary.includes(sentence)) ? <span><span style={{backgroundColor: "yellow"}}>{sentence}.</span> </span> : <span>{sentence}. </span>
                                    })
                                }
                            </div>    
                        )
                    })
                }

                <div style={{textAlign: "center"}}>
                    <button className='return-to-main' onClick={() => navigate("/brief")}> Main Page </button>
                </div>

            </div>

        </div>
    );
}

export default News;
