import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import  axios  from 'axios';
import DeveloperGird from "./DeveloperGird";

let DeveloperList = () => {
  let navigate = useNavigate();
  const [profiles,setProfiles]=useState([]);
  const [loading,setLoading] = useState(true);
  const [follow,setFollow]=useState(false);
  const [user,setUser]=useState({});
function purushotam(){

}
  const fetchProfiles = async() =>{
    
    const { data } = await axios.get("https://developer-room-yuba.onrender.com/api/profiles/all",{
      headers: {
        "Content-Type": "application/json",
      },
    });
   setProfiles(data.profiles);
   console.log(profiles);
  //  console.log(data);
   setLoading(false);
// console.log(data.profiles)
    
  }

  const getUser =async()=>{
    let { data } = await axios.get("https://developer-room-yuba.onrender.com/api/users/me", {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("devroom")}`,
     },
   });
   const mydata=await data.user;
   setUser(mydata);
   console.log(data.user._id);
   console.log(user);
  //  setLoading(false);
    } 

    useEffect(() => {
      // fetchProfiles();
        getUser().then(() => {
          fetchProfiles();
        });
    }, []);
  let clickFollow=async(profileId)=>{
   
      const {data} = await axios.put("https://developer-room-yuba.onrender.com/api/profiles/add_followers",{profileId},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      }
    });
  //  fetchProfiles();
    // console.log(user);
  }
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-tie" /> Developers
              </p>
              <p>List of registered developers</p>
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
                          <DeveloperGird profile={profile} user={user}/>
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
  );
};
export default DeveloperList;
