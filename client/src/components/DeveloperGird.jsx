
import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import  axios  from 'axios';

const DeveloperGird = ({profile,user}) => {

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
                
                          <div
                            className="card my-2 animated zoomIn"
                            key={profile._id}
                          >
                            <div className="card-body bg-light-grey">
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    src={profile.user.avatar}
                                    className="img-fluid img-thumbnail"
                                    alt=""
                                  />
                                </div>
                                <div className="col-md-5">
                                  <h2>{profile.user.name}</h2>
                                  <small className="h6">
                                    {profile.website}
                                  </small>
                                  <br />
                                  <small className="h6">
                                    {profile.designation}
                                  </small>
                                  <br />
                                  <small className="h6">
                                    {profile.company}
                                  </small>
                                  <br />
                                  <small>{profile.location}</small>
                                  <br />
                                  <Link
                                    to={`/developers/${profile._id}`}
                                    className="btn btn-teal btn-sm "
                                  >
                                    View Profile
                                  </Link>
                                  {/* profile.user!=user._id&& */}
                                  {
                                       profile.user._id===user._id?null:(
                                        profile.followers.includes(user._id)?(
                                        <button
                                        className="btn btn-primary btn-sm me-2 "
                                        onClick={clickFollow.bind(
                                          this,
                                          profile._id
                                        )}
                                      >
                                        {/* <i className="fa fa-thumbs-up me-2" />{" "} */}
                                        Unfollow
                                      </button>
                                      )
                                      :(
                                        <button
                                          className="btn btn-primary btn-sm"
                                          onClick={clickFollow.bind(
                                            this,
                                            profile._id
                                          )}
                                        >
                                          Follow
                                        </button>
                                      )
                                       )
                                  }
                                </div>
                                <div className="col-md-5 d-flex justify-content-center flex-wrap ">
                                  {profile.skills.length > 0 &&
                                    profile.skills.map((skill, index) => {
                                      return (
                                        <div key={index}>
                                          <span className="badge badge-success p-2 m-1">
                                            <i className="fa fa-check-circle" />{" "}
                                            {skill}
                                          </span>
                                          <br />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
              </React.Fragment>
  )
}

export default DeveloperGird