import React, {Component} from 'react';
import WelcomeInfo from '../../components/WelcomeInfo/withLogo'
import {APP_STATES} from "./config";
import Button from '../../components/Button';
import AddEditForm from './addEditForm';
import './style.scss'

class Edit extends Component {

    state = {
        appState: APP_STATES.LOADING,
        personDetails: {},
        personId: this.props.match.params.id,
    };

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
    editPersonData = (newName, newHeight, newMass, newbirth_year) => {
        this.setState({
            appState: APP_STATES.LOADING
        });

        const person = {
            "name": newName,
            "height": newHeight,
            "mass": newMass,
            "birth_year": newbirth_year
        };


        fetch('http://localhost:8000/people/' + this.state.personId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
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

                this.setState({
                    appState: APP_STATES.RESULTS,
                    // personDetails: person
                })
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };

    redirect = () => {
        this.props.history.push('/people/' + this.state.personId)
    };

    componentDidMount() {
        this.loadPerson()
    }

    render() {
        const {
            personDetails,
            appState
        } = this.state;
        return (
            <div className="background-full-screen">
                <div className="container">
                    <WelcomeInfo paragraph="Long time ago ..."/>
                    {
                        appState === APP_STATES.RESULTS &&
                        <>
                            <AddEditForm
                                name={personDetails.name}
                                height={personDetails.height}
                                mass={personDetails.mass}
                                birth_year={personDetails.birth_year}
                                saveChanges={this.editPersonData}
                            />
                            <Button text='Return' action={this.redirect}/>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default Edit;