import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { date } from 'date-fns/locale/af';

class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: [],
            getConflictTypes: [],
            selectedStartDate: Date.now(),
            selectedEndDate: Date.now()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        
    };//end of constructor

    componentDidMount = () => {
        fetch(this.props.api + 'conflicts/types')
        .then(ret => ret.json())
        .then(json => this.setState({getConflictTypes: json}))
    }

    submitConflict = async () => {
        await fetch(this.props.api + 'conflicts', {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"conflict_type_id": this.state.conflict, 
                "start_time": this.state.selectedStartDate, 
                "stop_time": this.state.selectedEndDate, 
                "comment": this.state.comment,
                "schedule_id": this.state.schedule})
        })
    }
    
    handleStartDateChange = (date) => {
        this.setState({selectedStartDate: date})
    }

    handleEndDateChange = (date) => {
        this.setState({selectedEndDate: date})
    }
    
    handleConflictChange= (event) => {
        this.setState({conflict: event.target.value});
    }

    handleFirstNameChange= (event) => {
        this.setState({firstname: event.target.value})
    }

    handleLastNameChange= (event) => {
        this.setState({lastname: event.target.value})
    }

    handleCommentChange= (event) => {
        this.setState({comment: event.target.value})
    }

    handleSchedule = (event) => {
        this.setState({schedule: event.target.value})
    }

    handleSubmit(event) {
        alert('Conflict was submitted: ' + this.state.conflict);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <header> <h1>Conflict</h1></header>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" value={this.state.firstname} onChange={this.handleFirstNameChange}/>
                        Last Name:
                        <input type="text" value={this.state.lastname} onChange={this.handleLastNameChange}/>
                    </label>
                    <br />
                    <br />
                    <label>
                        Select Conflict Type:
                        <select value={this.state.conflict} onChange={this.handleConflictChange}>
                            {this.state.getConflictTypes.map(typeID => <option value={typeID.conflict_type_id}>{typeID.conflict_type_name}</option>)}
                        </select>
                    </label>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="start-date"
                                label="Start Date"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin='normal'
                                id="start-time"
                                label="Start Time"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                            <KeyboardDatePicker 
                                margin="normal"
                                id="end-date"
                                label="End Date"
                                format="yyyy-MM-dd"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin="normal"
                                id="end-time"
                                label="End Time"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <label>
                        Comments:
                        <textarea value={this.state.comment} onChange={this.handleCommentChange} />
                    </label>
                    <br />
                    <label>
                        Schedule ID:
                        <input type="text" value={this.state.schedule} onChange={this.handleSchedule} />
                    </label> {/*Added this bit back in because I received an error message when testing w/o. Message was "null value in column :schedule_id" of relation "conflict" violates not-null constraint. This will need some TLC. */}
                    <br />
                    <input type="submit" value="Submit" onClick={this.submitConflict}/>
                    
                </form>

            </div>
        );
    }//end of the rendering

}//end of ConflictPage-class

export default ConflictPage;
