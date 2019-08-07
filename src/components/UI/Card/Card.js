import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
    let title = props.isPokedex ? props.nickname : props.pokemon.name;
    let onClickBtn = props.isPokedex ? () => props.onClickReleaseOwnedPoke(props.id) : () => props.onClickPokemonDetail(props.pokemon.name)
    let btnTitle = props.isPokedex ? 'Release' : 'Detail';
    let ownedPoke = props.isPokedex ? '' : 'Owned: '+ props.ownedPoke;

    return(
        <div className = {styles.cardContainer}>
            <div className = {styles.cardImg}><img src = {props.pokemon.sprites.front_default} alt = {props.pokemon.name}/></div>
            <div className = {styles.cardTitle}>{title}</div>
            <div className = {styles.cardDesc}>{ownedPoke}</div>
            <div className = {styles.cardBtn} onClick = {onClickBtn}>
                {btnTitle}
            </div>
        </div>
    );
}

export default Card;