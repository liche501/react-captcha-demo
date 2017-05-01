import React, { Component } from 'react';
import './App.css';
import api, { rootServer } from './api/api.js'

let styles;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaKey: '',
      inputCaptchaStr: '',
      // reloadTime: ''
    }
  }
  getCaptchaKey = () => {
    api.getCaptchaKey()
      .then(res => {
        console.log(res.data.CaptchaKey);
        this.setState({ captchaKey: res.data.CaptchaKey });
      })
      .catch(error => {
        console.error(error)
      });
  }
  _captchaVerify = () => {
    let key = this.state.captchaKey
    let digits = this.state.inputCaptchaStr

    api.captchaVerify(key, digits)
      .then(res => {
        console.log(res.data.verify);
        if (!res.data.verify) {
          this.getCaptchaKey()
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  componentWillMount() {
    this.getCaptchaKey()
  }

  _inputCaptchaStrOnChange = (e) => {
    this.setState({ inputCaptchaStr: e.target.value });
  }
  _reloadCaptcha = () => {
    this.getCaptchaKey()
  }
  render() {
    return (
      <div className="App">
        <section>
          <span>captchaKey: </span>
          <span>{this.state.captchaKey}</span>
        </section>

        <section>
          {this.state.captchaKey &&
            <img style={styles.captchaImg}
              src={`${rootServer}/image/${this.state.captchaKey}`}
              onClick={this._reloadCaptcha}
              alt=''
            />
          }
        </section>

        <section>
          <input type='text' value={this.state.inputCaptchaStr} onChange={this._inputCaptchaStrOnChange} />
          <input type="button" value="verify" onClick={this._captchaVerify} />
        </section>
      </div>
    );
  }
}

styles = {
  captchaImg: {
    width: 100,
    height: 40,
    backgroundColor: '#EEEEEE',
  }
}