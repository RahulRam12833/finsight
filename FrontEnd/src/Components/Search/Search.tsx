import React, { useState, type JSX } from "react";

type Props = {};

const Search: React.FC<Props> = (props: Props): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("Button clicked", search);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={handleChange}
      />
      <button onClick={(e) => onClick(e)}>Search</button>
    </div>
  );
};

export default Search;
