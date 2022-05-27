import React, { useState, useEffect } from 'react'
import './UnlimitedScroll.css'

function ExampleView() {
  const [todos, setTodos] = useState([])
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const request = await fetch(`/exampleRouter/todos?skip=${skip}`)
        const todosJson = await request.json()
        setTodos([...todos, ...todosJson])
      } catch (e) {

      }
    }

    fetchTodos()

  }, [skip])

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight} = e.target

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(todos.length)
    }
  }

  return (
    <div className="todos-list" onScroll={handleScroll}>
      {todos.map((todo) => {
        return <div className="todo" key={todo._id}>
          <p className="todo-title">{todo.title}</p>
          <p className="todo-description">{todo.description}</p>
        </div>
      })}
    </div>
  )
}

export default ExampleView