import React from 'react';
import PropTypes from "prop-types"
import Card from '../../components/Card';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './style.scss';


const SelectedCards = ({
                           deck,
                           action,
                           nameClass,
                           pocket
                       }) => (
    <div className={nameClass + ' selectedCards'}>

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
                        name={name}
                        attack={attack}
                        defence={defence}
                        selectTheCard={action}
                        id={id}
                        avatar={avatar}
                        cardValue={cardValue}
                        fraction={fraction}
                        healthPower={healthPower}
                        key={id}
                    />
                )
            }
        )}
        <div className='pocket'>
            {pocket ? <h1 className='color-white'>
                Pocket: {pocket}$</h1> : null}
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