import React, {Component} from 'react';
import {APP_STATES, TABLE_CONFIG} from './config'
import WelcomeInfo from '../../components/WelcomeInfo/withLogo';
import Table from "../../components/Table";
import {Link} from "react-router-dom";
import './style.scss'

class PeoplePage extends Component {
    state = {
        appState: APP_STATES.INIT,
        people: [],
    };

    loadData = () => {
        this.setState({
            appState: APP_STATES.LOADING
        });

        fetch('http://localhost:8000/people')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                this.setState({
                    appState: APP_STATES.RESULTS,
                    people: response
                })
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {
            appState,
            people
        } = this.state;
        return (
            <div className="background-full-screen">
                <div className="container">
                    <WelcomeInfo paragraph="Long time ago ..."/>
                    {
                        appState === APP_STATES.LOADING
                            ?
                            <p className="c-white"> Loading ! </p>
                            :
                            null
                    }
                    {
                        appState === APP_STATES.ERROR
                            ?
                            <p> Error ! Try again later</p>
                            :
                            null
                    }
                    {
                        appState === APP_STATES.RESULTS
                            ?
                            <>
                                <Table config={TABLE_CONFIG}
                                       items={people}
                                />
                                <Link to="/people/add" className="btn edit-btn">
                                    Add new person
                                </Link>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default PeoplePage;