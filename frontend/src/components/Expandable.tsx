import React, { useState } from "react";

interface Subtopic {
  id: number;
  title: string;
}

interface Topic {
  id: number;
  title: string;
  subtopics: Subtopic[];
}

const topics: Topic[] = [
  {
    id: 1,
    title: "The Science of Biology",
    subtopics: [
      { id: 1, title: "What is Ecology?" },
      { id: 2, title: "Energy Flow" },
      { id: 3, title: "Cycle of Matter" },
      { id: 4, title: "The role of Climate" },
      { id: 5, title: "Renewable and Non-renewable Resources" },
      { id: 6, title: "Biodiversity" },
      { id: 7, title: "Habitat and Niche" },
    ],
  },
  {
    id: 2,
    title: "Ecosystems and Communities",
    subtopics: [
      { id: 1, title: "Types of Ecosystems" },
      { id: 2, title: "Food Chains and Webs" },
      { id: 3, title: "Biotic and Abiotic Factors" },
    ],
  },
  {
    id: 3,
    title: "Populations",
    subtopics: [
      { id: 1, title: "Population Dynamics" },
      { id: 2, title: "Carrying Capacity" },
      { id: 3, title: "Population Growth Models" },
    ],
  },
];

const ExpandableList: React.FC = () => {
  const [openTopicId, setOpenTopicId] = useState<number | null>(1);

  const toggleDropdown = (id: number) => {
    setOpenTopicId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="px-3 py-4 overflow-y-auto text-gray-500 text-base">
      <ul className="space-y-2 font-medium text-base">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              className="flex items-center w-full p-1 transition duration-75 rounded-lg group hover:bg-gray-100"
              onClick={() => toggleDropdown(topic.id)}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  openTopicId === topic.id ? "rotate-90" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
              <span className="text-sm flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {topic.title}
              </span>
            </button>
            {openTopicId === topic.id && topic.subtopics.length > 0 && (
              <ul className="py-1 space-y-2">
                {topic.subtopics.map((subtopic) => (
                  <li key={subtopic.id}>
                    <a
                      href="#"
                      className="text-sm flex items-center w-full p-1 transition duration-75 rounded-lg pl-7 group text-gray-800 hover:bg-gray-100"
                    >
                      {subtopic.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpandableList;
