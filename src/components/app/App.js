import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectChar, setSelectChar] = useState(null);

    function onCharSelected(id) {
        setSelectChar(id);
    }
    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList selectChar={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
                {/* <AppBanner/>
                <ErrorBoundary>
                    <ComicsList/>
                </ErrorBoundary> */}
            </main>
        </div>
    )

}

export default App;