import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height="600px !important"
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="25" y="20" rx="5" ry="5" width="100%" height="40" />
    <rect x="25" y="70" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="120" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="170" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="220" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="270" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="820" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="870" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="920" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="970" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="1020" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="1070" rx="5" ry="2" width="100%" height="40" />
    <rect x="25" y="1120" rx="5" ry="2" width="100%" height="40" />
    
  </ContentLoader>
);

export default MyLoader;