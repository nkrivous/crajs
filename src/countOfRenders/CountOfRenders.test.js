import { fireEvent, render } from "@testing-library/react";
import React from "react";

import {
  ArrowFunction,
  BindInConstructor,
  BindInRender,
  FunctionComponent,
  FunctionComponentWithCallback,
  FunctionComponentWithCallbackPrevState
} from "./CountOfRenders";

describe("Count of renders", () => {
  test("BindInRender", () => {
    const onRender = jest.fn();
    const { getByRole } = render(<BindInRender onRender={onRender} />);
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(2);
  });

  test("BindInConstructor", () => {
    const onRender = jest.fn();
    const { getByRole } = render(<BindInConstructor onRender={onRender} />);
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(1);
  });

  test("ArrowFunction", () => {
    const onRender = jest.fn();
    const { getByRole } = render(<ArrowFunction onRender={onRender} />);
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(1);
  });

  test("FunctionComponent", () => {
    const onRender = jest.fn();
    const { getByRole } = render(<FunctionComponent onRender={onRender} />);
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(2);
  });

  test("FunctionComponentWithCallback", () => {
    const onRender = jest.fn();
    const { getByRole } = render(
      <FunctionComponentWithCallback onRender={onRender} />
    );
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(2);
  });

  test("FunctionComponentWithCallbackPrevState", () => {
    const onRender = jest.fn();
    const { getByRole } = render(
      <FunctionComponentWithCallbackPrevState onRender={onRender} />
    );
    expect(onRender.mock.calls.length).toBe(1);

    fireEvent.click(getByRole("button"));

    expect(onRender.mock.calls.length).toBe(1);
  });
});
