import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

import { doc, getDoc } from "firebase/firestore";
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class RecipieDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipie: {
        ingredients: [],
        method: [],
      },
      name: "",
    };
    this.recipie = this.props.params.recipie;
  }
  async componentDidMount() {
    const docRef = await doc(db, "food", "recipies");
    const docSnap = await getDoc(docRef);
    const recipies = docSnap.data();
    this.setState({ recipie: recipies[this.recipie], name: this.recipie });
  }
  componentDidUpdate() {}
  render() {
    return (
      <div>
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                <img
                  src={this.state.recipie.image}
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {this.state.name}
                </h1>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {this.state.recipie.tagline}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-sm">Difficulty: {this.state.recipie.diff}</h3>
                  <h3 className="text-sm">Time: {this.state.recipie.cook}</h3>
                  <h3 className="text-sm font-medium text-gray-900">
                    Incredients
                  </h3>
                  <div className="mt-4">
                    <ol
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {" "}
                      {this.state.recipie.ingredients.map((e) => {
                        return (
                          <li className="text-gray-400" >
                            <span className="text-gray-600">{e} </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Method</h3>
                  <div className="mt-4">
                    <ol
                      role="list"
                      className="list-decimal space-y-2 pl-4 text-sm"
                    >
                      {this.state.recipie.method.map((e) => {
                        return (
                          <li className="text-gray-400" >
                            <span className="text-gray-600">
                              {"  "}
                              {e}{" "}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      The 6-Pack includes two black, two white, and two heather
                      gray Basic Tees. Sign up for our subscription service and
                      be the first to get new, exciting colors, like our
                      upcoming "Charcoal Gray" limited release.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(RecipieDesc);
