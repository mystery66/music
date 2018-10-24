import React,{ Component } from "react"
import './Process.css'

class Process extends Component {
  getDefaultProps() {
    return {
      barColor: '#2f9842'
    }
  }
  changeProcess = (e) => {
    let processBar = this.refs.processBar;
    let process = (e.clientX-processBar.getBoundingClientRect().left) / processBar.clientWidth;
    console.log('p'+process);
    
    this.props.onProcessChange && this.props.onProcessChange(process)
  }
  render() {
    return(
      <div className="process" ref="processBar" onClick={this.changeProcess}>
        <div className="process-bar" style={{width: `${this.props.process}%`, background:this.props.barColor}}></div>
      </div>
    );
  }
} 

export default Process