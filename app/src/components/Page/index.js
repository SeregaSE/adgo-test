import React from 'react';
import { useSelector} from 'react-redux'


function Index({el}) {

  const store = useSelector(store=>store)
  return (

    <div className="page__body">
      
      <div className="page__body-item">
        <span className="page__body-span">{el.day}</span>
        <span className="page__body-span">{el.impressions}</span>
        <span className="page__body-span">{parseFloat(el.clicks/el.impressions).toFixed(2)}%</span>
        <span className="page__body-span">{parseFloat(el.money).toFixed(4)}</span>
      </div>
    </div>
  );
}

export default Index;
