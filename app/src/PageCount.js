import React from 'react';

function PageCount(props){
    const limitVariations = [10, 25];
    let className="btn btn-outline-primary";
    return (
        <div className="col-xs-6 col-md-6">
            <label>Per page </label>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {
                    limitVariations.map((limit, key) => {
                        let limitClass = className;
                        if (limit === props.limit) {
                            limitClass = className + " active";
                        }
                        return (<label className={limitClass} key={key}>
                                    <input type="radio" name={limit} onClick={props.handleClick.bind(this)} autoComplete="off" /> {limit}
                                </label>);
                    })
                }
            </div>
        </div>
    );
}

export default PageCount;
