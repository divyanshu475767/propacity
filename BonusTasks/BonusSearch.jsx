import React, { useState } from "react";

const searching = (props) => {
  const [List, setList] = useState(props.files);

  const sortHandler = (event) => {
    const files = [...List];

    files.sort((a, b) => a.name.localeCompare(b.name));
    setList(files);
  };
  return (
    <>
      <button onClick={sortHandler}>sort by name</button>
      <div>
        {List.map((item) => {
          return <li>{item.name}</li>;
        })}
      </div>
    </>
  );
};

export default searching;
