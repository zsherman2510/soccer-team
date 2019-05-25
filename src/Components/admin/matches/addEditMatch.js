import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import FormField from "../../utils/formFields";
import Validate from "../../utils/misc";
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
          required: true,
          email: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

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
              </form>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default AddEditMatch;
