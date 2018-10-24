import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Process from './components/Process/Process'
import $ from 'jquery'
import jPlayer from 'jplayer'

// let duration = null
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      process: '',
      duration: null
     
    }
  }
  componentDidMount(){
    console.log(1);
   $('#player').jPlayer({
     ready: function () {
       
       $(this).jPlayer('setMedia', {
         'mp3': 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3'
       }).jPlayer('play');
     },
     supplied: 'mp3',
     wmode: 'window'
   });
   $('#player').bind($.jPlayer.event.timeupdate, (e)=> {
     this.state.duration = e.jPlayer.status.duration;
     this.setState({
       process:e.jPlayer.status.currentPercentAbsolute
     });
   })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  processChangeHandler= (p) => {
    
    $('#player').jPlayer('play', this.state.duration * p)
    this.setState({
      process: p
    })
 
 
  }
  render() {
    return (
      <div className="app">
        <Header/>
         <Process process={this.state.process} onProcessChange={this.processChangeHandler} barColor='#ff0000'></Process>
         <div id="player"></div>
      </div>
    );
  }
}

export default App;
