import React, {Component, Fragment} from 'react';
import {APP_STATES} from "../../People/config";
import {PLAYER_DECK} from "../config";
import Cards from "../../../components/Cards";
import Button from '../../../components/Button';
import './style.scss';

class SelectCardToPlay extends Component {

    state = {
        playerDeck: [],
        selectedDeck: [],
        pocket: 50,
        appState: APP_STATES.INIT
    };

    componentDidMount() {
        this.loadData();
        let playerDeck = this.state.playerDeck;
        let selectedDeck = this.state.selectedDeck;
        playerDeck.sort((a, b) => b.cardValue - a.cardValue);
        selectedDeck.sort((a, b) => b.cardValue - a.cardValue);
        this.setState({
            playerDeck,
            selectedDeck,
        })
    };


    loadData = () => {
        this.setState({
            appState: APP_STATES.LOADING
        });

        fetch('http://localhost:8000/AllCards')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                this.setState({
                    playerDeck: response
                })
            }).then(() => {
            fetch('http://localhost:8000/PlayerDeck/' + this.props.playerName)
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
                        selectedDeck: response.deck,
                        pocket: response.pocket
                    });
                    this.props.checkPlayersDeck(this.state.selectedDeck);
                    PLAYER_DECK.PLAYER_DECK = this.state.selectedDeck;
                })
                .catch(error => {
                    this.setState({
                        appState: APP_STATES.ERROR,
                    })
                });
        })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            });

    };

    savePlayerDeck = () => {
        fetch('http://localhost:8000/PlayerDeck/' + this.props.playerName, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deck: this.state.selectedDeck,
                pocket: this.state.pocket,
            }),
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
            .then( () => {
                alert('Your deck has been saved.')
            })
            .catch(error => {
                this.setState({
                    appState: APP_STATES.ERROR,
                })
            })
    };

    selectCard = (cardID) => {
        const selectedCardsArray = this.state.playerDeck;
        let selectedDeck = this.state.selectedDeck;
        const pocket = this.state.pocket;
        let cardValue;
        const selectedCardsArrayLenght = this.state.playerDeck.length;

        for (let i = 0; i < selectedCardsArrayLenght; i++) {
            if (cardID === selectedCardsArray[i].id) {
                const selectedCard = selectedCardsArray[i];
                if (pocket >= selectedCard.cardValue) {
                    cardValue = selectedCard.cardValue;
                    selectedDeck.push(selectedCard);
                    break;

                } else {
                    alert("You don't have enough money");
                    selectedCardsArray.push(selectedCard);
                    return
                }
            }
        }
        selectedCardsArray.sort((a, b) => b.cardValue - a.cardValue);
        selectedDeck.sort((a, b) => b.cardValue - a.cardValue);
        this.setState({
            selectedDeck,
            pocket: pocket - cardValue,
        })
    };

    removeCard = (cardID) => {
        let removedCardsArray = this.state.selectedDeck;
        let playerDeck = this.state.playerDeck;
        let cardValue;
        const pocket = this.state.pocket;
        const removedCardsArrayLenght = this.state.selectedDeck.length;
        for (let i = 0; i < removedCardsArrayLenght; i++) {
            if (cardID === removedCardsArray[i].id) {
                const removedCard = removedCardsArray.splice(i, 1);
                cardValue = removedCard[0].cardValue;
                break;
            }
        }

        playerDeck.sort((a, b) => b.cardValue - a.cardValue);
        removedCardsArray.sort((a, b) => b.cardValue - a.cardValue);
        this.setState({
            playerDeck,
            selectedDeck: removedCardsArray,
            pocket: pocket + cardValue,
        })
    };


    render() {
        const {appState, playerDeck, selectedDeck, pocket} = this.state;
        return (
            <Fragment>
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <Button text="Save your deck" action={this.savePlayerDeck}/>
                        <h1 className='color-white'>
                            Choose your cards
                        </h1>
                        <div className="card__boards"
                             onClick={() => this.props.checkPlayersDeck(selectedDeck)}>
                            <h2 className="color-yellow">Your chosen cards</h2>
                            <Cards
                                deck={selectedDeck}
                                action={this.removeCard}
                                nameClass="selected__cards"
                                pocket={pocket}
                            />

                            <h2 className='color-orange'>Pick your cards</h2>
                            <Cards
                                deck={playerDeck}
                                action={this.selectCard}
                                nameClass="all__player__cards"
                            />
                        </div>
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default SelectCardToPlay;