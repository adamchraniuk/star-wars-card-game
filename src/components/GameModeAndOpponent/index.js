import React from 'react';
import PropTypes from "prop-types";
import Button from "../../components/Button";

const GameModeAndOpponent = ({
                            config,
                            action
                        }) => (
    config.map(gameMode => (
        <Button
            key={gameMode.id}
            text={gameMode.name}
            id={gameMode.id}
            action={() => action(gameMode.id)}
        />
    ))
);

export default GameModeAndOpponent;

GameModeAndOpponent.propTypes = {
    config: PropTypes.array,
    selectGameModeFunc: PropTypes.func
};

GameModeAndOpponent.defaultProps = {
    config: [],
    action: () => {
    }
};
