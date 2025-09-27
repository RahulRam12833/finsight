import React, { type JSX } from "react";
import Card from "../Card/Card";

interface Props {}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <Card companyName="Apple Inc." symbol="AAPL" price={150} />
      <Card companyName="Microsoft Corp." symbol="MSFT" price={250} />
      <Card companyName="Google LLC" symbol="GOOGL" price={280} />
    </div>
  );
};

export default CardList;
