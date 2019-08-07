import React, { Component } from 'react';
import styles from './PokemonDetailPage.module.scss';
import axios from '../../axios';
import {connect} from 'react-redux';
import { TiArrowLeftThick } from "react-icons/ti";
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';

class PokemonDetailPage extends Component{

    state = {
        pokeDetailData: null,
        isCaught: false,
        nickNameVal: '',
        ownedPoke: 0,
        activeMenu: 'types',
        isModalHidden: true
    }

    componentDidMount = async () => {
        const pokeData = await axios.get('pokemon/'+this.props.match.params.name);

        this.setState( prevState => {
            let newState = {
                ...prevState,
                pokeDetailData: pokeData.data
            }
            return newState;
        });
    }

    onClickBackBtn = () => {
        this.props.history.goBack();
    }

    onClickCatchBtn = () => {
        let probability = 0;
        probability = Math.round( Math.random() * 100 ) ;
        
        if(probability > 50){
            this.setState( prevState => {
                let newData = {...prevState};
                newData.isCaught = !this.state.isCaught;

                return newData;
            })
        }
        else{
            this.setState( prevState => {
                let newData  = {...prevState};
                newData.isModalHidden = !this.state.isModalHidden;

                return newData;
            })
        }
    }

    onClickAddPokeBtn = () => {
        let addedPoke = {
            nickname: this.state.nickNameVal,
            detail: this.state.pokeDetailData
        }

        if(this.state.nickNameVal !== '')
        {
            this.setState( prevState => {
                let newData = {
                    ...prevState,
                    isCaught: !this.state.isCaught
                }
                return newData;
            }, () => {
                this.props.onPokemonAdded(addedPoke);
            })
        }
        
    }

    onChangePokeNickInputVal = (event) => {
        let value = event.target.value;
        this.setState( prevState => {
        
            let newState = {...prevState}
            newState.nickNameVal = value;

            return newState;
        })
    }
    
    onClickPokeInfoCat  = (categories) => {
        this.setState( prevState => {
            let newData = {...prevState};
            newData.activeMenu = categories;

            return newData;
        })
    }

    onClickModalBtn = () => {
        this.setState( prevState => {
            let newData = {...prevState};
            newData.isModalHidden = !this.state.isModalHidden;

            return newData;
        })
    }

    render(){
        let infoContent = [];
        let pokeInfoCatContent = [];
        const pokeMovesContent = [];
        const pokeTypesContent = [];

        const caughtPokeContent = (
            <div className = {styles.catchBtn} onClick = {this.onClickCatchBtn}>
                Catch
            </div>
        );

        const addPokeContent = (
            <>
                <div className = {styles.inputNickname}>
                    <input 
                        type = "text" 
                        placeholder = "Type nickname" 
                        value = {this.state.nickNameVal} 
                        onChange = {this.onChangePokeNickInputVal}
                    />
                </div>
                <div className = {styles.catchBtn} onClick = {this.onClickAddPokeBtn}>
                    Add
                </div>
            </>
        );

        const inputContent = !this.state.isCaught ? caughtPokeContent : addPokeContent;

        if(this.state.pokeDetailData !== null
            && typeof this.state.pokeDetailData !== undefined)
        {
            infoContent = (
                <div className = {styles.pokeInfo}>
                    <div>
                        <img src = {this.state.pokeDetailData.sprites.front_default} alt = {this.state.pokeDetailData.name}/>
                    </div>
                    <div className = {styles.inputContainer}>
                        <div className = {styles.pokeName}>
                            {this.state.pokeDetailData.name}
                        </div>
                        {inputContent}
                    </div>
                </div>
            );

            this.state.pokeDetailData.moves.map ( item => {
                return pokeMovesContent.push(
                    <div key = {item.move.name}>{item.move.name}</div>
                );
            })

            this.state.pokeDetailData.types.map( item => {
                return pokeTypesContent.push(
                    <div key = {item.slot}>{item.type.name}</div>
                );
            })

            pokeInfoCatContent = this.state.activeMenu === 'types' ? pokeTypesContent : pokeMovesContent;
        }

        const activeTypeStyle = this.state.activeMenu === 'types' ? styles.activeMenuStyle : styles.menuStyle;
        const activeMoveStyle = this.state.activeMenu === 'moves' ? styles.activeMenuStyle : styles.menuStyle;
        
        let modalContent = this.state.isModalHidden ? '' : 
        (
            <>
                <Backdrop
                    onClickBackDrop = {this.onClickModalBtn}
                />
                <Modal 
                    onClickCloseBtn = {this.onClickModalBtn}
                    onClickActionBtn = {this.onClickModalBtn}
                />
            </>
        );   

        return(
            <div className = {styles.page}>
                {modalContent}
                {/* back button */}
                <div className = {styles.backBtn} onClick = {this.onClickBackBtn}><TiArrowLeftThick /></div>
                {/* img, title, input nickname, catch button */}
                    {infoContent}
                {/* types, moves, abilities */}
                <div className = {styles.pokeInfoCatContainer}>
                    {/* titles */}
                    <div className = {styles.pokeInfoCatTitle}>
                        <div className = {activeTypeStyle} onClick = {() => this.onClickPokeInfoCat('types')}>Types</div>
                        <div className = {activeMoveStyle} onClick = {() => this.onClickPokeInfoCat('moves')}>Moves</div>
                    </div>
                    {/* dynamic content */}
                    <div className = {styles.pokeInfoCatContent}>
                        {pokeInfoCatContent}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPokemonAdded: (data) => dispatch(actions.addPokemon(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailPage);