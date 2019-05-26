import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../HOC/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebasePlayers } from "../../../firebase";

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    matches: []
  };

  componentDidMount() {}
  render() {
    return (
      <AdminLayout>
        <div>
          <h1>adminplayers</h1>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
