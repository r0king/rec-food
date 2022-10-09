import React, { Component } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export class Hero extends Component {
  componentDidMount() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
  }
  handleLogin = () => {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        window.location.pathname = process.env.PUBLIC_URL + "/home";
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  render() {
    return (
      <div
        className="hero min-h-screen bg-base-200 bg-cover bg-blend-overlay "
        style={{
          backgroundImage: `url("https://source.unsplash.com/hrlvr2ZlUNk/")`,
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Search through the most delicious and awsome food recipies
              available in seconds
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button onClick={this.handleLogin} className="btn btn-primary">
                  Google Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
