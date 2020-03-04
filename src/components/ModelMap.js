import React from "react";

const initialState = [
  [1, "one"],
  [2, "two"],
  [3, "three"]
];

export class ModelMap extends React.Component {
  state = {
    model: new Map(initialState)
  };

  edit = key => {
    this.setState(state => {
      state.model.set(key, "new value");
      return { model: state.model };
    });
  };

  render() {
    const { model } = this.state;
    return (
      <div>
        {initialState.map(x => {
          const [key, value] = x;
          return (
            <div key={key} onClick={() => this.edit(key)}>
              {model.get(key)}
            </div>
          );
        })}
      </div>
    );
  }
}
