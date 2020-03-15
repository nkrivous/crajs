import React from "react";

export class MockRender extends React.PureComponent {
  render() {
    const { onRender, onClick } = this.props;
    onRender();
    return <>{onClick && <button onClick={onClick}>Click</button>}</>;
  }
}
