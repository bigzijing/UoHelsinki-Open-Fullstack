import React from 'react';
import './App.css';
import Course from './components/Course';

const App = ({courses}) => (
  <div>
    {courses.map((course, i) =>
    <Course key={i} course={course} />
    )}
  </div>
)

export default App;