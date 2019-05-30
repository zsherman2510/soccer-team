import React, { Component } from "react";
import PlayerCard from "../utils/playerCard";
import Fade from "react-reveal/Fade";
import Stripes from "../../Resources/images/stripes.png";

import { firebase, firebasePlayers } from "../../firebase";
import { firebaseLooper } from "../utils/misc";
import { Promise } from "core-js";
class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];
      for (let key in players) {
        promises.push();
        new Promise((resolve, reject) => {
          firebase
            .storage()
            .ref("players")
            .child(players[key].image)
            .getDownloadURL()
            .then(url => {
              players[key].url = url;
              resolve();
            });
        });
      }
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        });
      });
    });
  }

  showplayersByCategory = category =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left key={i}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    console.log(this.state.players);
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {!this.state.loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showplayersByCategory("Keeper")}
              </div>
            </div>
          </div>
        ) : null}
        <h1>team</h1>
      </div>
    );
  }
}

export default TheTeam;
