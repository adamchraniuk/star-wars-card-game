import React from 'react';
import PropTypes from 'prop-types';

class AppEditForm extends React.Component {
    state = {
        name: this.props.name,
        height: this.props.height,
        mass: this.props.mass,
        birth_year: this.props.birth_year,
    };

    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name, height, mass, birth_year} = this.state;
        this.props.saveChanges(name, height, mass, birth_year)
    };

    render() {
        const {name, height, mass, birth_year} = this.state;
        return (
            <form className='edit-form' onSubmit={this.onSubmit}>
                <label>
                    Name:
                    <input onChange={this.handleChange}
                           type="text" name='name'
                           value={name}/>
                </label>
                <label>
                    Height:
                    <input onChange={this.handleChange}
                           type="text" name='height'
                           value={height}/>
                </label>
                <label>
                    Mass:
                    <input onChange={this.handleChange}
                           type="text" name='mass'
                           value={mass}/>
                </label>
                <label>
                    Birth Year:
                    <input onChange={this.handleChange}
                           type="text" name='birth_year'
                           value={birth_year}/>
                </label>
                <button className='btn'>
                    Save Changes
                </button>
            </form>
        )
    }
}

AppEditForm.propType = {
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    birth_year: PropTypes.string.isRequired,
    saveChanges: PropTypes.func.isRequired
};

export default AppEditForm;