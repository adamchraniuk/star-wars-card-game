import React, {Component} from 'react';
import WelcomeInfo from '../../components/WelcomeInfo/withLogo'
import {APP_STATES} from "./config";
import Button from '../../components/Button';
import AddEditForm from './addEditForm';
import './style.scss';
import uuid from 'uuid';

class Add extends Component {

    state = {
        appState: APP_STATES.RESULTS,
        personDetails: {},
    };

    addPersonData = (newName, newHeight, newMass, newbirth_year) => {
        this.setState({
            appState: APP_STATES.LOADING
        });

        const person = {
            id: uuid(),
            name: newName,
            height: newHeight,
            mass: newMass,
            birth_year: newbirth_year
        };

        fetch('http://localhost:8000/people/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        })
            .then(response => {
                if (response.ok) {
                    this.props.history.push('/people/' + person.id)
                } else if (response.status === 404) {
                    this.props.history.push('/404');
                } else {
                    throw new Error('Error!');
                }
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };

    redirect = () => {
        this.props.history.push('/people/')
    };


    render() {
        const {
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
                                name=''
                                height=''
                                mass=''
                                birth_year=''
                                saveChanges={this.addPersonData}
                            />
                            <Button text='Return' action={this.redirect}/>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default Add;