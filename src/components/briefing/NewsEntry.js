import React, { useState } from 'react'
import parse, { domToReact } from 'html-react-parser';

import './NewsEntry.css'

function NewsEntry(props) {

	const [titleIndex, setTitleIndex] = useState(0);

	const parseOptions = {
		replace: ({ attribs, children }) => {
			if (!attribs) {
				return;
			}

			if (attribs.class === 'entity') {
				return (
					<span className='entry-entity'>
						<mark style={{background: attribs.style.substring(12, 19), padding: "0.45em 0.6em", margin: "0 0.25em", lineHeight: "1", borderRadius: "0.35em"}}>
							{domToReact(children, parseOptions)}
						</mark>
						<span className='chatgpt-exp'>
							{props.chatgptExplanations[children[0].data]}
						</span>
					</span>
				)
			}
		}
	}

	const titles = [
		(
			<h1 className='entry-title'>{props.title}</h1>
		),
		(
			<h1 className='ner-entry-title'>{parse(props.namedEntities, parseOptions)}</h1>
		)
	]
	
	return (
		<div>
			
			<div onClick={ () => {setTitleIndex(prevState => (prevState + 1) % 2)} }>
				{titles[titleIndex]}
			</div>
			
			<p className='entry-link'>
				({new URL(props.link).hostname})
			</p>

			<p className='entry-teaser' onClick={(event) => props.navigator(`/news/${props.title}`)}>
				{props.teaser}
			</p>

			<p className='entry-publish-date'>
				&emsp;- {props.publish_date}
			</p>

			<div className='entry-seperator' />
			
		</div>
	)
}

export default NewsEntry