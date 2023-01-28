import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessages/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelServices = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        // console.log('update')
        this.setState({
            char,
            loading: false,
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    updateChar = () => {
        if (!this.props.charId) {
            return;
        }
        this.onCharLoading();
        this.marvelServices
            .getCharacter(this.props.charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {

        const { char, loading, error } = this.state;


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

export default CharInfo;