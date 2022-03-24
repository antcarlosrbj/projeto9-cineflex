import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

export default function Home() {

    const [films, setFilms] = useState([]);

    useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		promise.then(answer => {
			setFilms(answer.data);
		});
        /* Não esquece do erro */
	}, []);

    return (
        <>
            <Header />
            <main className="mainHome">
                <p>Selecione o filme</p>
                <div className="films">
                    {films.map((film) => {
                        return <img src={film.posterURL} alt={film.title} key={film.id} />
                    })}
                </div>
            </main>
        </>
    );
};