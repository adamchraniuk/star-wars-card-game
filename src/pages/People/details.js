import React, {Component, Fragment} from 'react';
import WelcomeInfo from '../../components/WelcomeInfo'
import {APP_STATES, DETAILS_CONFIG} from "./config";
import Table from '../../components/Table';
import Button from '../../components/Button';

class Details extends Component {

    state = {
        appState: APP_STATES.LOADING,
        personDetails: {},
        personId: this.props.match.params.id,
    };

    componentDidMount() {
        this.loadPerson();
    }

    loadPerson = () => {
        this.setState({
            appState: APP_STATES.LOADING
        });

        fetch('http://localhost:8000/people/' + this.state.personId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    this.props.history.push('/404');
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                this.setState({
                    appState: APP_STATES.RESULTS,
                    personDetails: response
                })
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };
    goBack = () => {
        this.props.history.push('/people');
    };

    removePerson = () => {
        fetch('http://localhost:8000/people/' + this.state.personId, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    this.props.history.push('/404');
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };

    render() {
        const {
            appState,
            personDetails
        } = this.state;
        return (
            <div className="details-page container">
                <WelcomeInfo header='Person Details'/>
                {
                    appState === APP_STATES.LOADING &&
                    <p>Loading, please wait.</p>
                }
                {
                    appState === APP_STATES.ERROR &&
                    <p>Error !
                        <button onClick={this.goBack}> Return</button>
                    </p>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <p>Name: {personDetails.name}</p>
                        <p>Mass: {personDetails.mass}</p>
                        <p>Height: {personDetails.height}</p>
                        <p>Hair: {personDetails.hair_color}</p>
                        <p>Skin: {personDetails.skin_color}</p>
                        <p>Eyes: {personDetails.eye_color}</p>
                        <Button text="delete this person" action={this.removePerson}/>
                        <button onClick={this.goBack}> Return</button>
                    </Fragment>
                }
            </div>
        )
    }
}

export default Details;