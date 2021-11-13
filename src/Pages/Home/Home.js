import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Frame from "../../Assets/Images/Frame 1.png";
import Card from "../../Components/Card/Card";
import {  useState, useEffect } from "react";
import { API } from "../../Config/api";
import HomeStyle from "./Home.module.css";

const Home = () => {

   // Variabel for store product data
  const [books, setBooks] = useState([]);
  console.log(books, "List book")

  const [searchBook, setSearchBook] = useState("");
  const [filter, setFilter] = useState([]);

  const SearchData = (value) =>{
     setSearchBook(value);
    if(searchBook != ""){
      const filteredData = books.filter((item) =>{
        return Object.values(item).join("").toLowerCase().includes(searchBook.toLowerCase())
      })
      setFilter(filteredData);
    }else{
      setFilter(books);
    }
  }

  // Get product data from database
  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      // Store product data to useState variabel
      setBooks(response.data.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App-header" style={{ backgroundColor: "#E5E5E5", overflow:"hidden"}}>
      <div className="row">
        <div className="col-sm-2" >
          <Sidebar/> 
          </div>
          <div className="col-md-10">
          <img  src={Frame} alt="Frame" />
          <p className={HomeStyle.bookheader} style={{fontFamily:"Times New Roman"}}>List Book {""}
          </p>
          <p style={{ marginLeft:"20px"}}>Search Book</p>
          <input
          className="form-control"
          onChange={(e) => SearchData(e.target.value)}
          style={{marginBottom :"40px", marginLeft:"20px" , width:"465px"}}
          />
          <div>
            <div className={HomeStyle.listBook}>
            
            {searchBook.length > 1
            ? filter.map((item)=>{
              return (
              <Card item={item} />
            )}):
            books?.map((item, index) => (
              <Card item={item} key={index} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;