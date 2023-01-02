import React from "react";
import "./App.css";

function MyTable(props) {

  // let displayData=[];
  // if(props.data.currentPage==props.page){
    
  // }
  let data=props.data;
  let currentPage=props.currentP
  let perPage=props.perPage
    
  return (
    <div>
      {data.slice((currentPage - 1) * perPage, currentPage * perPage).map((item,key) => {
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
