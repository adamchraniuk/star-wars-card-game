import React, {Component} from 'react';
import {Link} from "react-router-dom";


class WelcomePage extends Component {
    render() {
        return (
            <Link to="/people"
                  className="enter-btn">
                ENTER !
            </Link>
        )
    }
}

export default WelcomePage;