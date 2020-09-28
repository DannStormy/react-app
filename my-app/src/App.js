import React from 'react';
import './App.css';

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
      counting: false,
    }

  }
  render() {
    if (!this.state.counting) {
      return (
        <div className="container">
          <h2 className="title">React Timer</h2>
          <div>
            <h1 className="time">
              {this.state.hour} <small>h</small>   {this.state.minute < 10 ? `0${this.state.minute}` : this.state.minute} <small>m</small>   {this.state.second < 10 ? `0${this.state.second}` : this.state.second} <small>s</small>
            </h1>
          </div>
          <div>
            <input className="val" onChange={this.handleHour} maxLength="2" placeholder="HH" />
            <input className="val" onChange={this.handleMinute} maxLength="2" placeholder="MM" />
            <input className="val" onChange={this.handleSecond} maxLength="2" placeholder="SS" />
          </div>
          <button className="begin" onClick={this.beginCount}>BEGIN</button>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div>
            <h1 className="time">
              {this.state.hour} <small>h</small>   {this.state.minute < 10 ? `0${this.state.minute}` : this.state.minute} <small>m</small>   {this.state.second < 10 ? `0${this.state.second}` : this.state.second} <small>s</small>
            </h1>
          </div>
          <button onClick={this.restart} className="reset">RESET</button>
          <button onClick={this.countInterval} className="start">START</button>
          <button onClick={this.stopCount} className="stop">STOP</button>
        </div>
      )
    }
  }


  resumeCount = () => {
    clearInterval(this.myInterval)
    this.setState({
      hour: this.state.newhour,
      minute: this.state.newminute,
      second: this.state.newsecond
    })
  }
  restart = () => {
    clearInterval(this.myInterval)
    this.setState({
      hour: this.state.restarthour,
      minute: this.state.restartminute,
      second: this.state.restartsecond
    })
  }
  beginCount = () => {
    this.setState({
      counting: true,
    })
    this.setState({
      restarthour: this.state.hour,
      restartminute: this.state.minute,
      restartsecond: this.state.second
    })
  }
  stopCount = () => {
    console.log(this.state.counting)
    clearInterval(this.myInterval)
    this.setState({
      counting: false
    })
  }

  countInterval = () => {
    this.myInterval = setInterval(() => {
      console.log(this.state.counting)
      if (this.state.second >= 0) {
        this.setState({
          second: this.state.second - 1,
          counting: true,
        })
      }


      if (this.state.second < 0 && this.state.minute >= 1) {
        this.setState({
          minute: this.state.minute - 1,
          second: 59
        })
      }
      if (this.state.minute <= 0 && this.state.second < 0 && this.state.hour > 0) {
        this.setState({
          hour: this.state.hour - 1,
          minute: 59,
          second: 59
        })
      }
      if (this.state.second === -1) {
        this.setState({
          second: 0
        })
      }
    }, 1000)
  }



  handleHour = (e) => {
    this.setState({
      hour: e.target.value
    })
    if (e.target.value === '') {
      this.setState({
        hour: 0
      })
    }
  }
  handleMinute = (e) => {
    this.setState({
      minute: e.target.value
    })
    if (e.target.value === '') {
      this.setState({
        minute: 0
      })
    }
  }
  handleSecond = (e) => {
    this.setState({
      second: e.target.value
    })
    if (e.target.value === '') {
      this.setState({
        second: 0
      })
    }
  }
}


class App extends React.Component {
  render() {
    return (
      <div>
        <Timer />
      </div>
    )
  }
}


export default App;
