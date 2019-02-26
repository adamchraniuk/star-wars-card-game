import React from 'react';
import PropTypes from 'prop-types';

class AppEditForm extends React.Component {
    state ={
        name: this.props.name,
        height: this.props.height,
        mass: this.props.mass,
        birth_year: this.props.birth_year,

        error: {
            name: false,
            height: false,
            mass: false,
            birth_year: false,
        }
    }

    messages = {
        nameError:"fill in the field",
        heightError:"fill in the field, don't use space",
        massError: "fill in the field, don't use space",
        birthError:"fill in the field and add BBY at the end",
    }

    handleChange = (e)=>{
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        })
    }

    formValidation = ()=>{
        let name = false;
        let height = false;
        let mass = false;
        let birth_year = false;
        let correct = false;

        if(this.state.name.length > 0 && this.state.name.indexOf(" ") !== 0){
            name = true;
        }

        if(this.state.height.length > 0 && this.state.height.indexOf(" ") === -1 ){
            height = true;
        }

        if(this.state.mass.length > 0 && this.state.mass.indexOf(" ") === -1 ){
            mass = true;
        }

        if(this.state.birth_year.length > 0 && this.state.birth_year.indexOf(" ") === -1 && this.state.birth_year.indexOf("BBY") > 0 && this.state.birth_year.lastIndexOf("BBY")=== this.state.birth_year.length - 3){
            birth_year = true;
        }

        if(name && height && mass && birth_year){
            correct=true;
        }
        return({
            correct,
            name,
            height,
            mass,
            birth_year,
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const { name, height, mass, birth_year} = this.state;
        const validation = this.formValidation();
        if(validation.correct){
            this.setState({
                error: {
                    name: false,
                    height:false,
                    mass:false,
                    birth_year:false,
                }
            })
            this.props.saveChanges(name, height, mass, birth_year)
        } else{
            this.setState({
                error: {
                    name: !validation.name,
                    height: !validation.height,
                    mass: !validation.mass,
                    birth_year: !validation.birth_year,
                }
            })
        }
    }


    render(){

        const { name, height, mass, birth_year} = this.state;
        return(
            <form className="edit-form" onSubmit={this.handleSubmit}>
                <label>
                    Name:<input onChange={this.handleChange} type="text" name='name' value={name} placeholder="name"/>
                    {this.state.error.name && <span>{this.messages.nameError}</span>}
                </label>
                <label>
                    Height:<input onChange={this.handleChange} type="text" name='height' value={height} placeholder="height"/>
                    {this.state.error.height && <span>{this.messages.heightError}</span>}
                </label>
                <label>
                    Mass:<input onChange={this.handleChange} type="text" name='mass' value={mass} placeholder="mass"/>
                    {this.state.error.mass && <span>{this.messages.massError}</span>}
                </label>
                <label>
                    Birth year:<input onChange={this.handleChange} type="text" name='birth_year' value={birth_year} placeholder="Birth year e.g: 19BBY"/>
                    {this.state.error.birth_year && <span>{this.messages.birthError}</span>}
                </label>
                <button className="btn">Submit</button>
            </form>
        )
    }
}

AppEditForm.propType = {
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    birth_year: PropTypes.string.isRequired,
}

export default AppEditForm;