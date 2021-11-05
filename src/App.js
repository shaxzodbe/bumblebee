import {useEffect, useState} from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://61544bff2473940017efad71.mockapi.io/api/posts/posts";

function App() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const removeTour = (id) => {
        const newTors = tours.filter((tour) => tour.id !== id);
        setTours(newTors);
    }

    const fetchTours = async () => {
        setLoading(true);

        try {
            const response = await fetch(url);
            const tours = await response.json();
            setLoading(false);
            setTours(tours)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        fetchTours()
    }, [])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        );
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>no tours left</h2>
                    <button className="delete-btn" onClick={fetchTours}>
                        refresh
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Tours tours={tours} removeTour={removeTour} />
        </main>
    );
}

export default App;
