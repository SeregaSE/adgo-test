

const platform = [
    'Desktop',
    'Mobile'
]


const Platform = ({setPlatform}) => {

    return <div>
        <p>platform</p>
        <select onChange={(e) => setPlatform(e.target.value)} id="selectid2">
            <option></option>
            {platform.map((v, i) => <option value={++i}>{v}</option>)}
        </select>
    </div>
}


export default Platform;