import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends Component {
  pageSize=5;
  render() {
    //lifecycle method

    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/business"
              element={<News pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              exact
              path="/"
              element={<News pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              exact
              path="/sports"
              element={<News pageSize={this.pageSize} country="in" category="sports" />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News pageSize={this.pageSize} country="in" category="entertainment" />
              }
            />
            <Route
              exact
              path="/health"
              element={<News pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News pageSize={this.pageSize} country="in" category="science" />}
            />
            <Route
              exact
              path="/general"
              element={<News pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              exact
              path="/technology"
              element={<News pageSize={this.pageSize} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
