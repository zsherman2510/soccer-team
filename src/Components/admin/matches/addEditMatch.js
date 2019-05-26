import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import FormField from "../../utils/formFields";
import { validate } from "../../utils/misc";
import { firebaseTeams, firebaseDB, firebaseMatches } from "../../../firebase";
import { firebaseLooper } from "../../utils/misc";
class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: "",
    formSuccess: "",
    teams: [],
    formdata: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select Home Team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select Away Team",
          name: "select_away",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          name: "result_away_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team Result",
          name: "select_result",
          type: "select",
          options: [
            {
              key: "W",
              value: "W"
            },
            {
              key: "L",
              value: "L"
            },
            {
              key: "D",
              value: "D"
            },
            {
              key: "n/a",
              value: "n/a"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      played: {
        element: "select",
        value: "",
        config: {
          label: "Game Played",
          name: "select_played",
          type: "select",
          options: [
            {
              key: "No",
              value: "No"
            },
            {
              key: "Yes",
              value: "Yes"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormdata[element.id] = newElement;

    this.setState({
      formdata: newFormdata
    });
  }

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormdata = {
      ...this.state.formdata
    };
    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormdata[key].config.options = teamOptions;
      }

      this.setState({
        matchId,
        formType: type,
        formdata: newFormdata,
        teams
      });
      console.log(this.state);
    }
  }

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });
        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };
    if (!matchId) {
      ///Add match
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, "Edit Match");
        });
    }
  }

  render() {
    return (
      <>
        <AdminLayout>
          <div className="editmatch_dialog_wrapper">
            <h2>{this.state.formType}</h2>
            <div>
              <form onSubmit={event => this.submitForm(event)}>
                <FormField
                  id={"date"}
                  formdata={this.state.formdata.date}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"local"}
                  formdata={this.state.formdata.local}
                  change={element => this.updateForm(element)}
                />

                <div className="select_team_layout">
                  <div className="label_inputs">Local</div>
                  <div className="wrapper">
                    <div className="left">
                      <FormField
                        id={"local"}
                        formdata={this.state.formdata.local}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                    <div>
                      <FormField
                        id={"resultLocal"}
                        formdata={this.state.formdata.resultLocal}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                  </div>
                </div>
                <div className="select_team_layout">
                  <div className="label_inputs">Away</div>
                  <div className="wrapper">
                    <div className="left">
                      <FormField
                        id={"away"}
                        formdata={this.state.formdata.away}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                    <div>
                      <FormField
                        id={"resultAway"}
                        formdata={this.state.formdata.resultAway}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="split_fields">
              <FormField
                id={"referee"}
                formdata={this.state.formdata.referee}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"stadium"}
                formdata={this.state.formdata.stadium}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="split_fields last">
              <FormField
                id={"result"}
                formdata={this.state.formdata.result}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"played"}
                formdata={this.state.formdata.played}
                change={element => this.updateForm(element)}
              />
            </div>

            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Something is wrong</div>
            ) : (
              ""
            )}
            <div className="admin_submit">
              <button onClick={event => this.submitForm(event)}>
                {this.state.formType}
              </button>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default AddEditMatch;
