import React, { useEffect, useState } from "react";
import './NewsGrid.css'

function NewEntry({ title, body, id }) {
  return (
    <div className='news-entry'>
      <p className='news-title'>{title}</p>
      <p className='news-teaser'>{body}</p>
      <div className="Date-Sentiment">
        <div className='news-date'>- August 23,2023 </div>
        <div className='sentiment-data'> Sentiment : Positive </div>
      </div>  
    </div>
  );
}


function NewsEntry() {

  const [posts, setPosts] = useState([]);

  const url = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  const numEntries = 6;
  return (
    <div>
      {posts.slice(0, Math.min(posts.length, numEntries)).map((post) => (
        <NewEntry
          key={post.id}
          title={post.title}
          body={post.body}
          date = {post.date}
          sentiment = {post.sentiment}
        />
      ))}
    </div>
  );
}

    

export default NewsEntry;