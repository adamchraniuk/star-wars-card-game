import React from 'react';
import PropTypes from "prop-types";
import Button from "../../components/Button";

const SelectGameMode = ({
                            config,
                            selectGameModeFunc
                        }) => (
    config.map(gameMode => (
        <Button
            key={gameMode.id}
            text={gameMode.name}
            id={gameMode.id}
            action={() => selectGameModeFunc(gameMode.id)}
        />

    ))

);

export default SelectGameMode;

SelectGameMode.propTypes = {
    config: PropTypes.array,
    selectGameModeFunc: PropTypes.func
};

SelectGameMode.defaultProps = {
    config: [],
    selectGameModeFunc: () => {}
};
