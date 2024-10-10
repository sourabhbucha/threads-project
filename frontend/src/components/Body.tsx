import React from "react";
import Header from "./Header";
import ImageHeader from "./ImageHeader";
import Tabs from "./Tabs";
import ThreadList from "./ThreadList";
import ReplyBox from "./ReplyArea";

const Body = () => {
  return (
    <div className="flex-1  overflow-y-auto">
      <Header />
      <ImageHeader />
      <Tabs />
      <div className="mx-4">
        <ThreadList />
        <ReplyBox author={"Sourabh"} defaultBox={true} />
      </div>
    </div>
  );
};

export default Body;
