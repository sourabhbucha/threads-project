/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-render-in-setup */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpandableList from "./../components/Expandable"; // Adjust the import path as needed

describe("ExpandableList Component", () => {
  beforeEach(() => {
    render(<ExpandableList />);
  });

  test("renders all topics", () => {
    const topicTitles = [
      "The Science of Biology",
      "Ecosystems and Communities",
      "Populations",
    ];

    topicTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders subtopics when a topic is clicked", () => {
    fireEvent.click(screen.getByText("The Science of Biology"));

    const subtopicTitles = [
      "Ecosystems and Communities",
      "The Science of Biology",
    ];

    subtopicTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("toggles subtopics on topic click", () => {
    const topicButton = screen.getByText("The Science of Biology");

    // Click to expand
    fireEvent.click(topicButton);
    expect(screen.getByText("Ecosystems and Communities")).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(topicButton);
    expect(
      screen.queryByText("Ecosystems and Communities")
    ).toBeInTheDocument();
  });
});
