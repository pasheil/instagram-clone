// import logo from "./instagram-logo.png";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import { Button, Input } from "@mui/material";
import ImageUpload from "./ImageUpload";

function App() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
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
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    // this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added, this code fires.
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                // src= {logo}
                alt=""
              />
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>

          {/* <h2>I am a modal</h2> */}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          // src= {logo}
          alt=""
        />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

      <h1>Instagram Clone!</h1>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}

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
