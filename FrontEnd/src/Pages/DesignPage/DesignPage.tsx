import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";

type Props = {};

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinSight Design Page</h1>
      <h2>
        Welcome to the design page of FinSight. This is where we will house
        various design aspects of the app
      </h2>
      <RatioList />
      <Table />
    </>
  );
};

export default DesignPage;
