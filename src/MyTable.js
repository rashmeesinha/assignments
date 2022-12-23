import React from "react";
import "./App.css";

function MyTable(props) {
    
  return (
    <div>
      {props.data.currentData().map((item) => {
        return (
          <div className="list">
            <div className="item">
              <p>NAME</p>
              {item.Name}
            </div>
            <div className="item">
              <p>POSITION</p>
              {item.Position}
            </div>
            <div className="item">
              <p>OFFICE</p>
              {item.Office}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyTable;
