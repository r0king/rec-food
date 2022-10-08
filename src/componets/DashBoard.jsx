import React, { Component } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipies: {},
      recipieCards: [],
    };
  }
  componentDidMount() {
    this.unsub = onSnapshot(doc(db, "food", "recipies"), async (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      this.recipies = await doc.data();
      this.setState({
        recipies: this.recipies,
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.recipies !== prevState.recipies) {
      let recipieCards = [];
      const recipies = this.state.recipies;
      for (let recipie in recipies) {
        recipieCards.push(
          <div className="card w-96 bg-base-100 shadow-xl" key={recipie}>
            <figure>
              <img src="https://placeimg.com/400/225/arch" alt={recipie} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {recipie}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>{recipies[recipie].tagline}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Beakfast</div>
                <div className="badge badge-outline">Easy</div>
              </div>
            </div>
          </div>
        );
      }
      this.setState({
        recipieCards: recipieCards,
      });

      console.log(this.state, prevState);
    }
  }
  componentWillUnmount() {
    this.unsub();
  }
  render() {
    return (
      <div>
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://placeimg.com/800/200/arch"
              alt=""
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://placeimg.com/800/200/arch"
              alt=""
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://placeimg.com/800/200/arch"
              alt=""
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://placeimg.com/800/200/arch"
              alt=""
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-[80vw] justify-center mx-[10vw] my-[5vh] flex-wrap gap-4">
          <div className="card w-96 bg-base-100 shadow-2xl flex flex-col justify-center">
            <button>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className=" w-1/2 m-auto fill-primary hover:fill-primary-focus"
              >
                <path
                  d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
            <div className="card-body w-full h-3/4">
              <h2 className="card-title text-center justify-center">
                    Add your recipie
              </h2>
            </div>
          </div>
          {this.state.recipieCards}
        </div>
      </div>
    );
  }
}

export default DashBoard;
