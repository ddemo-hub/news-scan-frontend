import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './News.css';

function News() {
    const navigate = useNavigate()
    const { title } = useParams()
    const [newsData, setNewsData] = useState({
        body: undefined,        // The body of the new:                     (list[str]) every element in the list is a new paragraph
        link: undefined,        // Link to the original source of the new:  (str)
        sentiment: undefined,   // The sentiment analysis of the new :      (dict[str:float]) a dictionary in the format of {positive: pos, neutral: neu, negative: neg} where pos + neu + neg = 1.0
        summary: undefined,     // The summary of the new's body:           (str)
    })

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_NEWS_BY_TITLE_ENDPOINT}`,  // Contruct the URL using the environment variables
            {
                method: "POST",
                body: JSON.stringify({title: title})    // Fetch the news data from the API by inputting the news' title
            }
        )
        .then((res) => res.json())
        .then((data) => setNewsData(data))
    }, [title]) // Re-send the request only if the title changes

    const parseSentiment = () => {
        if (newsData.sentiment === undefined) {
            return ""
        }

        const dominantSentiment = Object.keys(newsData.sentiment).reduce((a, b) => newsData.sentiment[a] > newsData.sentiment[b] ? a : b);

        return (
            <div>
                <span style={{color: "red", fontWeight: "bold"}}>{newsData.sentiment[dominantSentiment] * 100}% </span> 
                {dominantSentiment.charAt(0).toUpperCase() + dominantSentiment.slice(1)}
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
                        <a href={newsData.link}> {title} | ({(newsData.link === undefined) ? "" : new URL(newsData.link).hostname}) </a>
                    </div>
                    <div className="sentiment">
                        {parseSentiment()}
                    </div>
                </div>

                {
                    (newsData.body === undefined) ? "" : newsData.body.map((paragraphBody, pi) => {     // For every paragraph in the body
                        const paragraphSentences = paragraphBody.split(/(?<=[.!?])\s+/);    
                        const summarySentences = newsData.summary.split(/(?<=[.!?])\s+/);  

                        return (
                            <div key={pi} className='news-body'>
                                {
                                    paragraphSentences.map((sentence, si) => {          // For every sentence in the paragraph
                                        return (
                                            (summarySentences.includes(sentence)) ?     // Check if the sentence is present in the summary  
                                            <span key={`${pi}-${si}`}><span key={`${pi}-${si}-in`} class="summary">{sentence}</span> </span> : // If the sentence is present in the summary, highlight it
                                            <span key={`${pi}-${si}`}>{sentence} </span> // If the sentence is not present in the summary, do not highlight it
                                        )
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
