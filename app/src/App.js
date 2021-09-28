import './App.scss';
import Table from "./Components/Table";
import {useEffect, useState} from "react";
import Pagination from "./Components/Pagination";
import Date from "./Components/Inputs/Date";
import Select from "react-select/base";
import Filter from "./Components/Inputs/Filter";

function App() {
    // Состояния получения данных
    const [items, setItems] = useState([]);
    const [groupBy, setGroupBy] = useState([]);
    const [platform, setPlatform] = useState([]);
    const [browser, setBrowser] = useState([]);
    const [os, setOS] = useState([]);

    // Состояния фильтров
    const [filterGroupBy, setFilterGroupBy] = useState('day');
    const [filterPlatform, setFilterPlatform] = useState('');
    const [filterOS, setFilterOS] = useState('');
    const [filterBrowser, setFilterBrowser] = useState('');

    // Состояния дней, на границах
    const [dayFrom, setDayFrom] = useState("2019-07-01");
    const [dayTo, setDayTo] = useState("2019-07-07");

    const [loading, setLoading] = useState(false);

    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10)

    const handleDayFrom = (e) => {
        setDayFrom(e.target.value);
    }
    const handleDayTo = (e) => {
        setDayTo(e.target.value);
    }
    const handleGroupBy = (e) => {
        setFilterGroupBy(e.target.value);
    }
    const handlePlatform = (e) => {
        setFilterPlatform(`&platform=${e.target.value}`);
    }
    const handleBrowser = (e) => {
        setFilterBrowser(`&browsers[]=${e.target.value}`);
    }
    const handleOS = (e) => {
        setFilterOS(`&operatingSystems[]=${e.target.value}`);
    }

    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/platforms')
            .then(response => response.json())
            .then(data => {
                setPlatform(data);
            })
        fetch('http://localhost:5000/api/v1/browsers')
            .then(response => response.json())
            .then(data => {
                setBrowser(data);
            })
        fetch('http://localhost:5000/api/v1/operating-systems')
            .then(response => response.json())
            .then(data => {
                setOS(data);
            })
        fetch('http://localhost:5000/api/v1/groups')
            .then(response => response.json())
            .then(data => {
                setGroupBy(data);
            })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/statistics?groupBy=${filterGroupBy}&from=${dayFrom}&to=${dayTo}&limit=${limit}&offset=${offset}${filterPlatform}${filterOS}${filterBrowser}`)
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
    }, [filterGroupBy, dayTo, dayFrom, filterPlatform, filterBrowser, filterOS, offset]);
    if (loading) {
        return <div>Загрузка...</div>;
    } else if (!loading) {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <Date value={dayFrom} handler={handleDayFrom} label="From"/>
                        <Date value={dayTo} handler={handleDayTo} label="To"/>
                        <Filter handler={handleGroupBy} list={groupBy} name="Group By"/>
                    </div>
                    <div className="row">
                        <Filter handler={handlePlatform} list={platform} name="Platforms"/>
                        <Filter handler={handleOS} list={os} name="Operating Systems"/>
                        <Filter handler={handleBrowser} list={browser} name="Browsers"/>

                    </div>
                    <Table items={items} groupBy={groupBy} filter={filterGroupBy}/>
                    <Pagination count={count} limit={limit} setOffset={setOffset} offset={offset}/>
                </div>
            </div>
        );
    }
}

export default App;
