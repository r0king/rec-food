import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./Hero";
import DashBoard from "./DashBoard";
import NewRecipie from "./NewRecipie";

export class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/home" element={<DashBoard />} />
          <Route path="/new" element={<NewRecipie />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
