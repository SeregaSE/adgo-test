


const groupBy = [
    'day',
    'platform',
    "operatingSystem",
    'browser'
]

const GroupBy = ({setGroupBy}) => {

    return <div>
        <select onChange={(e) => setGroupBy(e.target.value)} id='selectid5'>
            <option></option>
            {groupBy.map((v, i) => <option value={v}>{v}</option>)}
        </select>
    </div>
}


export default GroupBy;