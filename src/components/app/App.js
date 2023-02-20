import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, NotFound, SingleComicPage} from "../pages";

const App = () => {
    console.log(window.history.length)
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/Marvel" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;