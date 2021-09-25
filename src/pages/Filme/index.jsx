import { useState, useEffect } from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';


export default function Filme() {
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme () {
            const response = await api.get(`r-api/?api=filmes/${id}`)
            
            if(response.data.length === 0){
                history.replaceState('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return( () => {
            console.log("component desmontado");
        })

    }, [ history ,id ])

    function salvaFilme(){

        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];
        // se tiver filme salvo ignorar
        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id);
        
        if (hasFilme) {
            toast.warning('Você já salvou esse filme');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme Favoritado')
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando seu Filme</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="_blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}