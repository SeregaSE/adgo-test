import {useEffect, useState} from "react";

export function useGroupBy() {
    const [groupByList, setGroupByList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/groups`)
            .then((res) => res.json())
            .then((data) => {
                setGroupByList(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    return groupByList;
}

export function usePlatform() {
    const [platforms, setPlatforms] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/platforms`)
            .then((res) => res.json())
            .then((data) => {
                setPlatforms(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    return platforms;
}

export function useOS() {
    const [OS, setOS] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/operating-systems`)
            .then((res) => res.json())
            .then((data) => {
                setOS(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    return OS;
}

export function useBrowser() {
    const [browsers, setBrowsers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/browsers`)
            .then((res) => res.json())
            .then((data) => {
                setBrowsers(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    return browsers;
}