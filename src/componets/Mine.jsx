import React, { Component } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipies: {},
      recipieCards: [],
      select: "",
    };
    this.auth = getAuth();
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
  handleDelete = async (e) => {
    console.log(e);
    alert("You are going to delete the " + e.target.id);
    const docRef = await doc(db, "food", "recipies");
    await updateDoc(docRef, {
      [e.target.id]: deleteField(),
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.recipies !== prevState.recipies) {
      let recipieCards = [];
      const recipies = this.state.recipies;
      for (let recipie in recipies) {
        if (recipies[recipie].owner === this.auth.currentUser.uid) {
          recipieCards.push(
            <div
              className="card w-96 bg-base-100 shadow-xl "
              htmlFor="my-modal-6"
              key={recipie}
            >
              {/* <a href={process.env.PUBLIC_URL + "/r/" + recipie}> */}
              <figure>
                <img
                  onClick={this.handleDelete}
                  src={recipies[recipie].image}
                  alt={recipie}
                  id={recipie}
                  className="hover:blur-lg hover:cursor-pointer"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Click card to DELETE</h2>
                <h2 className="card-title">
                  {recipie}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{recipies[recipie].tagline}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Beakfast</div>
                  <div className="badge badge-outline">
                    {recipies[recipie].diff}
                  </div>
                </div>
              </div>
              {/* </a> */}
            </div>
          );
        }
      }
      this.setState({
        recipieCards: recipieCards,
      });
    }
  }
  componentWillUnmount() {
    this.unsub();
  }
  render() {
    return (
      <div>
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              You will Be deleteing this recipe{" "}
            </h3>
            <p className="py-4">
              Alert! are you sure you need to delete this recipie
            </p>
            <div className="modal-action">
              <button htmlFor="my-modal-6" className="btn">
                Yes
              </button>
              <button htmlFor="my-modal-6" className="btn">
                No
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-[80vw] justify-center mx-[10vw] my-[5vh] flex-wrap gap-4">
          <div className="max-h-80 card w-96 bg-base-100 shadow-2xl flex fill-primary flex-col hover:fill-primary-focus justify-center hover:scale-110 z-10 py-[5vh] animate__animated hover:animate__bounce">
            <a href={process.env.PUBLIC_URL + "/new"}>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className=" w-1/2 m-auto fill-inherit "
              >
                <path
                  d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                  fillRule="nonzero"
                />
              </svg>
              <div className="card-body w-full ">
                <h2 className="card-title text-center justify-center">
                  Add your recipie
                </h2>
              </div>
            </a>
          </div>
          {this.state.recipieCards}
        </div>
      </div>
    );
  }
}

export default Mine;
