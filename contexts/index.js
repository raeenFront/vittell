import { createContext, useState } from "react";

// mrx : context 
export const Contexts = createContext({
  Alert: false,
  setAlert: false,
  cityId: "",
  setcityId: "",
  VerifyMobile : null,
  setVerifyMobile: null,
  SearchUser: [],
  setSearchUser: [],
  UserInfo: null,
  setUserInfo: null,
  setDefultCity: "شهر من",
  DefultCity: "شهر من",
});
const ContextsProvider = ({ children }) => {
  const [Alert, setAlert] = useState(false);
  const [DefultCity, setDefultCity] = useState("شهر من");
  const [cityId, setcityId] = useState("");
  const [VerifyMobile, setVerifyMobile] = useState(null);
  const [SearchUser, setSearchUser] = useState([]);
  const [UserInfo, setUserInfo] = useState(null);

  return (
    <Contexts.Provider
      value={{
        setDefultCity,
        DefultCity,
        UserInfo,
        setUserInfo,
        SearchUser,
        setSearchUser,
        Alert,
        setAlert,
        cityId,
        setcityId,
        VerifyMobile,
        setVerifyMobile,
      }}
    >
      {children}
    </Contexts.Provider>
  );
};

export default ContextsProvider;
