import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./Hero";
import DashBoard from "./DashBoard";
import NewRecipie from "./NewRecipie";
import RecipieDesc from "./RecipieDesc";
import Mine from "./Mine";

export class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/new" element={<NewRecipie />} />
          <Route path="/me" element={<Mine />} />
          <Route path="/home" element={<DashBoard />} />
          <Route path="/r/:recipie" element={<RecipieDesc />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
