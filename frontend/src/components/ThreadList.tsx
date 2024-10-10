/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import useThreads from "../hooks/useThreads";
import User1 from "../assets/u1.jpeg";
import { useReplyContext } from "../context/context";
import ReplyBox from "./ReplyArea";

const ThreadList: React.FC = () => {
  const { threads, loading, error } = useThreads();

  const addUnsetStyleToSubElements = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.body.children;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.all = "revert";
    }
    return doc.body.innerHTML;
  };

  if (loading) return <div>Loading threads...</div>;
  if (error) return <div>Error fetching threads: {error.message}</div>;

  const Post = ({ threads, level }: { threads: any; level: number }) => {
    const { number, setNumber } = useReplyContext();
    if (threads === undefined) {
      return <></>;
    }
    return (
      <div className="mt-5">
        {threads.map((thread: any) => (
          <li key={thread.id}>
            <div
              className={"border-gray-200 " + (level !== 1 ? "border-l " : " ")}
            >
              <div className="flex items-center mb-1 px-4 py-1">
                <img
                  className="object-cover rounded-full w-6 h-6"
                  src={User1}
                  alt="User picture"
                />
                <p className="mx-3 font-semibold">{thread.author.username}</p>
                <span className="text-gray-500 text-sm">
                  • {new Date(Number(thread.createdAt)).toLocaleString()}
                </span>
              </div>
              <p
                className={
                  "text-gray-700 mr-24 border-gray-200 pb-2 mx-4 " +
                  (level === 1 ? "border-b" : "")
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: addUnsetStyleToSubElements(thread.content),
                  }}
                />
              </p>
              <div
                className={
                  "text-gray-700 mr-24  pb-2 mx-4 my-2 " +
                  (level === 1 && thread?.replies?.length === 0
                    ? "border-b mb-10"
                    : "")
                }
              >
                <div className="flex justify-between w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="#F6F6F6" />
                    <path
                      d="M18.075 9C18.417 9 18.75 8.712 18.75 8.325V6.75H20.325C20.667 6.75 21 6.462 21 6.075C21 5.697 20.703 5.4 20.325 5.4H18.75V3.825C18.75 3.447 18.453 3.15 18.075 3.15C17.697 3.15 17.4 3.447 17.4 3.825V5.4H15.825C15.447 5.4 15.15 5.697 15.15 6.075C15.15 6.444 15.447 6.75 15.825 6.75H17.4V8.325C17.4 8.694 17.697 9 18.075 9ZM12 19.35C15.978 19.35 19.2 16.128 19.2 12.15C19.2 11.745 19.164 11.322 19.092 10.899C19.038 10.593 18.75 10.35 18.426 10.35C18.057 10.35 17.751 10.656 17.751 11.025C17.751 11.178 17.85 11.583 17.85 12.15C17.85 15.381 15.231 18 12 18C8.769 18 6.15 15.381 6.15 12.15C6.15 8.919 8.769 6.3 12 6.3C12.459 6.3 13.017 6.399 13.125 6.399C13.494 6.399 13.8 6.093 13.8 5.724C13.8 5.391 13.548 5.139 13.242 5.058C13.026 5.004 12.603 4.95 12 4.95C8.022 4.95 4.8 8.172 4.8 12.15C4.8 16.128 8.022 19.35 12 19.35ZM9.75 11.7C10.497 11.7 11.1 11.097 11.1 10.35C11.1 9.603 10.497 9 9.75 9C9.003 9 8.4 9.603 8.4 10.35C8.4 11.097 9.003 11.7 9.75 11.7ZM14.25 11.7C14.997 11.7 15.6 11.097 15.6 10.35C15.6 9.603 14.997 9 14.25 9C13.503 9 12.9 9.603 12.9 10.35C12.9 11.097 13.503 11.7 14.25 11.7ZM12 16.65C14.583 16.65 15.6 14.67 15.6 13.725C15.6 13.365 15.321 13.05 14.925 13.05H9.075C8.679 13.05 8.4 13.365 8.4 13.725C8.4 14.706 9.453 16.65 12 16.65Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                  </svg>
                  {level < 4 && (
                    <div
                      className={
                        "flex items-center gap-2 cursor-pointer " +
                        (number === thread.id ? "text-blue-500" : "")
                      }
                      onClick={() => {
                        if (level < 4 && number !== thread.id)
                          setNumber(thread.id);
                        else setNumber(undefined);
                      }}
                    >
                      {thread?.replies?.length === 0 ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00481 0C5.88613 0 3.84764 0.839886 2.36854 2.35893C0.849501 3.83805 0.00961549 5.87649 0.00961549 7.99519C0.00961549 9.59421 0.489664 11.1538 1.36915 12.473L0.0496481 15.2711C-0.15023 15.7108 0.289233 16.1502 0.728918 15.9504L3.52798 14.6308C4.84714 15.5103 6.40564 15.9904 8.00466 15.9904C10.1233 15.9904 12.1618 15.1506 13.6409 13.6715C15.16 12.1524 15.9999 10.114 15.9999 7.99525C15.9999 5.87655 15.16 3.83808 13.6409 2.35898C12.1619 0.839943 10.1234 5.7108e-05 8.00466 5.7108e-05L8.00481 0ZM8.00481 0.999388C9.84363 0.999388 11.6426 1.75898 12.9618 3.0382C14.2809 4.35736 15.0006 6.15629 15.0006 7.99516C15.0006 9.87404 14.2809 11.6329 12.9618 12.9521C11.6426 14.2713 9.84368 14.9909 8.00481 14.9909C6.52568 14.9909 5.08659 14.5109 3.88733 13.6314C3.72738 13.5514 3.52806 13.5124 3.3681 13.5924L1.56943 14.4317L2.40878 12.632C2.48875 12.4721 2.48864 12.2728 2.36873 12.1128C1.48924 10.9135 1.00919 9.47425 1.00919 7.99533C1.00919 6.15651 1.76879 4.35756 3.048 3.03836C4.36717 1.75912 6.1661 0.999554 8.00497 0.999554L8.00481 0.999388ZM4.56463 5.13543C4.43022 5.13253 4.30028 5.18384 4.20413 5.27786C4.10799 5.37189 4.05378 5.50072 4.05378 5.63513C4.05378 5.76965 4.10799 5.89848 4.20413 5.99251C4.30028 6.08654 4.43022 6.13785 4.56463 6.13484H7.922C8.05652 6.13785 8.18646 6.08654 8.28261 5.99251C8.37876 5.89848 8.43296 5.76966 8.43296 5.63513C8.43296 5.50073 8.37876 5.3719 8.28261 5.27786C8.18646 5.18383 8.05652 5.13253 7.922 5.13543H4.56463ZM4.56463 7.50015V7.50026C4.38873 7.50406 4.22789 7.6002 4.141 7.75323C4.05422 7.90616 4.05422 8.09366 4.141 8.24656C4.22789 8.39959 4.38873 8.49574 4.56463 8.49964H11.4336C11.6095 8.49574 11.7704 8.39959 11.8572 8.24656C11.9441 8.09364 11.9441 7.90614 11.8572 7.75323C11.7704 7.6002 11.6095 7.50406 11.4336 7.50026L4.56463 7.50015ZM4.56463 9.86399C4.4319 9.86377 4.30452 9.91641 4.2105 10.0102C4.11658 10.104 4.06372 10.2314 4.06372 10.3641C4.06372 10.497 4.11659 10.6244 4.2105 10.7182C4.30453 10.812 4.43191 10.8646 4.56463 10.8644H11.4336C11.5663 10.8646 11.6938 10.812 11.7877 10.7182C11.8817 10.6244 11.9345 10.497 11.9345 10.3641C11.9345 10.2314 11.8817 10.104 11.7877 10.0102C11.6938 9.91641 11.5663 9.86377 11.4336 9.86399H4.56463Z"
                            fill="#63637B"
                          />
                        </svg>
                      ) : (
                        thread?.replies?.length
                      )}
                      <span className="mr-2"> Comment</span>
                    </div>
                  )}
                </div>
                {number === thread.id && <ReplyBox author="Sourabh" />}
              </div>
            </div>
            <div className={"ml-10 border-gray-200"}>
              <Post threads={thread?.replies} level={level + 1} />
            </div>
          </li>
        ))}
      </div>
    );
  };

  return (
    <ul>
      <Post threads={threads} level={1} />
    </ul>
  );
};

export default ThreadList;
