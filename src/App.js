// import logo from "./instagram-logo.png";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "Patrick",
    //   imageUrl:
    //     "https://i.pinimg.com/736x/1f/95/94/1f9594cd853e6e76eeadcc540c130f6b--jdm-cars-race-engines.jpg",
    //   caption: "The new car",
    // },
    // {
    //   username: "James",
    //   imageUrl:
    //     "https://imageio.forbes.com/specials-images/imageserve/6334792633c0eb9561592c39/0x0.jpg?format=jpg&width=1200",
    //   caption: "My new back yard after Ian",
    // },
    // {
    //   username: "Alex",
    //   imageUrl:
    //     "https://media.istockphoto.com/photos/travelling-by-air-plane-picture-id1263553498?k=20&m=1263553498&s=612x612&w=0&h=Q5bh4TuVIBDTf-uho0poJdj8OewskerUeUGTbQ7510Y=",
    //   caption: "Coding on the plane",
    // },
  ]);

  // UseEffect Runs a piece of code based on a specific condition

  useEffect(() => {
    // this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      // every time a new post is added, this code fires.
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          // src= {logo}
          alt=""
        />
      </div>

      <h1>Instagram Clone!</h1>

      {posts.map(({id, post}) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}

      {/* <Post
            username="Patrick"
            imageUrl="https://i.pinimg.com/736x/1f/95/94/1f9594cd853e6e76eeadcc540c130f6b--jdm-cars-race-engines.jpg"
            caption="The new car"
           />
          <Post
            username="James"
            imageUrl="https://imageio.forbes.com/specials-images/imageserve/6334792633c0eb9561592c39/0x0.jpg?format=jpg&width=1200"
            caption="My new back yard after Ian"
           />
          <Post
            username="Alex"
            imageUrl="https://media.istockphoto.com/photos/travelling-by-air-plane-picture-id1263553498?k=20&m=1263553498&s=612x612&w=0&h=Q5bh4TuVIBDTf-uho0poJdj8OewskerUeUGTbQ7510Y="
            caption="Coding on the plane"
           /> */}
    </div>
  );
}

export default App;
