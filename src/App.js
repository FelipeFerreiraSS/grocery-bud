import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ 
    show: false, 
    msg: '', 
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Deu certo')

    if (!name) {
      // display
      showAlert(true, 'danger', 'Digite um valor válido!')
    } else if (name && isEditing) {

    } else {
      showAlert(true, 'success', 'Item adicionado a lista')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list,newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearlist = () => {
    showAlert(true, 'danger', 'lista vazia')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removido')
    setList(list.filter((item) => item.id !== id))
  } 

  return(
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
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
        {list.length > 0 && (
          <div className="grocery-container">
          <List items={list} removeItem={removeItem}/>
          <button className="clear-btn" onClick={clearlist}>limpar itens</button>
        </div>
        )}
      </section>
  ) 
}

export default App
