import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NewsGPTHeader from '../components/NewsGPTHeader';
import Navbar from '../components/briefing/Navbar';
import TrendEntry from '../components/briefing/TrendEntry'
import './Briefing.css';

function Briefing() {
    const navigate = useNavigate();
	const {query} = useParams();
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
						
						<TrendEntry trendHead="Trending Topics" points={(briefingData.trends === undefined) ? [] : briefingData.trends.trending_topics} navigator={navigate} />
						<TrendEntry trendHead="Popular People & Groups" points={(briefingData.trends === undefined) ? [] : briefingData.trends.people_and_groups} navigator={navigate} />
						<TrendEntry trendHead="Popular Firms" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_firms} navigator={navigate} />
						<TrendEntry trendHead="Popular Places" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_places} navigator={navigate} />
						<TrendEntry trendHead="Popular Products" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_products} navigator={navigate} />
						<TrendEntry trendHead="Hot Events" points={(briefingData.trends === undefined) ? [] : briefingData.trends.popular_events} navigator={navigate} />
					</div>

					<div className='news'>
						News
					</div>

					<div className='stats'>
						Stats
					</div>
				</div>

			</div>

		</div>
	);
}

export default Briefing;
