import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NewsGPTHeader from '../components/NewsGPTHeader';
import Navbar from '../components/briefing/Navbar';
import TrendEntry from '../components/briefing/TrendEntry'
import NewsEntry from '../components/briefing/NewsEntry';

import './Briefing.css';

function Briefing() {
    const navigate = useNavigate();
	const {query = "daily"} = useParams();
	const [briefingData, setBriefingData] = useState({
		news: undefined,
        trends: undefined,
        stats: undefined
	});

	useEffect(() => {
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_BRIEFING_ENDPOINT}`,  // Contruct the URL using the environment variables
            {
                method: "POST",
                body: JSON.stringify({query: query})    
            }
        )
        .then((res) => res.json())
        .then((data) => setBriefingData(data))
	}, [query]);

	const getBriefingType = () => {
        if (query === "daily" || query === new Date().toJSON().slice(0, 10)) {
            return "daily"
        } 

        const queryDate = new Date(query)
        if (queryDate instanceof Date && !isNaN(queryDate.valueOf())) {
            return "date"
        }

        return "keyword"
    }

	return ( 
		<div>
			<NewsGPTHeader />

			<div className='briefing-outer-div'>
				<Navbar briefingFor={query} briefingType={getBriefingType()} navigator={navigate}/>

				<div className="flex-display">
					<div className='trends'>
						{
							(getBriefingType() === "daily") ?
								<h1 className="trends-h1">Today's Trends</h1> :
								(getBriefingType() === "date") ?
									<h1 className="trends-h1">Trends for <span style={{fontStyle: "italic"}}>{new Date(query).toLocaleString('en-US', {day:'numeric', month: 'long', year: 'numeric'})}</span></h1>:
									<h1 className="trends-h1"><span style={{fontStyle: "italic"}}>{query}'s</span> Trends</h1>
						}
						<div style={{borderBottomColor: "black", borderBottomWidth: "4px", borderBottomStyle: "solid", width: "90%"}} />
						
						<div style={{marginTop: "25%"}}/>

						<TrendEntry trendHead="Trending Topics" points={(briefingData.trends === undefined) ? [] : briefingData.trends.trending_topics} navigator={navigate} />
						<TrendEntry trendHead="Popular People & Groups" points={(briefingData.trends === undefined) ? [] : briefingData.trends.people_and_groups} navigator={navigate} />
						<TrendEntry trendHead="Popular Firms" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_firms} navigator={navigate} />
						<TrendEntry trendHead="Popular Places" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_places} navigator={navigate} />
						<TrendEntry trendHead="Popular Products" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_products} navigator={navigate} />
						<TrendEntry trendHead="Hot Events" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_events} navigator={navigate} />
					</div>

					<div className='news'>			
{/*
						<h1 className="trends-h1" style={{textAlign: "center"}}>News</h1>
						<div style={{borderBottomColor: "black", borderBottomWidth: "4px", borderBottomStyle: "solid", width: "100%", paddingBottom: "3.5%", marginBottom: "12.5%"}} />
*/}
						{
							(briefingData.news === undefined) ? "" : briefingData.news.map((entry, index) => {
								return <NewsEntry 
									key={index} 
									title={entry.title} 
									link={entry.link} 
									teaser={entry.teaser} 
									publish_date={entry.publish_date} 
									namedEntities={entry.ner_highlightings} 
									chatgptExplanations={entry.chatgpt_explanations}
									navigator={navigate} 
								/>
							})
						}

					</div>

					<div className='stats'>
						{
							(getBriefingType() === "daily") ?
								<h1 className="trends-h1">Today's Stats</h1> :
								(getBriefingType() === "date") ?
									<h1 className="trends-h1">Stats for <span style={{fontStyle: "italic"}}>{new Date(query).toLocaleString('en-US', {day:'numeric', month: 'long', year: 'numeric'})}</span></h1>:
									<h1 className="trends-h1"><span style={{fontStyle: "italic"}}>{query}'s</span> Stats</h1>
						}
						<div style={{borderBottomColor: "black", borderBottomWidth: "4px", borderBottomStyle: "solid", width: "90%"}} />
						
						<div style={{marginTop: "25%"}}/>

						{
							(briefingData.stats === undefined) ? "" : 
							<div>
								<h1 className='trend-head'>Sentiments:</h1>	
								<ul style={{paddingLeft: "7.5%"}}>
									<li><span style={{fontWeight: "bold"}}>{briefingData.stats.sentiment.positive.toFixed(2)}%</span> news are <span style={{fontWeight: "bold"}}>positive</span></li>
									<li><span style={{fontWeight: "bold"}}>{briefingData.stats.sentiment.neutral.toFixed(2)}%</span> news are <span style={{fontWeight: "bold"}}>neutral</span></li>
									<li><span style={{fontWeight: "bold"}}>{briefingData.stats.sentiment.negative.toFixed(2)}%</span> news are <span style={{fontWeight: "bold"}}>negative</span></li>
								</ul>
								<div className='seperator' />	
							</div>
						}

					</div>
				</div>

			</div>

		</div>
	);
}

export default Briefing;
