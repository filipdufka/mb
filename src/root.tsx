import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
// import './index.css'

class Root extends Component {
  render() {
    return (<h1>Hello World!</h1>)
  }
}

render(<Root />, document.getElementById('root'))