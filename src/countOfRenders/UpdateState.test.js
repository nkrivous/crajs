import { fireEvent, render } from "@testing-library/react";
import React, { Profiler } from "react";

import {
  UpdateClassStateInAsyncFn,
  UpdateClassStateInAsyncFnBatch,
  UpdateClassStateInLifeCycle,
  UpdateClassStateInLifeCyclePromise,
  UpdateClassStateInPromise,
  UpdateClassStateInPromiseBatch,
  UpdateClassStateInReactHandler,
  UpdateFunctionInAsyncFn
} from "./UpdateState";

/**
 *
 * @param {Array<Array<string>>} calls
 */
function getRenderOrder(calls) {
  return calls.map(x => x[0]).join(" ");
}

test("UpdateClassStateInLifeCycle", () => {
  const onRender = jest.fn();
  const { getByTestId } = render(
    <UpdateClassStateInLifeCycle onRender={onRender} />
  );

  expect(getByTestId("name").textContent).toBe("C");
  expect(onRender.mock.calls.length).toBe(2);
  expect(getRenderOrder(onRender.mock.calls)).toBe("A C");
});

test("UpdateClassStateInReactHandler", () => {
  const onRender = jest.fn();
  const { getByRole } = render(
    <UpdateClassStateInReactHandler onRender={onRender} />
  );

  fireEvent.click(getByRole("button"));

  expect(onRender.mock.calls.length).toBe(2);
  expect(getRenderOrder(onRender.mock.calls)).toBe("A C");
});

test("UpdateClassStateInLifeCyclePromise", async () => {
  const onRender = jest.fn();
  await render(<UpdateClassStateInLifeCyclePromise onRender={onRender} />);

  expect(onRender.mock.calls.length).toBe(3);
  expect(getRenderOrder(onRender.mock.calls)).toBe("A B C");
});

test("UpdateClassStateInPromise", async () => {
  const onRender = jest.fn();
  const { getByRole } = render(
    <UpdateClassStateInPromise onRender={onRender} />
  );

  await fireEvent.click(getByRole("button"));

  expect(onRender.mock.calls.length).toBe(4);
  expect(getRenderOrder(onRender.mock.calls)).toBe("A G D E");
});

test("UpdateClassStateInAsyncFn", async () => {
  const onRender = jest.fn();
  const onRenderCallback = jest.fn();
  const { getByRole } = render(
    <Profiler id="UpdateClassStateInAsyncFn" onRender={onRenderCallback}>
      <UpdateClassStateInAsyncFn onRender={onRender} />
    </Profiler>
  );

  await fireEvent.click(getByRole("button"));

  expect(getRenderOrder(onRender.mock.calls)).toBe("A C D E F G");
  expect(onRenderCallback.mock.calls.length).toBe(6);
});

test("UpdateClassStateInPromiseBatch", async () => {
  const onRender = jest.fn();
  const onRenderCallback = jest.fn();
  const { getByRole } = render(
    <Profiler id="UpdateClassStateInPromiseBatch" onRender={onRenderCallback}>
      <UpdateClassStateInPromiseBatch onRender={onRender} />
    </Profiler>
  );

  await fireEvent.click(getByRole("button"));

  expect(getRenderOrder(onRender.mock.calls)).toBe("A C E");
  expect(onRenderCallback.mock.calls.length).toBe(3);
});

test("UpdateClassStateInAsyncFnBatch", async () => {
  const onRender = jest.fn();
  const onRenderCallback = jest.fn();
  const { getByRole } = render(
    <Profiler id="UpdateClassStateInAsyncFnBatch" onRender={onRenderCallback}>
      <UpdateClassStateInAsyncFnBatch onRender={onRender} />
    </Profiler>
  );

  await fireEvent.click(getByRole("button"));

  expect(getRenderOrder(onRender.mock.calls)).toBe("A C E");
  expect(onRenderCallback.mock.calls.length).toBe(3);
});

test("UpdateFunctionInAsyncFn", async () => {
  const onRender = jest.fn();
  const onRenderCallback = jest.fn();
  const { getByRole } = render(
    <Profiler id="UpdateFunctionInAsyncFn" onRender={onRenderCallback}>
      <UpdateFunctionInAsyncFn onRender={onRender} />
    </Profiler>
  );

  await fireEvent.click(getByRole("button"));

  expect(getRenderOrder(onRender.mock.calls)).toBe("A C E");
  expect(onRenderCallback.mock.calls.length).toBe(3);
});
