import React from 'react';
import PropTypes from "prop-types"
import Card from '../../components/Card';
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';
import './style.scss';

const SelectedCards = ({
                           deck,
                           action,
                           nameClass,
                           pocket,
                           active
                       }) => (
    <div className={nameClass + ' selectedCards'}>
        <StyleRoot>
            <Coverflow
                displayQuantityOfSide={2}
                currentFigureScale={.9}
                otherFigureScale={.5}
                navigation={true}
                enableHeading={false}
                active={active}
                enableScroll={false}
                media={{
                    '@media (max-width: 992px)': {
                        width: '100%',
                        height: '300px',
                    },
                    '@media (min-width: 992px)': {
                        width: '100%',
                        height: '640px'
                    }
                }}
            >
                {deck.map((card) => {
                        const {
                            id,
                            name,
                            fraction,
                            defence,
                            healthPower,
                            attack,
                            avatar,
                            cardValue,
                        } = card;
                        return (
                            <Card
                                key={id}
                                name={name}
                                attack={attack}
                                defence={defence}
                                selectTheCard={action}
                                id={id}
                                avatar={avatar}
                                cardValue={cardValue}
                                fraction={fraction}
                                healthPower={healthPower}

                            />
                        )
                    }
                )}
            </Coverflow>
        </StyleRoot>
        <div className='pocket'>
            {pocket ? <h1 className='color-white'>
                Pocket: {pocket}<span>$</span></h1> : null}
        </div>
    </div>

);

SelectedCards.propTypes = {
    deck: PropTypes.array.isRequired,
    action: PropTypes.func,
    nameClass: PropTypes.string,
    pocket: PropTypes.number,
};

SelectedCards.defaultProps = {
    nameClass: "all__player__cards",
    pocket: 0,
};

export default SelectedCards;