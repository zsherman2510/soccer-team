import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebaseDB } from "../../../firebase";
const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Matches",
      linkTo: "/admin_matches/edit_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add Players",
      linkTo: "/admin_players/add_player"
    }
  ];

  const style = {
    color: "#ffffff",
    fontWeight: "300",
    borderBottom: "1px solid #353535"
  };

  const renderItems = () =>
    links.map(i => (
      <Link to={i.linkTo} key={i.title}>
        <ListItem button style={style}>
          {i.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebaseDB
      .auth()
      .signOut()
      .then(
        () => {
          console.log("logout was successful");
        },
        error => {
          console.log("error logging out");
        }
      );
  };

  return (
    <>
      <div>
        {renderItems()}
        <ListItem button style={style} onClick={() => logoutHandler()}>
          {" "}
          Log Out
        </ListItem>
      </div>
    </>
  );
};

export default AdminNav;
