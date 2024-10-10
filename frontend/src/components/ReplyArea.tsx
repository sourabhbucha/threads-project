/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useState } from "react";
import User1 from "../assets/u1.jpeg";
import { addReply } from "../api";
import useThreads from "../hooks/useThreads";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useReplyContext } from "../context/context";
interface ReplyBoxProps {
  author: string;
  defaultBox?: boolean;
}

const ReplyBox = ({ author, defaultBox }: ReplyBoxProps) => {
  const { number } = useReplyContext();
  const { refetch } = useThreads();
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (html: string) => {
    setContent(html);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReply(content, 1, defaultBox ? undefined : number);
    setContent("");
    refetch();
  };
  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="p-3 bg-indigo-50 w-full">
        <div className="flex items-center mb-2">
          <img
            className="object-cover rounded-full w-8 h-8 mr-2"
            src={User1}
            alt="User picture"
          />
          <p className="font-semibold text-gray-500">{author}</p>
        </div>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          theme="snow"
          className="h-20 mb-4"
          placeholder="Start typing..."
        />
        <button
          type={"submit"}
          className={
            "mt-10 text-white px-3 py-1 rounded " +
            (content.length !== 0
              ? "bg-indigo-500"
              : "bg-slate-500 cursor-not-allowed")
          }
          disabled={content.length === 0}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ReplyBox;
