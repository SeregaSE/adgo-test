import './App.scss';
import Inputs from "./Components/Inputs/Inputs";
import Table from "./Components/Table";
import {useEffect, useState} from "react";
import Pagination from "./Components/Pagination";

function App() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [groupBy, setGroupBy] = useState("day");
    const [dayFrom, setDayFrom] = useState("2019-07-01");
    const [dayTo, setDayTo] = useState("2019-07-07");
    const [platform, setPlatform] = useState(0);
    const [browser, setBrowser] = useState(0);
    const [os, setOS] = useState(0);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10)


    let filterFetch = (platform !== 0 ? '&platform=' + platform : '')
        + (browser !== 0 ? '&browsers[]=' + browser : '')
        + (os !== 0 ? '&operatingSystems[]=' + os : '');


    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/statistics?groupBy=${groupBy}&from=${dayFrom}&to=${dayTo}&limit=${limit}&offset=${offset}${filterFetch}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.rows);
                setCount(data.count);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [groupBy, dayTo, dayFrom, platform, browser, os, offset]);




    if (loading) {
        return <div>Загрузка...</div>;
    } else if (!loading) {
        return (
            <div className="App">
                <div className="container">
                    <Inputs
                        setGroupBy={setGroupBy}
                        setDayFrom={setDayFrom}
                        setDayTo={setDayTo}
                        dayFrom={dayFrom}
                        dayTo={dayTo}
                        setPlatform={setPlatform}
                        setOS={setOS}
                        setBrowser={setBrowser}
                    />
                    <Table items={items} groupBy={groupBy}/>
                    <Pagination count={count} limit={limit} setOffset={setOffset} offset={offset}/>
                </div>
            </div>
        );
    }
}

export default App;
