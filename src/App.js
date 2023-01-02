import "./App.css";
import data from "./data.json";
import { useState } from "react";
import { useNavigate, Route, Routes, useParams } from "react-router-dom";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MyTable from "./MyTable";

function App() {
  const [filterdata, setfilter] = useState(data);

  const [filterTabBtn, setfilterTabBtn] = useState(false);

  const [isname, setisname] = useState(true);
  const [isposition, setisposition] = useState(true);
  const [isoffice, setisoffice] = useState(true);

  

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;
  const maxPage = Math.ceil(data.length / perPage);

  const navigate = useNavigate();

  const noOfPages = [];
  for (let i = 1; i <= maxPage; i++) {
    noOfPages.push(i);
  }

  function filterData(e) {
    setfilter(
      data.filter((item) => {
        return (
          (isname && item.Name.includes(e.target.value)) ||
          (isposition && item.Position.includes(e.target.value)) ||
          (isoffice && item.Office.includes(e.target.value))
        );
      })
    );
  }

  function filterTab(e) {
    setfilterTabBtn(!filterTabBtn);

    e.stopPropagation();
  }

  return (
    <div className="App">
      <div style={{ paddingBottom: "20px" }}>
        <form style={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <input
            placeholder="search.."
            style={{
              height: "40px",
              marginBottom: "10px",
              borderRadius: "20px",
              marginRight: "20px",
            }}
            onKeyUp={filterData}
          ></input>

          <label onClick={filterTab} style={{marginTop:"0"}}>
            <u style={{display:"flex",flexDirection:"row", justifyContent:"center"}}>Filter<KeyboardArrowDownIcon style={{}}/> </u>{" "}
          </label>
        </form>

        {
          <div
            className={filterTabBtn ? "" : "hidden"}
            style={{
              height: "70px",
              width: "80px",
              zIndex: "1",
              backgroundColor: "white",
              position: "absolute",
              top: "16%",
              left: "55%",
              color: "black",
            }}
          >
            <input
              className="Checkbox"
              type="checkbox"
              defaultChecked="checked"
              onChange={() => {
                setisname(!isname);
              }}
            />
            Name
            <input
              className="Checkbox"
              type="checkbox"
              defaultChecked="checked"
              onChange={() => {
                setisposition(!isposition);
              }}
            />
            Position
            <input
              className="Checkbox"
              type="checkbox"
              defaultChecked="checked"
              onChange={() => {
                setisoffice(!isoffice);
              }}
            />
            Office
          </div>
        }
      </div>
      <div className="container">
        <div className="flex-container">
          <div className="header">
            <div className="headerItem">Name</div>
            <div className="headerItem">Position</div>
            <div className="headerItem">Office</div>
          </div>

          <div className="table-container">
            <main>
              <Routes>
                {noOfPages.map((i, key) => {
                  
                  return (
                    
                    <Route
                      path={`/${i}`}
                      exact
                      element={
                        <MyTable
                          data={filterdata}
                          currentP={i}
                          perPage={perPage}
                        ></MyTable>
                      }
                    ></Route>
                  );
                })}
              </Routes>
            </main>
            <div className="pagination-buttons">
              <a
                onClick={() => {
                  setCurrentPage(1);
                  //console.log(currentPage, data);
                  navigate(`/1`);
                  window.localStorage.setItem("pageHighlight", 1);

                }}
              >
                <KeyboardDoubleArrowLeftIcon/>
              </a >
              <a 
                onClick={() => {
                  let p=Math.max(currentPage - 1, 1)
                  setCurrentPage(Math.max(currentPage - 1, 1));
                  //console.log(currentPage, data);
                  navigate(`/${p}`);
                  window.localStorage.setItem("pageHighlight", p);
                }}
              >
                <ArrowBackIosIcon/>
              </a>

              {noOfPages.map((item) => {

                return (
                 <a className={ item==window.localStorage.getItem('pageHighlight')? 'pagination_link' : null} key={item} style={{}}
                 onClick={() => {
                   setCurrentPage(item);
                   // console.log(currentPage, data);
                   navigate(`/${item}`);
                  window.localStorage.setItem("pageHighlight", item);
                 }}
               >
                 {item}
               </a>
                );
              })}

              <a 
                onClick={() => {
                  let p=Math.min(currentPage + 1, maxPage)
                  setCurrentPage(p);
                  // console.log(currentPage, data);
                  navigate(`/${p}`);
                  window.localStorage.setItem("pageHighlight", p);
                }}
              >
               <ArrowForwardIosIcon/>
              </a>
              <a 
                onClick={() => {
                 
                  setCurrentPage(maxPage);
                  // console.log(currentPage, data);
                  navigate(`/${maxPage}`);
                  window.localStorage.setItem("pageHighlight", maxPage);
                }}
              >
                <KeyboardDoubleArrowRightIcon/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
