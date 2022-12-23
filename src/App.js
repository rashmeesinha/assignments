import "./App.css";
import data from "./data.json";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import usePagination from "./Pagination";
import { Pagination } from "@mui/material";
import MyTable from "./MyTable";

function App() {
  const [filterdata, setfilter] = useState(data);

  const [filterTabBtn, setfilterTabBtn] = useState(false);

  const [isname, setisname] = useState(true);
  const [isposition, setisposition] = useState(true);
  const [isoffice, setisoffice] = useState(true);
  const navigate = useNavigate();
  //const location = useLocation();

  let [page1, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(filterdata.length / PER_PAGE);
  const _DATA = usePagination(filterdata, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    navigate(`/${p}`);
    
  };

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
        <form>
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

          <label onClick={filterTab}>
            <u>Filter </u>{" "}
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
              top: "15%",
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
            {/* {_DATA.currentData().map((item) => {
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
            })} */}
            <Routes>
            <Route index path="/1" element={<MyTable data={_DATA}></MyTable>} />
            <Route path="/2" element={<MyTable data={_DATA}></MyTable>} />
            <Route path="/3" element={<MyTable data={_DATA}></MyTable>} />
            </Routes>
            
            
            
            {console.log(_DATA)}
        
            {/* <MyTable data={_DATA}></MyTable> */}
          </div>

          <Pagination
            className="pagination"
            count={count}
            size="medium"
            page={page1}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
}

export default App;
