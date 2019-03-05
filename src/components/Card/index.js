import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import logo from "../../images/sw_logo.png"
import Avatar from './avatar';
import CardStats from './cardStats';
import './styles.scss';

const card = ({
                  name,
                  attack,
                  selectTheCard,
                  id,
                  defence,
                  avatar,
                  cardEnable,
                  isVisible,
                  fraction,
                  healthPower,
                  cardValue,
              }) => (
    <Fragment>
        {cardEnable &&
        <div className={'card ' +
        (isVisible && ' selected ') +
        (fraction === 'Jedi' ? ' light__side ' : '' ) +
        (fraction === 'Sith' ? ' dark__side ' : '' ) +
        (fraction === 'Rebels' ? ' rebels ' : '' ) +
        (fraction === 'bounty_hunter' ? ' bounty__hunter ' : '')
        }
             onClick={ () => selectTheCard(id)}>
            <div className="card__flip">
                <div className="card__flip--back">
                    <img className='logo' src={logo} title='star wars logo' alt="star wars logo"/>
                </div>
                <div className="card__flip--front">
                    {avatar &&
                    <Avatar avatar={avatar}/>
                    }
                    <CardStats
                        attack={attack}
                        defence={defence}
                        name={name}
                        fraction={fraction}
                        healthPower={healthPower}
                        cardValue={cardValue}
                    />
                </div>

            </div>
        </div>
        }
    </Fragment>
);

card.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defence: PropTypes.number.isRequired,
    selectTheCard: PropTypes.func,
    avatar: PropTypes.string,
    cardEnable: PropTypes.bool,
    isVisible: PropTypes.bool,
    cardValue: PropTypes.number.isRequired,
    fraction: PropTypes.string.isRequired,
    healthPower: PropTypes.number.isRequired
};

card.defaultProps = {
    selectTheCard: () => {
    },
    avatar: '../../images/sw_logo.png',
    cardEnable: true,
    isVisible: true
};


export default card;
