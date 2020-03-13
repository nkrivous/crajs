import React, { useCallback, useState } from "react";

class MockRender extends React.PureComponent {
  render() {
    const { onRender, onClick } = this.props;
    onRender();
    return <>{onClick && <button onClick={onClick}>Click</button>}</>;
  }
}

export class BindInRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick() {
    this.setState(state => state.count + 1);
  }

  render() {
    const { onRender } = this.props;
    return (
      <MockRender onRender={onRender} onClick={this.handleClick.bind(this)} />
    );
  }
}

export class BindInConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => state.count + 1);
  }

  render() {
    const { onRender } = this.props;
    return <MockRender onRender={onRender} onClick={this.handleClick} />;
  }
}

export class ArrowFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState(state => state.count + 1);
  };

  render() {
    const { onRender } = this.props;
    return <MockRender onRender={onRender} onClick={this.handleClick} />;
  }
}

export function FunctionComponent({ onRender }) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count => count + 1);
  };
  return <MockRender onRender={onRender} onClick={handleClick} />;
}

export function FunctionComponentWithCallback({ onRender }) {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  return <MockRender onRender={onRender} onClick={handleClick} />;
}

export function FunctionComponentWithCallbackPrevState({ onRender }) {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count => count + 1);
  }, []);
  return <MockRender onRender={onRender} onClick={handleClick} />;
}
