import React from "react";

const initialState = [
  [1, "one"],
  [2, "two"],
  [3, "three"]
];

export class RendersMapObject extends React.PureComponent {
  constructor(props) {
    super(props);
    this.editArray = this.editArray.bind(this);
  }
  state = {
    modelMap: new Map(initialState),
    modelArray: [...initialState]
  };

  editMap = key => () => {
    this.setState(state => {
      state.modelMap.set(key, "new value");
      return { modelMap: new Map(state.modelMap) };
    });
  };

  editArray = function(event) {
    const key = +event.target.getAttribute("data-key");
    this.setState(state => {
      const item = state.modelArray.find(item => item[0] === key);
      item[1] = "new value";
      return { modelArray: state.modelArray };
    });
  };

  render() {
    const { modelMap, modelArray } = this.state;
    return (
      <div>
        <h2>Map:</h2>
        {initialState.map(x => {
          const [key, value] = x;
          return (
            <div key={key} onClick={this.editMap(key)}>
              {modelMap.get(key)}
            </div>
          );
        })}
        <h2>Array from initialState:</h2>
        {initialState.map(x => {
          const [key, value] = x;
          return (
            <div key={key} data-key={key} onClick={this.editArray}>
              {modelArray.find(item => item[0] === key)[1]}
            </div>
          );
        })}
        <h2>Array:</h2>
        {modelArray.map(x => {
          const [key, value] = x;
          return (
            <div key={key} data-key={key} onClick={this.editArray}>
              {value}
            </div>
          );
        })}
      </div>
    );
  }
}
