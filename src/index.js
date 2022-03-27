import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import Home from './Home';
import Film from './Film';
import Session from './Session';

import './css/reset.css';
import './css/style.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/film/:idFilm" element={<Film />}></Route>
                <Route path="/session" element={<Session />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.querySelector(".root"));