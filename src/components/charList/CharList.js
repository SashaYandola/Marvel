import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessages/ErrorMessage";
import Spinner from "../spinner/Spinner";

import PropTypes from 'prop-types';
import React from 'react';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [listItemLoading, setListItemLoading] = useState(false);
    const [offset, setOffset] = useState(300);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setListItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onCharsLoading = () => {
        setListItemLoading(true);
    }

    const onRequest = (offset) => {
        onCharsLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const itemRefs = useRef([]);

    const focusItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const ViewItems = (chars) => {
        let items = chars.map((item, i) => {
            let imgStyle = item.thumbnail.indexOf('image_not_available') === 44 ? true : false;

            return (
                <li tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id} className="char__item"
                    onClick={() => {
                        props.selectChar(item.id);
                        focusItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.selectChar(item.id);
                            focusItem(i);
                        }
                    }}
                >
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

    const items = ViewItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}

            <button className="button button__main button__long"
                disabled={listItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired,
}


export default CharList;