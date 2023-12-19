import './App.css'
import { fetchNotes, addNotes } from './notesReducer'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(fetchNotes())}>
          load notes
        </button>
        <button onClick={() => dispatch(addNotes())}>
          Add note
        </button>
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
