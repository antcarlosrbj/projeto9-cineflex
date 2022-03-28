import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default function Success({ finalData, setFinalData }) {

    const [result, setResult] = useState("");

    useEffect(() => {
        const ids = finalData.selectedSeats.map((seat) => seat.id);
        const data = {
            ids: ids,
            name: finalData.name,
            cpf: finalData.cpf.replace(/\D/g, '')
        };

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', data);

        promise.then(() => setResult(true));
        promise.catch(() => setResult(false));
    }, []);

    let message = "";
    if (result == "") {
        message = <p>CARREGANDO</p>
    } else if (result) {
        message = <p>Pedido feito<br />com sucesso!</p>
    } else {
        message = <p className="messageError">Seu Pedido<br />NÃO foi processado</p>
    }

    return (
        <>
            <Header />
            <main className="mainSuccess">
                {message}
                <div className="film">
                    <p className="title">Filme e sessão</p>
                    <p className="content">{finalData.title}</p>
                    <p className="content">{finalData.day}</p>
                </div>
                <div className="tickets">
                    <p className="title">Ingressos</p>
                    {finalData.selectedSeats.map(ticket => <p className="content">{"Assento " + ticket.name}</p>)}
                </div>
                <div className="buyerData">
                    <p className="title">Comprador</p>
                    <p className="content">{"Nome: " + finalData.name}</p>
                    <p className="content">{"CPF: " + finalData.cpf}</p>
                </div>
                <Link to="/" onFocus={() => setTimeout(() => setFinalData([]), 500)}><button type="button">Voltar pra Home</button></Link>
            </main>
        </>
    );
}