import React, { type JSX } from "react";

interface Props {
  search: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Search: React.FC<Props> = ({
  search,
  handleChange,
  onClick,
}: Props): JSX.Element => {
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
