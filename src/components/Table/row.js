import React from 'react';
import PropTypes from 'prop-types';

const row = ({
                 item,
                 config,
             }) => (
    <div className="table__tr"
    >
        {
            config.map(configObj => (
                    <div className="table__td"
                         key={configObj.id}>
                        {item[configObj.field]}
                    </div>
                )
            )
        }
    </div>
);

row.propTypes = {
    items: PropTypes.array,
    config: PropTypes.array
};

row.defaultProps = {
    items: [],
    config: []
};
export default row