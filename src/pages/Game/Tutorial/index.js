import React, {Component, Fragment} from 'react';
import {
    TUTORIAL_START_GAME,
    CARDS_EXAMPLE,
    GAME_MODE_TUTORIAL_PART_1,
    GAME_MODE_TUTORIAL_PART_2,
    GAME_MODE_1_STATE,
    GAME_MODE_2_STATE
} from "./config";  // config from Tutorial.js
import {
    OPPONENT_FRACTION_ARRAY_TUTORIAL,
    OPPONENT_FRACTION_ARRAY,
    GAME_MODE_ARRAY,
} from "../config";    // config from Game.js
import store from '../../../store/index';
import Cards from '../../../components/Cards';
import Attack from "../../../images/icons/light-sabers.png"
import Defence from "../../../images/icons/shield.png";
import HealtPower from "../../../images/icons/hearts.png";
import SelectCardToPlay from '../SelectCardToPlay';
import Modal from '../../../components/Modal'
import Button from "../../../components/Button";
import GameModeAndOpponent from '../../../components/GameModeAndOpponent';
import Clash from "../Clash";
import Clash2 from "../Clash2";
import WelcomeInfo from "../../../components/WelcomeInfo/withLogo";
import './style.scss';

class Tutorial extends Component {
    state = {
        gameState: TUTORIAL_START_GAME.START_GAME,
        gameModeState: GAME_MODE_1_STATE.START,
        playerWon: " ",
        cardClicked: false,
        playRoundClicked: false,
        showModal: true,
    };
    nextGameModeModal = () => {

        if (this.state.gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE) {
            this.setState({
                cardClicked: true,
            });
            setTimeout(() => {
                this.setState({

                    gameModeState: this.state.gameModeState + 1
                })
            }, 750)

        } else {
            this.setState({
                gameModeState: this.state.gameModeState + 1
            });
        }
    };
    playRoundClicker = () => {
        this.setState({
            playRoundClicked: true,
        });
        setTimeout(() => {
            this.setState({
                gameModeState: GAME_MODE_1_STATE.PLAY_ROUND_CLICKING,
            });
        }, 1500);
    };
    gameVisible = () => {
        this.setState({
            gameModeState: GAME_MODE_1_STATE.GAME_VISIBLE
        })
    };
    prevGameModeModal = () => {
        this.setState({
            gameModeState: this.state.gameModeState - 1
        });
    };
    nextModal = () => {
        if (this.state.gameState === TUTORIAL_START_GAME.BEFORE_GAME_MODE_2) {
            this.setState({
                gameState: this.state.gameState + 1,
                gameModeState: GAME_MODE_1_STATE.START
            });
        }
        if (this.state.gameState === TUTORIAL_START_GAME.SELECT_CARDS) {
            if (store.getState().data.deck.length === 5) {
                this.setState({
                    gameState: this.state.gameState + 1
                });
            } else {
                alert('Select five cards before moving to the next stage ')
            }
        } else {
            this.setState({
                gameState: this.state.gameState + 1
            });
        }
        if (this.state.gameState === TUTORIAL_START_GAME.END_GAME_1) {
            const playerCardsData = store.getState().data.deck;
            for (let card of playerCardsData) {
                card.isSelected = '';
            }
        }
    };
    prevModal = () => {
        this.setState({
            gameState: this.state.gameState - 1
        })
    };

    toStart = () => {
        this.setState({
            gameState: TUTORIAL_START_GAME.START_GAME,
            cardClicked: false,
            playRoundClicked: false,
        })
    };

    whoWon = (playerWon) => {
        this.setState({
            playerWon
        })
    };


    render() {
        const {
            gameState,
            showModal,
            gameModeState,
            cardClicked,
            playRoundClicked
        } = this.state;
        return (
            <Fragment>
                {
                    gameState === TUTORIAL_START_GAME.START_GAME &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               onClose={this.props.goBackToStart}
                        >
                            <div className="container mt--50">

                                <h1 className='color-white'>
                                    Welcome to the tutorial
                                </h1>
                                <p className='text-center'>
                                    The tutorial will take you through the entire game process, from choosing cards
                                    to <br/>
                                    the game. You will find out what the individual icons mean, and what rules
                                    prevail<br/>
                                    in individual competitions
                                </p>
                                <p>
                                    Click "<span className="color-yellow">Next step</span>" to start tutorial !
                                </p>
                            </div>
                        </Modal>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_CARDS &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                        >
                            <div className="container mt--50">
                                <p>
                                    At this stage, you will learn what the particular icons of the playing cards
                                    mean, <br/>
                                    and what fraction the particular card belongs to
                                </p>
                                <div className="fullwidth">
                                    <Cards deck={CARDS_EXAMPLE}/>
                                </div>
                                <ul className="legend">
                                    Icons descriptions
                                    <li className='attack'>
                                        <img className='attack-icon' src={Attack} alt="attack icon"/>
                                        <span> - The number of card attacks</span>
                                    </li>
                                    <li className='defence'>
                                        <img className='attack-icon' src={Defence} alt="defence icon"/>
                                        <span> - The number of card defence</span>
                                    </li>
                                    <li className='health'>
                                        <img className='attack-icon' src={HealtPower} alt="health icon"/>
                                        <span> - The number of card health</span>
                                    </li>
                                    <li className='fraction'>
                                        <span className='color-yellow'>
                                        REBELS, JEDI, SITH, BOUNTY HUNTERS
                                        </span>
                                        <span> - The name of the fraction from the card comes from</span>
                                    </li>
                                </ul>
                            </div>
                        </Modal>

                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_CARDS_INFO &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                               customClass="selectCards__bg"
                        >
                            <div className="container mt--50">
                                <p>
                                    Now you have to choose five cards for your deck, which will be used to play the
                                    game. <br/>
                                    The "<span className='color-yellow'>PLAY</span>" button saves the last used player
                                    deck. <br/>
                                    The "<span className='color-yellow'>GO BACK</span>" button will move the player to
                                    the main game menu
                                </p>
                                <p>
                                    Selecting the cards to the deck consists in clicking on the card from the field
                                    "<span className='color-yellow'>YOUR ALL CARDS</span>"
                                </p>
                                <p>
                                    Each card in the deck must be unique
                                </p>
                                <p>
                                    The required number of cards in the deck is 5
                                </p>
                                <p>
                                    When the player selects the same card again, or tries to select more than 5 cards,
                                    the game will display an alert
                                </p>
                            </div>
                        </Modal>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_CARDS &&
                    <div className='tutorial__select_cards'>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <Button
                            text="play"
                            action={this.nextModal}
                        />

                        <SelectCardToPlay
                            playerName="Tutorial"
                        />
                        <Button text="Go back" action={this.prevModal}/>
                    </div>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_OPPONENT &&
                    <Modal open={showModal}
                           nextModal={this.nextModal}
                           prevModal={this.prevModal}
                           onClose={this.props.goBackToStart}
                           prevStepAvaible={true}
                           customClass="selectCards__bg"
                    >
                        <div className="container mt--50">
                            <p>

                                At this stage you can choose which opponent you want to face,<br/> as part of the
                                tutorial it
                                will be "<span className='color-yellow'>JEDI</span>"
                            </p>
                            <GameModeAndOpponent
                                config={OPPONENT_FRACTION_ARRAY}
                            />
                        </div>
                    </Modal>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_OPPONENT &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Click on the card below.
                        </h2>
                        <GameModeAndOpponent
                            config={OPPONENT_FRACTION_ARRAY_TUTORIAL}
                            action={this.nextModal}
                        />
                        <Button text="Go back" action={this.prevModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_MODE &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                               customClass="selectCards__bg"
                        >
                            <div className="container mt--50 center">
                                <p className="fullwidth">
                                    The next step is to choose the game mode. <br/>
                                    We can choose between a simple "<span className='color-yellow'>battle</span>" and a
                                    more complex "<span className='color-yellow'>heroic battle</span>" mode.
                                </p>
                                <GameModeAndOpponent
                                    config={GAME_MODE_ARRAY}
                                />
                            </div>
                        </Modal>
                        <Button text="Go back" action={this.prevModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_GAME_MODE &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Click on the card below.
                        </h2>
                        <GameModeAndOpponent
                            config={GAME_MODE_TUTORIAL_PART_1}
                            action={this.nextModal}
                        />
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.GAME_MODE_1 &&
                    <Fragment>
                        {
                            gameModeState === GAME_MODE_1_STATE.START &&
                            <Modal open={showModal}
                                   nextModal={this.nextGameModeModal}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <div className="container mt--50 center">
                                    <h1 className='color-white'>
                                        HOW TO PLAY
                                    </h1>
                                    <p className="fullwidth">
                                        The cards on the left are yours, choose the card that will take part in the
                                        battle, just click on any.
                                    </p>
                                </div>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.CARD_CLICKING &&
                            <Modal open={showModal}
                                   nextModal={this.gameVisible}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <div className="container mt--50 center">
                                    <h1 className='color-white'>
                                        HOW TO PLAY
                                    </h1>
                                    <p className="fullwidth">
                                        The selected card appeared on the battlefield (in the middle of the board).<br/>
                                        The opponent's card will remain hidden until you click on the "play round"
                                        button
                                    </p>
                                    <p>
                                        Pick your card again and press "play round" to see what happened.
                                    </p>
                                </div>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.PLAY_ROUND_CLICKING &&
                            <Modal open={showModal}
                                   nextModal={this.gameVisible}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <div className="container mt--50 center">
                                    <h1 className='color-white'>
                                        GETTING POINTS
                                    </h1>
                                    <p className="fullwidth">
                                        The point is scored by the player whose card has more attack differences to
                                        defend of opponent.<br/>
                                        Whoever gets more points wins !<br/>
                                    </p>
                                    <p>
                                        Okay, now you are ready to play this mode alone.
                                    </p>
                                    <br/>
                                    <p className="color-yellow">GOOD LUCK !</p>
                                </div>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE &&
                            <Clash
                                opponentName="Jedi"
                                goToShowResult={this.nextModal}
                                whoWon={this.whoWon}
                                goBackToStart={this.toStart}
                                goToNextModal={this.nextGameModeModal}
                                cardClicked={cardClicked}
                                playRoundClicker={this.playRoundClicker}
                                playRoundClicked={playRoundClicked}
                            />
                        }

                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.END_GAME_1 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h1 className="color-yellow">{this.state.playerWon}</h1>
                        <Button text='Play next mode'
                                action={this.nextModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_GAME_MODE_2 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Lets check second game mode.
                        </h2>
                        <GameModeAndOpponent
                            config={GAME_MODE_TUTORIAL_PART_2}
                            action={this.nextModal}
                        />
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.GAME_MODE_2 &&
                    <Fragment>
                        {
                            gameModeState === GAME_MODE_1_STATE.START &&
                            <Modal open={showModal}
                                   nextModal={this.nextGameModeModal}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <div className="container mt--50 center">
                                    <h1 className='color-white'>
                                        HOW TO PLAY HEROIC BATTLE
                                    </h1>
                                    <p className="fullwidth">
                                        In the "<span className="color-yellow">
                                        Heroic battle mode</span>",
                                        player selects the card in the same way (clicking any to the left).
                                    </p>
                                    <p>

                                    </p>
                                </div>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE &&
                            <Clash2
                                opponentName="Jedi"
                                goToShowResult={this.nextModal}
                                whoWon={this.whoWon}
                                goBackToStart={this.toStart}
                            />
                        }
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.END_GAME_2 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h1 className="color-yellow">{this.state.playerWon}</h1>
                        <Button text='Summary'
                                action={this.nextModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.TUTORIAL_END &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.tutorialAvaible}
                               prevStepAvaible={false}
                               nextStepAvaible={false}
                               customClass="selectCards__bg"
                        >
                            <div className="container mt--50 center">
                                <p className="fullwidth">

                                    <span className='color-yellow'>Congratulations!</span> You have just completed the
                                    tutorial.<br/>
                                    You can now build your own deck and deal with other opponents. <br/>
                                    <span className='color-yellow'>Good luck !!</span>

                                </p>
                            </div>
                        </Modal>

                    </Fragment>
                }

            </Fragment>
        )
    }

}

export default Tutorial;
