import React, { Component } from 'react';
import './App.scss';
import'./assets/css/weather-icons.min.css'
//import background from './assets/Naxos-Island-350-v2.jpg'

import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkedC:true,
      unit: "C",
      display: "current",
      currentWeather:{
      id:'',
      main:'',
      description:'',
      icon:'',
      temp:'',
      temp_min:'',
      temp_max:''
      },
      weeklyWeather:[]
    };
    this.getForecast = this.getForecast.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.convertFC = this.convertFC.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggleUnit = this.toggleUnit.bind(this);
  }

  componentDidMount() {
    this.getForecast();
  }

  handleSwitchChange (name ,event) {
    return this.setState({ [name]: event.target.checked });
  };

  convertFC(temp) {
    return this.state.unit ==="F"? temp: Math.round( (5/9)*(temp-32) )
  };

  toggleDisplay() {
    return(
      this.setState({
        display: this.state.display==="current"?"weekly":"current"
      })
    )
  }

  toggleUnit() {
    return(
      this.setState({
        unit: this.state.unit==="F"?"C":"F"
      })
    )
  }

   getForecast() {
  
    let yahooQuery = 'select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Naxos%2Cgr%22)'
    let targetUrl = 'https://query.yahooapis.com/v1/public/yql?q='+yahooQuery+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&u=c'


  fetch(targetUrl)
  .then(res => res.json())
  .then( sent => {
    let data = sent.query.results.channel.item
    console.log(data);
    this.setState({
      currentWeather: data.condition,      
      weeklyWeather:[...data.forecast].slice(0,6)
    })
  }
  
  );

  }

  render(){
  return(
    <div className="weather-app">
      <Card className="ui-card">
      <CardHeader className="card-header"
      action={
        <span>C<Switch value="C" color="default" onChange={this.toggleUnit}/>F</span>
      }
      title='Weather in Naxos'
      />
      <CardContent className="card-content">
      {this.state.display=="current" && <CurrentWeatherBody currentWeather={this.state.currentWeather} convertFC={this.convertFC} /> }
  {this.state.display=="weekly" && <WeeklyWeatherBody  weeklyWeather={this.state.weeklyWeather} convertFC={this.convertFC} /> }
      </CardContent>      
      <PredictionFooter display={this.state.display} toggleUnit={this.toggleUnit} toggleDisplay={this.toggleDisplay}/>      
    </Card>
      
      
    </div>
  )
  }

}

const PredictionFooter = props => 
    <CardActions className="card-actions">
      <span>Current <Switch  value="current" color="default" onChange={props.toggleDisplay}/>Weekly</span>
      <span>
        <a href="https://www.yahoo.com/?ilc=401" target="_blank"> <img src="https://poweredby.yahoo.com/white.png" width="134" height="29"/> </a>
      </span>
    </CardActions>

const CurrentWeatherBody = (props) => {
  return (
    <section>
      <Grid container spacing={12} className="current-weather"> 
        <Grid item xs={6}>
          {/* <p>{props.currentWeather.date}</p> */}
          <p className="current-temp">{props.convertFC(props.currentWeather.temp)} <small>o</small></p>
        </Grid>
        <Grid item xs={6}>
          <p><i className={"wi wi-yahoo-"+props.currentWeather.code}></i></p>
          <p>{props.currentWeather.text}</p>
        </Grid>
      </Grid>
    </section>
  )
}

const WeeklyWeatherBody = (props) => {
  return(
    <section>
      <Grid container spacing={12}  className="weekly-weather-list">
        {props.weeklyWeather.map( (date,idx) =>
          <Grid item xs={6} sm={4}>
          <i className={"wi wi-yahoo-"+date.code}></i> {date.day+' '+props.convertFC(date.low)}-{props.convertFC(date.high)}          
          </Grid>          
      )}        
      </Grid>
    </section>
  )
}

export default App;