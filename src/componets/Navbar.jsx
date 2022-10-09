import React, { Component } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      foundList: [],
    };
    this.result = React.createRef();
    this.auth = getAuth();
  }
  componentDidMount() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (window.location.pathname === process.env.PUBLIC_URL) {
          window.location.pathname = process.env.PUBLIC_URL + "/home";
        }
      } else {
        // if (window.location.pathname !== process.env.PUBLIC_URL)
        //   window.location.pathname = process.env.PUBLIC_URL;
      }
    });
  }
  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  handleLogOut = () => {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.foundList !== this.state.foundList) {
      this.result.current.classList.remove("hidden");
    }
  }
  onSearch = async (e) => {
    e.preventDefault();
    const docRef = await doc(db, "food", "recipies");
    const docSnap = await getDoc(docRef);
    const recipies = docSnap.data();
    const searchQ = this.state.search;
    const regexp = new RegExp(".*" + searchQ + ".*", "gi");
    let foundList = [];
    for (let recipe in recipies) {
      const tagline = [...recipies[recipe].tagline.matchAll(regexp)];
      const incredients = recipies[recipe].ingredients.join();
      const incredientsR = [...incredients.matchAll(regexp)];
      const heading = [...recipe.matchAll(regexp)];
      if (tagline.length || heading.length || incredientsR.length) {
        console.log(incredientsR);
        foundList.push(
          <div
            className="card h-full max-w-[300px] bg-base-100 shadow-xl"
            key={recipe}
          >
            {" "}
            <a href={process.env.PUBLIC_URL + "/r/" + recipe}>
              <figure>
                <img src={recipies[recipe].image} alt={recipe} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {recipe}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{recipies[recipe].tagline}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Beakfast</div>
                  <div className="badge badge-outline">
                    {recipies[recipe].diff}
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      }
    }
    this.setState({
      foundList: foundList,
    });
  };
  render() {
    return (
      <>
        <div className="navbar ">
          <div className="flex-1">
            <a href={process.env.PUBLIC_URL +"/home"} className="btn btn-ghost normal-case text-xl">
              RecFood
            </a>
          </div>
          <div className="flex-none gap-2">
            <form
              onSubmit={this.onSearch}
              className="form-control flex flex-row"
            >
              <input
                value={this.state.search}
                onChange={this.handleSearchChange}
                type="text"
                placeholder="Search"
                className="input input-bordered max-w-[50vw] overflow-x-hidden"
              />
              <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="profile" src="https://placeimg.com/80/80/random" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52"
              >
                <li>
                  <a href={process.env.PUBLIC_URL+"/me"}>
                    Your Recipies
                  </a>
                </li>
                <li>
                  <a href="#home" onClick={this.handleLogOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          ref={this.result}
          className="hidden flex w-[90vw] justify-center mx-[10vw] my-[2vh]  flex-wrap gap-4"
        >
          {this.state.foundList}
        </div>
      </>
    );
  }
}

export default Navbar;
