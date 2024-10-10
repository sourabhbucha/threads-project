/* eslint-disable testing-library/no-render-in-setup */
// src/components/Tabs.test.tsx

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import for additional matchers
import Tabs from "./../components/Tabs"; // Adjust the import path as necessary

describe("Tabs Component", () => {
  beforeEach(() => {
    render(<Tabs />);
  });

  test("renders all tab links", () => {
    const tabs = ["Feed", "People", "About"];

    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test("marks the Feed tab as the current page", () => {
    const feedTab = screen.getByText("Feed");
    expect(feedTab).toHaveAttribute("aria-current", "page");
  });

  test("renders the correct classes for tabs", () => {
    const feedTab = screen.getByText("Feed");
    const peopleTab = screen.getByText("People");
    const aboutTab = screen.getByText("About");

    // Check if Feed has the active classes
    expect(feedTab).toHaveClass("font-semibold");
    expect(feedTab).toHaveClass("border-indigo-600");

    // Check if other tabs do not have the active classes
    expect(peopleTab).not.toHaveClass("font-semibold");
    expect(aboutTab).not.toHaveClass("font-semibold");
  });
});
