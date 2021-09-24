import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setlist] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Deu certo')
  }

  return(
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert />}
          <h3>Lsita de compras</h3>
          <div className="form-control">
            <input 
              type="text" 
              className="grocery" 
              placeholder="Ex: ovos, leite"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'editar' : 'adicionar'}
            </button>
          </div>
        </form>
        <div className="grocery-container">
          <List />
          <button className="clear-btn">limpar itens</button>
        </div>
      </section>
  ) 
}

export default App
