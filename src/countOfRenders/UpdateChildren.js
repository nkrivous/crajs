import React, { useCallback, useState } from "react";

import { MockRender } from "./MockRender";

export class BindInRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick() {
    this.setState(state => ({ count: state.count + 1 }));
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
    this.setState(state => ({ count: state.count + 1 }));
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
    this.setState(state => ({ count: state.count + 1 }));
  };

  render() {
    const { onRender } = this.props;
    return <MockRender onRender={onRender} onClick={this.handleClick} />;
  }
}

export class RenderChildren extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  render() {
    const { onRender } = this.props;
    return this.props.children(onRender, this.handleClick);
  }
}

function Parent({ onClick, children }) {
  return <>{children}</>;
}

export class RenderChildrenInParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  render() {
    const { onRender } = this.props;
    const { count } = this.state;
    return (
      <Parent count={count}>
        <MockRender onRender={onRender} onClick={this.handleClick} />
      </Parent>
    );
  }
}

export class RenderChildrenInParentNewProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  render() {
    const { onRender } = this.props;
    const { count } = this.state;

    return (
      <Parent count={count}>
        <MockRender
          onRender={onRender}
          onClick={this.handleClick}
          count={count}
        />
      </Parent>
    );
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
