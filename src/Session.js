import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function Session({setFinalData}) {

    const { idSession } = useParams();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");


    const [seats, setSeats] = useState([]);
    const [seats_seats, setSeats_seats] = useState([]);
    const [movie, setMovie] = useState([]);
    const [day, setDay] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);

        promise.then(answer => {
            setSeats(answer.data);
            setSeats_seats(answer.data.seats);
            setMovie(answer.data.movie);
            setDay(answer.data.day);
        });
        /* Não esquece do erro */
    }, []);

    let [selectedSeats, setSelectedSeats] = useState([]);


    function isSelectedSeats(seat) {
        let listed = false;
        selectedSeats.forEach(element => { if (element.id == seat.id) { listed = true } });
        return listed;
    }


    function clickSeat(seat) {

        if (isSelectedSeats(seat)) {
            let newSelectedSeats = [...selectedSeats];
            newSelectedSeats = newSelectedSeats.filter(element => {
                if (element.id != seat.id) {
                    return element.id
                }
            });
            setSelectedSeats(newSelectedSeats);
        } else {
            let newSelectedSeats = [...selectedSeats];
            newSelectedSeats.push(seat);
            setSelectedSeats(newSelectedSeats);
        }
    }

    let errorMessage = "";

    if(selectedSeats.length == 0) {
        errorMessage = "Selecione pelo menos uma cadeira";
    } else if(cpf.length != 14 && name.length < 3) {
        errorMessage = "Digite o nome e o CPF do comprador";
    } else if(cpf.length != 14) {
        errorMessage = "Digite o CPF do comprador";
    } else if(name.length < 3) {
        errorMessage = "Digite o nome do comprador";
    } else {
        errorMessage = "";
    }

    function updateCpf(value) {
        setCpf(value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'));
    }

    function updateFinalData() {
        setFinalData({
            title: movie.title,
            day: `${day.date} ${seats.name}`,
            selectedSeats: selectedSeats,
            name: name,
            cpf: cpf
        });
    }

    let button = "";

    if (errorMessage == "") {
        button = <Link to="/success" onFocus={() => updateFinalData()}><button type="button">Reservar assento(s)</button></Link>;
    } else {
        button = <button type="button">Reservar assento(s)</button>
    }


    return (
        <>
            <Header />
            <main className="mainSession">
                <p>Selecione o(s) assento(s)</p>
                <div className="seats">
                    {seats_seats.map(seat => {

                        let className = "";
                        let onclick = () => console.log("Indisponível");
                        if (seat.isAvailable) {
                            if (isSelectedSeats(seat)) {
                                className = "seat selected";
                                onclick = () => {
                                    clickSeat(seat);
                                    updateFinalData();
                                };
                            } else {
                                className = "seat available";
                                onclick = () => {
                                    clickSeat(seat);
                                    updateFinalData();
                                };
                            }
                        } else {
                            className = "seat unavailable";
                        }

                        return <div className={className} onClick={onclick} >{seat.name}</div>
                    })}
                </div>
                <div className="subtitles">
                    <div className="subtitle">
                        <div className="selected"></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="subtitle">
                        <div className="available"></div>
                        <p>Disponível</p>
                    </div>
                    <div className="subtitle">
                        <div className="unavailable"></div>
                        <p>Indisponível</p>
                    </div>
                </div>
                <div className="form">
                    <p>Nome do comprador:</p>
                    <input type="text" name="input" placeholder="Digite seu nome..." value={name} onChange={(e) => {
                        setName(e.target.value);
                        updateFinalData();
                    }} />
                    <p>CPF do comprador:</p>
                    <input type="text" name="input" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => {
                        updateCpf(e.target.value);
                        updateFinalData();
                    }} />

                    {button}

                    <p className="error">{errorMessage}</p>
                </div>
            </main>
            <Footer img={movie.posterURL} title={movie.title} session={`${day.weekday} - ${seats.name}`} />
        </>
    );
}