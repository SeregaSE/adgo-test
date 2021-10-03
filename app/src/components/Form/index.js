import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Selector from '../FormSelect'
import Page from '../Page'
import Slider from "react-slick";

function Index() {
  const dispatch = useDispatch()
  const store = useSelector(store=>store)

  const[dateStart,setDateStart]= useState()
  const[dateStop,setDateStop]= useState()
  const[groups,setGroups]= useState()
  const[platform,setPlatform] = useState()
  const[operating,setOperating] = useState()
  const[brouser,setBrouser] = useState()

  const[spisok,setSpisok] = useState()

  const dateStartHandler =()=>{
    setDateStart(document.getElementById('dateStart').value)
  }
  const dateStopHandler =()=>{
    setDateStop(document.getElementById('dateStop').value)
  }
  const groupsConst =()=>{
    setGroups(document.getElementById('groups').value)
  }

  const platformHandler =(e)=>{
    setPlatform(document.getElementById('platform').value)
  }
  const operatingHandler =(e)=>{
    setOperating(document.getElementById('operatingSystem').value)
  }
  const brouserHandler =(e)=>{
    setBrouser(document.getElementById('brouser').value)
  }
 
  useEffect(()=>{
  dateStart && dateStop && 
  fetch(`http://localhost:5000/api/v1/statistics?groupBy=day&from=${dateStart}&to=${dateStop}&
  browsers[]=${brouser? brouser: 0}&
  platform=${platform?platform: 0}&
  operatingSystems[]=${operating?operating:0}&
  groupBy=${groups?groups:''}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dispatch({type:"ADDSPISOK", payload:data})
      
    });


  },[dateStart,dateStop,groups,platform,operating,brouser])
  
  
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function(currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function(currentSlide) {
      console.log("after change", currentSlide);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <>
      <div className="form" >
      <div className="form__header">

        <div className="form__header-date">
          <input id="dateStart" onChange={dateStartHandler} type='date'/>
          <input id="dateStop" onChange={dateStopHandler} type='date'/>
          <select id="groups" onChange={groupsConst} >
          <option selected hidden>Group</option>
          {store.schemaReducer?.groups && store.schemaReducer?.groups.map(el=><Selector key={el.value} el={el}/>)}
          </select>
        </div>

        <div className="form__header-system">
          <select id="platform" onChange={platformHandler}>
          <option selected hidden>Platform</option>
            {store.schemaReducer?.platforms && store.schemaReducer?.platforms.map(el=><Selector key={el.value} el={el}/>)}
          </select>
          <select id="operatingSystem" onChange={operatingHandler}>
          <option selected hidden>operating system</option>
            {store.schemaReducer?.operatingSystem && store.schemaReducer?.operatingSystem.map(el=><Selector key={el.value} el={el}/>)}
          </select>
          <select id="brouser" onChange={brouserHandler}>
          <option selected hidden>brouser</option>
            {store.schemaReducer?.brouser && store.schemaReducer?.brouser.map(el=><Selector key={el.value} el={el}/>)}
          </select>
        </div>

      </div>
      
    </div>
      <div className="page">
        <div className="page__header">
          <span className="page__header-span">day</span>
          <span className="page__header-span">impressions</span>
          <span className="page__header-span">конверсия</span>
          <span className="page__header-span">money</span>
        </div>
        <Slider {...settings}>
         {store.schemaReducer?.spisok && store.schemaReducer?.spisok.rows.map(el=><Page key={el.count} el={el}/>)}
        </Slider>
      </div>
    </>
 );
}

export default Index;
