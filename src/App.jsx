import { useEffect, useState } from 'react'
import './App.css'
import { fetchNotes, addNotes } from './notesReducer'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes)

  const [inputText, setInputText] = useState("")

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(addNotes(inputText))
            setInputText("")
          }}>
          <input required={true} onChange={(e) => {
            setInputText(e.target.value)
          }} value={inputText} placeholder='dodaj notatke'/>
          <button type='submit'>Add note</button>
        </form>
        <p>
        </p>
      </div>
      <div className="read-the-docs">
        <ul>
          {notes.map(note => (<li key={note._uuid}>{note.title}</li>))}
        </ul>
      </div>
    </>
  )
}

export default App
