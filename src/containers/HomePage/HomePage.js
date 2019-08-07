import React, { Component } from 'react';
import styles from './HomePage.module.scss';
import Card from '../../components/UI/Card/Card';
import axios from '../../axios';
import { connect } from 'react-redux';

class HomePage extends Component{

    state = {
        ownedPoke: 0,
        totalCount: 0,
        pokemon: [],
        nextPokeData: '',
    }

    componentDidMount = async () => {
        // this.props.getAllPokemon();
        let detail = [];
        const pokeData = await axios.get('pokemon');

        for (let i = 0; i < pokeData.data.results.length; i++) {
            const detailPokeData = await axios.get(pokeData.data.results[i].url);

            detail.push(detailPokeData.data);
        }

        this.setState( (prevState) => {
            let newState = {
                totalCount: pokeData.data.count,
                pokemon: [...prevState.pokemon, ...detail],
                nextPokeData: pokeData.data.next
            };

            return newState;
        } );
    }

    onClickPokemonDetail = (pokemonName) => {
        this.props.history.push('/pokemon/'+pokemonName);
    }

    onClickLoadMoreBtn = async () => {
        const pokeData = await axios.get(this.state.nextPokeData);

        let detail = [];

        for (let i = 0; i < pokeData.data.results.length; i++) {
            const detailPokeData = await axios.get(pokeData.data.results[i].url);

            detail.push(detailPokeData.data);
        }


        this.setState ( prevState => {
            let newData = {...prevState}
            newData.nextPokeData = pokeData.data.next;
            newData.pokemon = [...newData.pokemon, ...detail]
            // console.log(detail);
            return newData;
        });        
    }

    render(){

        let listContent = [];
        let ownedPoke = 0;
        
        if( typeof this.state.pokemon !== undefined
            && this.state.pokemon.length > 0){
            


            listContent = this.state.pokemon.map( item => {

                if(this.props.pokedex.length > 0
                    && typeof this.props.pokedex !== undefined)
                {
                    for(let i = 0; i < this.props.pokedex.length; i++){
                        if(item.name === this.props.pokedex[i].detail.name){
                            
                            ownedPoke = this.props.pokedex[i].ownedPoke;
                            break;
                        } 
                        else{
                            ownedPoke = 0;
                        }
                    }
                }

                return (
                    <Card 
                        key = {item.id}
                        pokemon = {item}
                        ownedPoke = {ownedPoke}
                        onClickPokemonDetail = {this.onClickPokemonDetail}    
                    />
                );
            });
        }
        return(
            <>
                <div className = {styles.page}>
                    <div  className = {styles.totalPokeAndSearchBarContainer}>
                        {/* total pokemon */}
                        <div className = {styles.totalPokeContainer}> {this.state.totalCount} Pokemons </div>
                    </div>
                    {/* pokemon list container*/}
                    <div className = {styles.listContainer}>
                        {listContent}
                    </div>
                    {/* load more button */}
                    <div className = {styles.loadMoreBtn} onClick = {this.onClickLoadMoreBtn}>
                        More Pokemon
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        pokedex: state.pokemon.pokedex
    }
}


export default connect(mapStateToProps)(HomePage);