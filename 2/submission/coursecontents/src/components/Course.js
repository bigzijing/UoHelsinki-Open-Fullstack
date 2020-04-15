import React from 'react'

const Course = ({i, course}) => (
    <>
      <Header header={course.name} />
      <Content content={course.parts} />
    </>
  )
  
  const Header = ({header}) => (
    <div>
      <h1>{header}</h1>
    </div>
  )
  
  const Content = ({content}) => (
    <>
      {content.map((part, i) =>
        <Part key={i} content={part} />
        )}
      <Total content={content} />
    </>
  )
  
  const Part = ({i, content}) => (
    <div>
      <p>{content.name} {content.exercises}</p>
    </div>
  )
  
  const Total = ({content}) => {
    const total = content.reduce((s, p) => s + p.exercises, 0)
    return (
      <div>
        <p><b>Number of {total} exercises</b></p>
      </div>
    )
  }

export default Course