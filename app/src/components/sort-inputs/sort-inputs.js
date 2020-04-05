import React from 'react';
import SelectInputs from './select-inputs'

const SortInputs = (props) => {
    const state = props.state
    const {sort, clear, handleChange, handleChangeMultiple} = props

    function optionsCreate(opntionGroup) {
        let createdOptions
        return createdOptions = opntionGroup.length ? 
        (
            opntionGroup.map(item => {
                return <SelectInputs option={item} key={item.value}/>
            })
        ) : (
            <option>Loading</option>
        )
    }

    return (
        <div className="sort-container">
        <div className="wrapper__sort">
            <div className="wrapper__sort-from">
                <span>From</span>
                <input 
                    type="date" 
                    className="from form-control"
                    id="dateFrom"
                    onChange={handleChange} 
                />
            </div>

            <div className="wrapper__sort-to">
                <span>To</span>
                <input 
                    type="date" 
                    className="to form-control" 
                    id="dateTo"
                    onChange={handleChange} 
                />
            </div>

            <div className="wrapper__sort-group">
                <span>Group By</span>
                <select 
                    defaultValue={'0'}
                    className="custom-select" 
                    id='groupBy' 
                    onChange={handleChange}
                >
                    <option disabled value='0'>Choose...</option>
                    {optionsCreate(state.groupBy)}
                </select>
            </div>
        </div>

        <div className="wrapper__sort">
            <div className="wrapper__sort-platform">
                <span>Platform</span>
                <select 
                    defaultValue={'0'}
                    className="custom-select" 
                    id='platforms' 
                    onChange={handleChange}
                >
                    <option disabled value='0'>Choose...</option>
                    {optionsCreate(state.platforms)}
                </select>
            </div>

            <div className="wrapper__sort-system">
                <span>Operating System</span>
                <select 
                    multiple
                    defaultValue={['0']}
                    className="custom-select" 
                    id='os' 
                    onChange={handleChangeMultiple}
                >
                    <option disabled value='0'>Choose...</option>
                    {optionsCreate(state.os)}
                </select>
            </div>

            <div className="wrapper__sort-browser">
                <span>Browser</span>
                <select 
                    multiple
                    defaultValue={['0']}
                    className="custom-select" 
                    id='browsers' 
                    onChange={handleChangeMultiple}
                >
                    <option disabled value='0'>Choose...</option>
                    {optionsCreate(state.browsers)}
                </select>
            </div>
        </div>
        <button type="button" className="btn btn-secondary"onClick={clear}>Сlear</button>
        <button type="button" className="btn btn-success" onClick={sort}>Ok</button>
        </div>
    )
}

export default SortInputs