import { useActionData } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"
import Spinner from "./Spinner";
import { useSelector,useDispatch } from "react-redux";
import { changeState } from "../actions/index";
import DeveloperGird from './DeveloperGird';

const FollowingList = () => {
const [following,setFollowing]=useState([]);
const [profiles,setProfiles]=useState([]);
  const [loading,setLoading] = useState(true);
  const [follow,setFollow]=useState(false);
  const [user,setUser]=useState({});
    const getUser = async () => {
        let { data } = await axios.get("https://developer-room-yuba.onrender.com/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          },
        });
        // console.log(data.user);
        setUser(data.user);
      };

      const fetchProfile = async() =>{
        const { data } = await axios.get("https://developer-room-yuba.onrender.com/api/profiles/me",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          },
        });
        console.log("purushotam");
        // setProfile(data.profile);
        
        setFollowing(data.profile.following);
    
        // console.log(data.profile.following);
        // console.log(follower);
         
      }

      const fetchProfiles = async() =>{
        
        const { data } = await axios.get("https://developer-room-yuba.onrender.com/api/profiles/all",{
          headers: {
            "Content-Type": "application/json",
          },
        });
       setProfiles(data.profiles);
       console.log("purushotam");
       console.log(following);
      //  console.log(data);
       setLoading(false);
        
      }
    
      useEffect(() => {
    
        getUser().then(() => {
          console.log("kajal");
        //   fetchProfile();
          fetchProfile().then(()=>{

              fetchProfiles();
          })
        });
       
    }, []);
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              
            <h2>Following List</h2>   
            </div>
          </div>
        </div>
      </section>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {profiles.length > 0 ? (
              <React.Fragment>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      {profiles.map((profile) => {
                        return (
                          following.includes(profile.user._id)&&<DeveloperGird profile={profile} user={user}/>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>

  )
}

export default FollowingList