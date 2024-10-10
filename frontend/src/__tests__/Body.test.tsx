// src/__tests__/Body.test.tsx
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Body from "../components/Body";

// Mock the child components
jest.mock("../components/Header", () => () => <div>Header</div>);
jest.mock("../components/ImageHeader", () => () => <div>ImageHeader</div>);
jest.mock("../components/Tabs", () => () => <div>Tabs</div>);
jest.mock("../components/ThreadList", () => () => <div>ThreadList</div>);
jest.mock(
  "../components/ReplyArea",
  () =>
    ({ author, defaultBox }: { author: string; defaultBox: boolean }) =>
      (
        <div>
          ReplyBox - Author: {author}, Default: {defaultBox.toString()}
        </div>
      )
);

describe("Body Component", () => {
  test("renders without crashing", () => {
    render(<Body />);
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("ImageHeader")).toBeInTheDocument();
    expect(screen.getByText("Tabs")).toBeInTheDocument();
    expect(screen.getByText("ThreadList")).toBeInTheDocument();
    expect(
      screen.getByText("ReplyBox - Author: Sourabh, Default: true")
    ).toBeInTheDocument();
  });
});
