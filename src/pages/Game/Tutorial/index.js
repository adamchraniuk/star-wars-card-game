import React, {Component, Fragment} from 'react';
import {
    TUTORIAL_START_GAME,
    CARDS_EXAMPLE
} from "./config";
import Cards from '../../../components/Cards';
import Attack from "../../../images/icons/light-sabers.png"
import Defence from "../../../images/icons/shield.png";
import HealtPower from "../../../images/icons/hearts.png";
import SelectCardToPlay from '../SelectCardToPlay';
import Modal from '../../../components/Modal'
import './style.scss';
import Button from "../../../components/Button";
import GameModeAndOpponent from '../../../components/GameModeAndOpponent';
import ToolTip from 'react-portal-tooltip';
import {
    OPPONENT_FRACTION_ARRAY_TUTORIAL,
    OPPONENT_FRACTION_ARRAY
} from "../config";

class Tutorial extends Component {
    state = {
        gameState: TUTORIAL_START_GAME.START_GAME,
        playerWon: " ",
        showModal: true,
        isTooltipActive: false
    };

    showTooltip() {
        this.setState({isTooltipActive: true})
    }

    hideTooltip() {
        this.setState({isTooltipActive: false})
    }

    nextModal = () => {
        this.setState({
            gameState: this.state.gameState + 1
        })
    };
    prevModal = () => {
        this.setState({
            gameState: this.state.gameState - 1
        })
    };

    render() {
        const {
            gameState,
            showModal
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
                        <Button
                            text="play"
                            action={this.nextModal}
                        />
                        <SelectCardToPlay playerName="Tutorial"/>
                        <div className='arrow'>
                            <p>
                                Click on card
                            </p>
                        </div>
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
                        <h2 className="c-white">
                            Click on the card below.
                        </h2>
                        <GameModeAndOpponent
                            config={OPPONENT_FRACTION_ARRAY_TUTORIAL}
                            action={this.selectOpponent}
                        />
                        <Button text="Go back" action={this.prevModal}/>
                    </Fragment>
                }
            </Fragment>
        )
    }

}

export default Tutorial;
