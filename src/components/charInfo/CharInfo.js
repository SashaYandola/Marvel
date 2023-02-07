import './charInfo.scss';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessages/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelServices = new MarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const onCharLoaded = (char) => {
        // console.log('update')
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        if (!props.charId) {
            return;
        }
        onCharLoading();
        marvelServices
            .getCharacter(props.charId)
            .then(onCharLoaded)
            .catch(onError);
    }



    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const imageNotFound = thumbnail.indexOf('image_not_available') === 44 ? true : false;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imageNotFound ? { objectFit: 'contain' } : { objectFit: 'cover' }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length <= 0 ? 'COMICS NOT FOUND' : comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i >= 10) return;
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })


                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;