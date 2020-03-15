import React, { useState } from "react";
import ReactDOM from "react-dom";

export class UpdateClassStateInLifeCycle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  componentDidMount() {
    this.setState({ name: "B" });
    this.setState({ name: "C" });
  }

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
      </>
    );
  }
}

export class UpdateClassStateInReactHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  handleClick = () => {
    this.setState(state => ({ name: "B" }));
    this.setState(state => ({ name: "C" }));
  };

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export class UpdateClassStateInLifeCyclePromise extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  componentDidMount() {
    Promise.resolve().then(x => {
      this.setState(state => ({ name: "B" }));
      this.setState(state => ({ name: "C" }));
    });
  }

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
      </>
    );
  }
}

export class UpdateClassStateInPromise extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  handleClick = () => {
    this.setState({ name: "B" });
    this.setState({ name: "C" });
    Promise.resolve().then(x => {
      this.setState(state => ({ name: "D" }));
      this.setState(state => ({ name: "E" }));
    });
    this.setState({ name: "F" });
    this.setState({ name: "G" });
  };

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export class UpdateClassStateInAsyncFn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  handleClick = async () => {
    this.setState(state => ({ name: "B" }));
    this.setState(state => ({ name: "C" }));
    try {
      await Promise.resolve();
      this.setState(state => ({ name: "D" }));
      this.setState(state => ({ name: "E" }));
    } catch (e) {}
    this.setState(state => ({ name: "F" }));
    this.setState(state => ({ name: "G" }));
  };

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export class UpdateClassStateInPromiseBatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  handleClick = () => {
    this.setState(state => ({ name: "B" }));
    this.setState(state => ({ name: "C" }));
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        this.setState(state => ({ name: "D" }));
        this.setState(state => ({ name: "E" }));
      });
    });
  };

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export class UpdateClassStateInAsyncFnBatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "A"
    };
  }

  handleClick = async () => {
    this.setState(state => ({ name: "B" }));
    this.setState(state => ({ name: "C" }));
    await Promise.resolve();
    ReactDOM.unstable_batchedUpdates(() => {
      this.setState(state => ({ name: "D" }));
      this.setState(state => ({ name: "E" }));
    });
  };

  render() {
    const { onRender } = this.props;
    const { name } = this.state;
    onRender(name);
    return (
      <>
        <div data-testid="name">{name}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export function UpdateFunctionInAsyncFn({ onRender }) {
  const [name, setName] = useState("A");

  const handleClick = async () => {
    setName(name => "B");
    setName(name => "C");
    await Promise.resolve();
    ReactDOM.unstable_batchedUpdates(() => {
      setName(name => "D");
      setName(name => "E");
    });
  };

  onRender(name);
  return (
    <>
      <div data-testid="name">{name}</div>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
