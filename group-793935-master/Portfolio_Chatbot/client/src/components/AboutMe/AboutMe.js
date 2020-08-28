import React from "react";
import portfolio from "../../utils/photo.jpeg";
import { Typography } from "@material-ui/core";
import "./AboutMe.scss";

const AboutMe = () => {
  return (
    <React.Fragment>
      <Typography
        variant="h2"
        display="block"
        align="center"
        style={{
          margin: "1rem",
          fontSize: "1.6rem",
          textTransform: "uppercase"
        }}
      >
      </Typography>
      <div className="name">
        <img src={portfolio} alt="profile_photo" className="img" />
        <h1>Sarah Hamoudi</h1>
        <div className="subtitle">
          <h3>Je suis une développeuse fullstack, Je suis passionée par le web</h3>
          <p>
            Le design et le beau me définisse particulièrement ! <br />
            J'ai de l'experience en Javascript et Python. Ma techno préférée est le
            ReactJS
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutMe;
