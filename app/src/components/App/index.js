import { useEffect }from "react";

import {useDispatch, useSelector} from 'react-redux'

import Form from '../Form'

function App() {
  const dispatch = useDispatch()
  const store = useSelector(store=>store)

  useEffect(() => {

    fetch('http://localhost:5000/api/v1/platforms')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({type:"ADDPLATFORMS", payload:data})
        
    });

    fetch('http://localhost:5000/api/v1/browsers')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({type:"ADDBROUSER", payload:data})
        
    });
    
    fetch('http://localhost:5000/api/v1/operating-systems')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({type:"OPERATINGSYSTEMS", payload:data})
      
    });

    fetch('http://localhost:5000/api/v1/groups')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({type:"GROUPS", payload:data})
      
    });

  },[]);

  return (<>

    <Form/>
    </>
  )
}

export default App;
