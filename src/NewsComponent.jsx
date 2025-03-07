import React, { useEffect, useState } from "react";
import "./NewsComponent.css";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("India");
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = "344bb499e2874144be5c61d6bb386273";
  const fromDate = "2025-02-0";
  const sortBy = "popularity";
  const language = "en";

  const fetchNews = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&sortBy=${sortBy}&language=${language}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, [query]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setQuery(searchTerm);
    }
  };

  return (
    <div className="news-container">
      <h1>📰 {query} News Hub</h1>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for news..."
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>
      <h2>Latest News on {query}</h2>
      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt="News" />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank">
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="no-news">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default NewsComponent;
