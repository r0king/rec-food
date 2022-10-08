import React, { Component } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export class NewRecipie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      tagline: "",
      cookTime: 0,
      diff: "Easy",
      steps: "",
      incredients: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }
  handleSubmission = async () => {
    const recipe = {
      [this.state.heading]: {
        tagline: this.state.tagline,
        cook: this.state.cookTime,
        diff: this.state.diff,
        method: this.state.steps.split('\n'),
        ingredients: this.state.incredients.split('\n'),
      },
    };
    const docRef = doc(db, "food", "recipies")
    try{
        const response = await setDoc(docRef,recipe, { merge: true })
        window.location.pathname = process.env.PUBLIC_URL + '/home'

    }
    catch(e){
        alert(e)
        window.location.pathname = process.env.PUBLIC_URL + '/new'
    }
  };

  render() {
    return (
      <div className=" flex justify-center flex-col ">
        <h1 className="text-2xl md:text-4xl text-center m-4 ">
          Create new recipie
        </h1>
        <div className="form-control mx-[10vh] ">
          <label className="label mt-4 justify-right ">
            <span className="label-text ">Enter the Heading</span>
          </label>
          <label className="input lg:input-lg sm:input-sm input-xs md:input-md justify-left">
            <input
              name="heading"
              type="text"
              value={this.state.heading}
              onChange={this.handleInputChange}
              placeholder="Simple Pancake"
              className="input lg:input-lg md:input-md input-sm input-bordered "
            />
          </label>
          <label className="label mt-4 justify-right ">
            <span className="label-text ">Enter a tagline</span>
          </label>
          <label className="input lg:input-lg sm:input-sm input-xs md:input-md justify-left">
            <input
              name="tagline"
              type="text"
              value={this.state.tagline}
              onChange={this.handleInputChange}
              placeholder="north or west this pancake is the best"
              className="input lg:input-lg md:input-md input-sm input-bordered "
            />
          </label>
          <label className="label mt-4 justify-right ">
            <span className="label-text ">Enter Cook Time</span>
          </label>
          <label className="input lg:input-lg sm:input-sm input-xs md:input-md justify-left">
            <input
              name="cookTime"
              type="number"
              value={this.state.cookTime}
              onChange={this.handleInputChange}
              placeholder="25 min"
              className="input lg:input-lg md:input-md input-sm input-bordered "
            />
          </label>
          <label className="label mt-4 justify-right ">
            <span className="label-text ">Enter Difficulty</span>
          </label>
          <select
            name="diff"
            className="select md:mx-7 s
            value={this.state.diff}elect-primary md:select-lg w-full md:max-w-xs max-w-[70vw]"
            onChange={this.handleInputChange}
          >
            <option>Easy</option>
            <option>Hard</option>
            <option>Chef</option>
            <option>Mater Chef</option>
          </select>

          <label className="label mt-4 justify-right ">
            <span className="label-text ">
              Enter Steps to Make line by line
            </span>
          </label>
          <textarea
            name="steps"
            className="textarea textarea-bordered
            value={this.state.steps}a-primary"
            onChange={this.handleInputChange}
            placeholder="Start Stow
Brew Coffee"
          ></textarea>
          <label className="label mt-4 justify-right ">
            <span className="label-text ">Enter ingredients line by line</span>
          </label>
          <textarea
            name="incredients"
            className="textarea textarea-bordered
            value={this.state.incredients}a-primary"
            onChange={this.handleInputChange}
            placeholder="100g plain flour
2 large eggs"
          ></textarea>
          <button
            onClick={this.handleSubmission}
            className="my-20 btn btn-primary hover:btn-secondary active:btn-secondary btn-sm sm:btn-sm md:btn-md lg:btn-lg"
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default NewRecipie;
