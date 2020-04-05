import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.title}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="total" value={props.total} />
        <Statistic text="average" value={props.average} />
        <Statistic text="positive" value={props.positive} />
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(2)
  const positive = (good/total*100).toFixed(2) + "%"
  const title = "give feedback"

  const setToValue = newValue => {
    setGood(newValue)
  }

  return (
    <>
      <Header title={title} />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Header title="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)