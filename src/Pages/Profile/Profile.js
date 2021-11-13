import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import mail from "../../Assets/Images/mail.png";
import gender from "../../Assets/Images/gender.png";
import phone from "../../Assets/Images/phone.png";
import loc from "../../Assets/Images/loc.png";
import { UserContext } from "../../Context/userContext";
import ProfileStyle from "./Profile.module.css";
import { API } from "../../Config/api";
import Card from "../../Components/CardMylist/Card";
import EditProfil from "../../Components/Modal/Edit Profil/EditProfil";
import profilePic from "../../Assets/Images/defaultuser.png";
import emptyMyList from "../../Assets/Images/emptyMyList.png";

const Profile = () => {
  
  const [state ] = useContext(UserContext);
  const [bookList, setBookList] = useState([]);

  // Get product data from database
  const getMylist = async () => {
    try {
      const response = await API.get("/bookList/" + state.user.id);
      setBookList(response.data.data.bookList);
      console.log(response, "response")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMylist();
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5", overflow:"hidden"}}>
      <div className="row"  >
        <div className="col-md-2">
          <Sidebar />
        </div>
        
        <div className="col-md-10" style={{overflow:"hidden"}}> <p className={ProfileStyle.profile}>Profile</p>
            <div className={ProfileStyle.boxProfil} >
            <div className="col-md-7" style={{marginLeft:"31px"}}>
              <div className={ProfileStyle.textWrapper}>
                  <img src={mail} alt="mail" /> 
                <div style={{marginLeft:"15px"}}>
                  <p className={ProfileStyle.upperText}>{state.user.email}</p>
                  <p className={ProfileStyle.lowerText}>Email</p>
                </div>
              </div>
              <div className={ProfileStyle.textWrapper}>
                  <img src={gender} alt="gender" />
                <div style={{marginLeft:"15px"}}>
                  <p className={ProfileStyle.upperText}>{state.user.gender}</p>
                  <p className={ProfileStyle.lowerText}>Gender</p>
                </div>
              </div>
              <div className={ProfileStyle.textWrapper}>
                  <img src={phone} alt="phone" />
                <div style={{marginLeft:"15px"}}>
                  <p className={ProfileStyle.upperText}>{state.user.phone}</p>
                  <p className={ProfileStyle.lowerText}>Mobile Phone</p>
                </div>
              </div>
              <div className={ProfileStyle.textWrapper}>
                  <img src={loc} alt="loc" />
                <div style={{marginLeft:"19px"}}>
                  <p className={ProfileStyle.upperText}>{state.user.address}</p>
                  <p className={ProfileStyle.lowerText}>Address</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{textAlign:"right"}}>
      
            {state.user.image == "http://localhost:5000/uploads/null" ? (
                <img src={profilePic} alt="preview" style={{borderRadius:"5px", width:"180px", height:"160px"}} />
              ) : (
                <img src={state.user.image} style={{borderRadius:"5px", width:"180px", height:"165px"}} alt="Please Edit Photo Profil User" />
            )}
 
            <div>
                <EditProfil />
            </div>
            </div>
          </div>

          <p className={ProfileStyle.MyList}>My List Book</p>
          <div className={ProfileStyle.listBook} style={{marginBottom:"10px"}}>
            {bookList.length <= 0 && (
            <img src={emptyMyList} width="205px" height="160px" alt="not found" />
            )}
            {bookList.length > 0 &&
            bookList?.map((item, index) => (
                <Card item={item} key={index} />
            ))}
          </div>
          
      </div>
    </div>
  </div>

  );
};

export default Profile;