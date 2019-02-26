import React, {Component, Fragment} from 'react';
import {APP_STATES, GAME_DECKS, GAME_CONFIG} from './config';
import WelcomeInfo from "../../components/WelcomeInfo/withLogo";
import Button from "../../components/Button";
import Card from "../../components/Card";
import './style.scss';

class Game extends Component {
    state = {
        appState: APP_STATES.INIT,
        round: 1,
        cardFromOpponentDeck: 0,
        selectedCard: 0,
        roundPlayed: false,
        actualPlayerDeck: [],
        isVisible: false
    };

    componentDidMount() {
        this.setPlayerDeck();
    }

    selectTheCard = (id) => {

        this.setState({
            selectedCard: id
        });
    };

    changeState = () => {
        const {
            appState,
            round,
            isVisible
        } = this.state;
        if (appState === APP_STATES.INIT) {

            this.setState({
                appState: APP_STATES.IN_GAME,
            })

        } else if (appState === APP_STATES.IN_GAME) {

            const cardFromOpponentDeck = Math.floor(Math.random() * GAME_DECKS.opponentDeck.length);

            this.setState({
                round: round + 1,
                cardFromOpponentDeck: cardFromOpponentDeck,
                selectedCard: 0,
                roundPlayed: false,
                isVisible: !isVisible
            });

            if (round === GAME_CONFIG.ROUND_LIMIT) {
                this.setState({
                    appState: APP_STATES.END_GAME,
                    isVisible: false
                });
            }

        } else {
            this.setState({
                appState: APP_STATES.INIT,
                round: 1,
            })
        }
    };

    setPlayerDeck = () => {
        this.setState({
            actualPlayerDeck: GAME_DECKS.playerDeck
        })
    };

    playThisRound = () => {
        let playerDeckArray = this.state.actualPlayerDeck;
        const playerDeckArrayLength = GAME_DECKS.playerDeck.length;

        for (let i = 0; i < playerDeckArrayLength; i++) {
            if (playerDeckArray[i].id === this.state.selectedCard) {
                playerDeckArray[i].cardEnable = false;
            }
        }

        if (this.state.round === GAME_CONFIG.ROUND_LIMIT) {
            for (let i = 0; i < playerDeckArrayLength; i++) {
                playerDeckArray[i].cardEnable = true;
            }
        }
        this.setState({
            roundPlayed: true,
            isVisible: !this.state.isVisible,
            actualPlayerDeck: playerDeckArray
        });
    };

    render() {

        const {
            appState,
            round,
            cardFromOpponentDeck,
            selectedCard,
            roundPlayed,
            actualPlayerDeck,
            isVisible
        } = this.state;

        const {
            playerDeck,
            opponentDeck
        } = GAME_DECKS;

        return (
            <div className="details-page background-full-screen">
                <WelcomeInfo paragraph='Person Details'/>
                {
                    appState === APP_STATES.INIT &&
                    <Button text="Start game !"
                            action={this.changeState}/>
                }
                {
                    appState === APP_STATES.IN_GAME &&
                    <Fragment>
                        <div className="container game-board in-game">
                            <h1 className="c-white">
                                Round: {round}
                            </h1>
                            <div className="dark-side player-active-card">
                                {playerDeck.map(card => (
                                    selectedCard === card.id &&
                                    <Card key={card.id}
                                          attack={card.attack}
                                          defence={card.defence}
                                          name={card.name}
                                          avatar={card.avatar}
                                          id={card.id}
                                          isVisible={isVisible}
                                    />
                                ))}
                            </div>
                            <div className="button-space">
                                {selectedCard !== 0 &&
                                <Fragment>
                                    {!roundPlayed ?
                                        <Button text={`Play this round!`}
                                                action={this.playThisRound}/>
                                        :
                                        round !== GAME_CONFIG.ROUND_LIMIT ?
                                            <Button text={`Go to next round.`}
                                                    action={this.changeState}/>
                                            :
                                            <Button text={`Finish game.`}
                                                    action={this.changeState}/>
                                    }
                                </Fragment>
                                }
                            </div>
                            <div className="light-side opponent">
                                <Card attack={opponentDeck[cardFromOpponentDeck].attack}
                                      defence={opponentDeck[cardFromOpponentDeck].defence}
                                      name={opponentDeck[cardFromOpponentDeck].name}
                                      avatar={opponentDeck[cardFromOpponentDeck].avatar}
                                      isVisible={isVisible}/>
                            </div>
                        </div>
                        {!roundPlayed ?
                            <div className="player-deck container">
                                {actualPlayerDeck.map((card, index) => (
                                    index < GAME_CONFIG.ROUND_LIMIT &&
                                    <Card key={card.id}
                                          attack={card.attack}
                                          defence={card.defence}
                                          name={card.name}
                                          id={card.id}
                                          avatar={card.avatar}
                                          cardEnable={card.cardEnable}
                                          selectTheCard={this.selectTheCard}/>
                                ))}
                            </div>
                            : <div className="empty-div">
                            </div>}
                    </Fragment>
                }
                {
                    appState === APP_STATES.END_GAME &&
                    <Fragment>
                        <div className="container game-board">
                            <h1 className="c-white">Game finished !</h1>
                            <Button text="Restart game"
                                    action={this.changeState}/>
                        </div>
                        <div className="empty-div">
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default Game;