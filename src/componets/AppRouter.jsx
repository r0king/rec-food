import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./Hero";
import DashBoard from "./DashBoard";

export class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/ex" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
