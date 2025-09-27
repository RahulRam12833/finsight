import React from "react";
import "./Card.css";

interface Props {
  companyName: string;
  symbol: string;
  price: number;
}

const Card = ({ companyName, symbol, price }: Props) => {
  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1612428978260-2b9c7df20150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        alt="Image"
      />
      <div className="card-body">
        <h2>{companyName}</h2>
        <p>{symbol}</p>
        <p>${price}</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum rem,
        unde, id ipsam deserunt totam eius fugit maiores voluptatum similique
        architecto molestias saepe modi harum! Maxime iste rem distinctio
        eligendi.
      </p>
    </div>
  );
};

export default Card;
