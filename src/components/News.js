import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  constructor(props) {
    super(props);
    console.log("Hello"); //runs before render
    this.state = { articles: [], loading: true, page: 1, totalResults: 0 };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- Daily news App`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=639114f0ae0c4ba1a6b64a2e9135e4b1&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   articles: parsedData.articles,
    //   totalArticles: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  } //lifecycle method , will run after render method

  //handleNextClick = async () => {
  // if (
  //   !(
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   )
  // ) {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=639114f0ae0c4ba1a6b64a2e9135e4b1&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // }
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };
  async updateNews(pageNo) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=639114f0ae0c4ba1a6b64a2e9135e4b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  // handlePreviousClick = async () => {
  // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   this.props.country
  // }&category=${
  //   this.props.category
  // }&apiKey=639114f0ae0c4ba1a6b64a2e9135e4b1&page=${
  //   this.state.page - 1
  // }&pageSize=${this.props.pageSize}`;
  // this.setState({ loading: true });
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false,
  // });
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=639114f0ae0c4ba1a6b64a2e9135e4b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
    });
  };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "32px 0px " }}>
            Daily News - Top Headlines from{" "}
            {this.capitalizeFirstLetter(this.props.category)}
          </h1>
          {/* {this.state.loading && <Spinner />} */}

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
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
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          />
          {/* <div className="container">
            <div className="d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-info"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="btn btn-info"
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
              >
                Next &rarr;
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default News;
