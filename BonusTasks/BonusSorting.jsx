





import React, { useState } from "react";

const sorting = (props) => {
  const [List, setList] = useState(props.files);

  const searchFiles = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredList = List.filter((item) => {
      if (item.name.toLowerCase().includes(value)) {
        return item;
      }
    });
    setList(filteredList);
  };
  return (
    <>
      <input type="text" placeholder="search" onChange={searchFiles} />

      <div>
        {List.map((item) => {
          return <li>{item.name}</li>;
        })}
      </div>
    </>
  );
};

export default main;














