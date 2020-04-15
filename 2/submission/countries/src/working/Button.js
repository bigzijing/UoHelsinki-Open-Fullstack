import React from 'react'

const Button = ({ name, setSearchTerm }) => {
  const handleClick = () => {
      // window.alert(`${name}`)
      setSearchTerm(name)
  }

  return (
    <>
      {name}<button id={name} onClick={handleClick}>Show</button>
    </>
  )
}

export default Button