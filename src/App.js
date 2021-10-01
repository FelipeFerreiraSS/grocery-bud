import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else{
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
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
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title:name }
          }
          return item
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'valor alterado')
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

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

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
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearlist}>limpar itens</button>
        </div>
        )}
      </section>
  ) 
}

export default App
