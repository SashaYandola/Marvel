import './charList.scss';
import { Component } from 'react';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessages/ErrorMessage";
import Spinner from "../spinner/Spinner";

import PropTypes from 'prop-types';
import React from 'react';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        listItemLoading: false,
        offset: 300,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }


        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            listItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }
    onCharsLoading = () => {
        this.setState({
            listItemLoading: true,
        })
    }
    onRequest = (offset) => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    itemRefs = [];

    setRefs = (ref) =>{
        this.itemRefs.push(ref);
    }
    focusItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }
    

    render() {
        const { chars, loading, error, offset, listItemLoading, charEnded } = this.state;

        const items = this.ViewItems(chars);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        console.log(listItemLoading)
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button className="button button__main button__long"
                    disabled={listItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

    ViewItems = (chars) => {
        let items = chars.map((item, i) => {
            let imgStyle = item.thumbnail.indexOf('image_not_available') === 44 ? true : false;

            return (
                <li ref={this.setRefs} key={item.id} className="char__item" onClick={() => {
                    this.props.selectChar(item.id, this.ref);
                    this.focusItem(i);
                }}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle ? { objectFit: 'unset' } : { objectFit: 'cover' }} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired,
}


export default CharList;