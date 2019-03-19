import React, {Component, Fragment} from 'react';
import {
    APP_STATES,
    PLAYER_DECK
} from "../config";
import Cards from "../../../components/Cards/";
import Button from '../../../components/Button';
import connect from "react-redux/es/connect/connect";
import {fetchData, fetchPlayerCards, saveallCards} from '../../../actions'
import './style.scss';

class SelectCardToPlay extends Component {

    state = {
        allCards: [],
        playerCards: [],
        pocket: 50,
        appState: APP_STATES.INIT,
        playerActive: 0,
        otherActive: 0
    };

    componentDidMount() {
        const {
            dispatch,
            playerName
        } = this.props;
        dispatch(fetchData());
        dispatch(fetchPlayerCards(playerName));
        this.setState({
            allCards: this.state.allCards.sort((a, b) => b.cardValue - a.cardValue),
            playerCards: this.state.playerCards.sort((a, b) => b.cardValue - a.cardValue),
        })
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.playerCards && nextProps.allCards) {
            this.setState({
                allCards: nextProps.allCards,
                playerCards: nextProps.playerCards,
                pocket: nextProps.pocket,
                appState: APP_STATES.RESULTS,
            });
            this.props.checkPlayersDeck(nextProps.playerCards);
            PLAYER_DECK.PLAYER_DECK = nextProps.playerCards
        } else if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else {
            this.setState({
                appState: APP_STATES.LOADING,
            });
        }
    }

    selectCard = (cardID) => {
        const selectedCardsArray = this.state.allCards;
        let playerCards = this.state.playerCards;
        const pocket = this.state.pocket;
        let cardValue;
        const selectedCardsArrayLenght = this.state.allCards.length;

        for (let i = 0; i < selectedCardsArrayLenght; i++) {
            if (cardID === selectedCardsArray[i].id) {
                const selectedCard = selectedCardsArray[i];
                if (pocket >= selectedCard.cardValue) {
                    cardValue = selectedCard.cardValue;
                    const checkForDuplicateOfCards = playerCards.find((element, index) => {
                        return playerCards[index].id === selectedCard.id
                    });
                    if (checkForDuplicateOfCards === undefined) {
                        playerCards.push(selectedCard);
                        this.setState({
                            playerCards: playerCards,
                            pocket: pocket - cardValue,
                        });
                    } else {
                        alert('You have this card already')
                    }
                    break;
                } else {
                    alert("You don't have enough money");
                    selectedCardsArray.push(selectedCard);
                    return
                }
            }
        }
        selectedCardsArray.sort((a, b) => b.cardValue - a.cardValue);
        playerCards.sort((a, b) => b.cardValue - a.cardValue);
    };

    removeCard = (cardID) => {
        let removedCardsArray = this.state.playerCards;
        let allCards = this.state.allCards;
        let cardValue;
        const pocket = this.state.pocket;
        const removedCardsArrayLenght = this.state.playerCards.length;
        for (let i = 0; i < removedCardsArrayLenght; i++) {
            if (cardID === removedCardsArray[i].id) {
                const removedCard = removedCardsArray.splice(i, 1);
                cardValue = removedCard[0].cardValue;
                break;
            }
        }

        allCards.sort((a, b) => b.cardValue - a.cardValue);
        removedCardsArray.sort((a, b) => b.cardValue - a.cardValue);
        this.setState({
            allCards,
            playerCards: removedCardsArray,
            pocket: pocket + cardValue,
        })
    };

    render() {

        const {
            appState,
            allCards,
            playerCards,
            pocket,
            playerActive,
            otherActive
        } = this.state;
        const {
            dispatch,
            checkPlayersDeck,
            playerName
        } = this.props;

        return (
            <Fragment>
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <Button text="Save your deck" action={() => dispatch(saveallCards(playerName))}/>
                        <h1 className='color-white'>
                            Choose your cards
                        </h1>
                        <div className="card__boards"
                             onClick={() => checkPlayersDeck(playerCards)}>
                            <h2 className="color-yellow">
                                Your current deck</h2>

                            <Cards
                                deck={playerCards}
                                action={this.removeCard}
                                nameClass="selected__cards"
                                pocket={pocket}
                                active={playerActive}
                            />
                            <h2 className='color-orange'>Buy a new card</h2>
                            <Cards
                                deck={allCards}
                                action={this.selectCard}
                                nameClass="all__player__cards"
                                active={otherActive}
                            />
                        </div>
                    </Fragment>
                }
                {
                    appState === APP_STATES.ERROR &&
                    <h1 className='color-white'>
                        {this.props.error.message}
                    </h1>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    allCards: state.data.allCards,
    playerCards: state.data.playerCards,
    pocket: state.data.pocket,
    loading: state.loading,
    error: state.error,
});


export default connect(mapStateToProps)(SelectCardToPlay);
