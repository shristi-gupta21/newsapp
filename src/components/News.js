import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(0);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    // document.title = `${this.capitalizeFirstLetter(
    //   props.category
    // )}- Daily news App`;
    updateNews();
  }, []);//[]- 

  const updateNews = async (pageNo) => {
    props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    props.setprogress(30);
    console.log("data" , data);
    let parsedData = await data.json();

    props.setprogress(70);
    console.log("parse",parsedData);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);

    props.setprogress(100);
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

  return (
    <div>
      <div className="container my-3">
        <h1
          className="text-center"
          style={{ margin: "32px 0px ", marginTop: "90px" }}
        >
          Daily News - Top Headlines from{" "}
          {capitalizeFirstLetter(props.category)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}

        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  author={element.author}
                  date={element.publishedAt}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        />
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;
