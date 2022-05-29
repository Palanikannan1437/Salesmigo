import React, { useState } from "react";

const AuthContext = React.createContext({
  id: "",
  login: (id) => {},
  teamID: "",
  setTeamID: (teamID) => {},
  managerID: "",
  managerHandler: (managerID) => {},
  designation: "",
});

export const AuthContextProvider = (props) => {
  let initialID;
  let initialTeamID;
  let initialmanagerID;
  let initialDesignation;
  if (typeof window !== "undefined") {
    initialID = localStorage.getItem("id");
    initialTeamID = localStorage.getItem("teamID");
    initialmanagerID = localStorage.getItem("managerID");
    initialDesignation = localStorage.getItem("designation");
  }
  console.log(initialTeamID)

  const [id, setID] = useState(initialID);
  const [userTeamID, setTeamID] = useState(initialTeamID);
  const [managerID, setmanagerID] = useState(initialmanagerID);
  const [designation, setDesignation] = useState(initialDesignation);

  const loginHandler = (id, designation) => {
    setID(id);
    setDesignation(designation);
    localStorage.setItem("id", id);
    localStorage.setItem("designation", designation);
  };

  const managerHandler = (managerID) => {
    setmanagerID(managerID);
    console.log("object", managerID);
    localStorage.setItem("managerID", managerID);
  };

  const teamHandler = (teamID) => {
    setTeamID(teamID);
    localStorage.setItem("teamID", teamID);
  };

  const contextValue = {
    id: id,
    login: loginHandler,
    teamID: userTeamID,
    setTeamID: teamHandler,
    managerID: managerID,
    managerHandler: managerHandler,
    designation: designation,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
