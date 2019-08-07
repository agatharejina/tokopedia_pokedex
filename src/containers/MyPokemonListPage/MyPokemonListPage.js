import React, { Component } from 'react';
import styles from './MyPokemonListPage.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Card from '../../components/UI/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class MyPokemonListPage extends Component{
    state = {
        isModalHidden: true,
        releasePokeId: ''
    }

    onClickReleaseOwnedPoke = (id) => {
        this.setState( prevState => {
            let newData = {...prevState};
            newData.isModalHidden = !this.state.isModalHidden;
            newData.releasePokeId = id;

            return newData;
        })
    }

    onClickCloseBtn = () => {
        this.setState( prevState => {
            let newData = {...prevState};
            newData.isModalHidden = !this.state.isModalHidden;

            return newData;
        })
    }

    onClickModalBtn = (respond) => {
        if(respond === 'yes') {
            this.props.onReleasePokemon(this.state.releasePokeId);
        }
        this.setState( prevState => {
            let newData = {...prevState};
            newData.isModalHidden = !this.state.isModalHidden;

            return newData;
        })
    }
    
    render(){
        const pokedexContent = [];
        let content = '';

        let modalContent = this.state.isModalHidden ? '' : (
            <>
                <Backdrop
                    onClickBackDrop = {this.onClickCloseBtn}
                />
                <Modal 
                    isRelease = {true}
                    onClickCloseBtn = {this.onClickCloseBtn}
                    onClickActionBtn = {this.onClickModalBtn}
                />
            </>
        );

        if(this.props.pokedex.length > 0){
            content = (
                <>
                    <div className = {styles.totalPokeCaught}>
                        {this.props.totalPokeCaught} Pokemon Caught
                    </div>
                    <div className = {styles.listContainer}>
                        {pokedexContent}
                    </div>
                </>
            );
        } else {
            content = (
                <div className = {styles.uncaughtPokeContent}>No poke caught yet</div>
            );
        }

        for(let i = 0;  i < this.props.pokedex.length; i++){
            for(let j = 0; j < this.props.pokedex[i].nicknames.length; j++){
                pokedexContent.push(
                    <Card
                        key = {this.props.pokedex[i].nicknames[j].id}
                        isPokedex = {true}
                        id = {this.props.pokedex[i].nicknames[j].id}
                        pokemon = {this.props.pokedex[i].detail}
                        nickname = {this.props.pokedex[i].nicknames[j].nickname}
                        ownedPoke = {this.props.pokedex[i].ownedPoke}
                        onClickReleaseOwnedPoke = {this.onClickReleaseOwnedPoke}
                    />
                )
            }
        }

        return(
            <div className = {styles.page}>
                {modalContent}
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pokedex: state.pokemon.pokedex,
        totalPokeCaught: state.pokemon.totalPokeCaught
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReleasePokemon: (id) => dispatch(actions.releasePoke(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonListPage);