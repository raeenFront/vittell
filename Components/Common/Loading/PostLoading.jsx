import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    style={{
      right: 18,
      position: "absolute",
      top: 80,
    }}
    rtl
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#e4d8d8"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="31" cy="31" r="30" width="60" height="60" />
    <rect x="70" y="18" rx="2" ry="2" width="190" height="10" />
    <rect x="70" y="34" rx="2" ry="2" width="140" height="10" />
    <rect x="2" y="70" rx="2" ry="2" width="372" height="174" />
    <rect x="-22" y="256" rx="2" ry="2" width="308" height="14" />
    <rect x="-5" y="278" rx="2" ry="2" width="357" height="14" />
    <rect x="-53" y="300" rx="2" ry="2" width="254" height="14" />
    <rect x="-53" y="322" rx="2" ry="2" width="280" height="14" />
  </ContentLoader>
);

export default MyLoader;
