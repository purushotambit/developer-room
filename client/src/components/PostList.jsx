import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"
import Spinner from "./Spinner";
import { useSelector,useDispatch } from "react-redux";
import { changeState } from "../actions/index";
// import './App.css';
// import './posts.css';

let PostList = () => {
  let [localPost, setLocalPost] = useState({
    text: "",
    image: "",
  });
 
  const navigate=useNavigate();
  const [user,setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [following,setFollowing]=useState([]);
  const [all,setAll]=useState(true);
  const [profile,setProfile]=useState([]);
  const [loggedIn,setLoggedIn]=useState(false);
  let myState=useSelector((state) => state.counter.value);
 useEffect(() => {
   if (!localStorage.getItem("devroom")) {
     navigate("/users/login");
   }
   setLoggedIn(true);
 }, []);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return "Just now";

      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }


   const getUser = async () => {
     let { data } = await axios.get("https://developer-room-yuba.onrender.com/api/users/me", {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("devroom")}`,
       },
     });
     console.log(data.user);
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
    setProfile(data.profile);
    console.log(data.profile);
    // setFollowing(data.profile.following);

    // console.log(follower);
    setLoading(false);
     
  }
    const getPosts = async () => {
      let { data } = await axios.get("https://developer-room-yuba.onrender.com/api/posts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      });
      // console.log(myState);
      setPosts(data.posts);
    //  fetchProfile();
     setAll(true);
      
    };


  useEffect(() => {
    fetchProfile();
      getUser().then(() => {
        // console.log("kajal");
          getPosts();
      });
     
  }, []);

  let updateInput = (e) => {
    setLocalPost({
      ...localPost,
      [e.target.name]: e.target.value,
    });
  };

  let submitCreatePost = async(e) => {
    e.preventDefault();
    if (localPost.text.trim() !== "")
    {
      const {data} =  await axios.post("https://developer-room-yuba.onrender.com/api/posts/",localPost,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    })
    Swal.fire("Post created successfully", "", "success");
    console.log(user);
    getPosts();
    }
  
    setLocalPost({
      text: "",
      image: "",
    });
  };

  let clickDeletePost = async (postId) => {
    const { data } = await axios.delete(`https://developer-room-yuba.onrender.com/api/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });
    let newArr = posts.filter((post)=>{
      if(post._id==postId)return false;
      return true;
    })
   setPosts(newArr);
    Swal.fire("Post deleted successfully", "", "success");
  };

  let clickLikePost = async(postId) => {
    const {data} = await axios.put(`https://developer-room-yuba.onrender.com/api/posts/like/${postId}`,{},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      }
    });
   getPosts();
  };

  function followPost(){
    console.log(posts.length);
    // console.log(follower);
    console.log(profile);
    if(profile!=undefined){

      let newArr = posts.filter((post)=>{
        if(profile.following.includes(post.user._id)){
          // console.log(post.user._id)
          return true;
        }
        return false;
      })
      setPosts(newArr);
    }
    setAll(false);
    // console.log(newArr.length)
  }

  return (
    <React.Fragment>
      {/* { <pre>{JSON.stringify(posts)}</pre> } */}

      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">Welcome to Dev-Room Posts</p>
              <p>
                Post your achievements, suceess and needs and share with other
                developers!
              </p>
            </div>
          </div>
          <div className="row">
            {Object.keys(user).length > 0 && (
              <div className="col-md-8">
                <form onSubmit={submitCreatePost}>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                
                        <img
                          src={user.avatar}
                          alt=""
                          width="50"
                          height="50"
                          className="rounded-circle me-2 mt-3"
                        />
                     
                    </div>
                    <textarea
                      required
                      name="text"
                      value={localPost.text}
                      onChange={updateInput}
                      rows="3"
                      className="form-control"
                      placeholder="Whats on your mind.."
                      style={{
                        height: "100px",
                        width: "100px",
                        resize: "none",
                      }}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Image Url
                      </span>
                    </div>
                    <input
                      name="image"
                      value={localPost.image}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Image Url"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      className="btn btn-teal btn-sm"
                      value="Post"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          <hr />
        </div>
      </section>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="container">
            {
                      all?(
                        <button className="btn btn-dark btn-sm me-2 mb-3" onClick={followPost} >FollowPost</button>
                      ):(
                        <button className="btn btn-dark btn-sm me-2" onClick={getPosts} >Allpost</button>
                      )
                    }
            </div>
            {posts.length > 0 && (
            
              <div className="container">
                <div className="row">
                  <div className="col">
                    
                  
                    {posts
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        return (
                          <div className="card my-2" key={post._id}>
                            <div className="card-body bg-light-grey">
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    src={post.user.avatar}
                                    alt=""
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                  />
                                  <br />
                                  <small>{post.name}</small>
                                </div>
                                <div className="col-md-8">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <img
                                        src={post.image}
                                        alt=""
                                        className="img-fluid d-block m-auto"
                                      />
                                    </div>
                                  </div>
                                  <p style={{ fontWeight: "bold" }}>
                                    {post.text}
                                  </p>
                                  <small>
                                    {timeDifference(
                                      new Date(),
                                      new Date(post.createdAt)
                                    )}
                                  </small>
                                  <br />
                                  {post.likes.includes(user._id) ? (
                                    <button
                                      className="btn btn-like btn-sm me-2"
                                      onClick={clickLikePost.bind(
                                        this,
                                        post._id
                                      )}
                                      style={{ color: "white" }}
                                    >
                                      <i
                                        className="fa fa-thumbs-up me-2"
                                        style={{ color: "white" }}
                                      />{" "}
                                      {post.likes.length}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-primary btn-sm me-2"
                                      onClick={clickLikePost.bind(
                                        this,
                                        post._id
                                      )}
                                    >
                                      <i className="fa fa-thumbs-up me-2" />{" "}
                                      {post.likes.length}
                                    </button>
                                  )}

                                  <Link
                                    to={`/posts/${post._id}`}
                                    className="btn btn-warning btn-sm me-2"
                                  >
                                    <i className="fab fa-facebook-messenger me-2" />{" "}
                                    Discussions {post.comments.length}
                                  </Link>
                                  {post.user._id === user._id ? (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={clickDeletePost.bind(
                                        this,
                                        post._id
                                      )}
                                    >
                                      <i className="fa fa-times-circle" />
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};
export default PostList;
