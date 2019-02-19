import React, {Component} from 'react';
import {APP_STATES, TABLE_CONFIG} from './config'
import Button from '../../components/Button';
import WelcomeInfo from '../../components/WelcomeInfo';
import Table from "../../components/Table"
import Footer from '../../components/Footer';

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

    render() {
        const {
            appState,
            people
        } = this.state;
        return (
            <div>
                <div className="container">
                    <WelcomeInfo header="Star Wars" paragraph="long time ago"/>
                    {
                        appState === APP_STATES.INIT
                            ?
                            <Button className="btn" id="" text="Load people" action={this.loadData}/>
                            :
                            null
                    }
                    {
                        appState === APP_STATES.LOADING
                            ?
                            <p> Loading ! </p>
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
                            <Table config={TABLE_CONFIG}
                                   items={people}
                            />
                            :
                            null

                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default PeoplePage;