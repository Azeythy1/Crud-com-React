import { useEffect,useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'
import Deletar from '../../componentes/deletar'
import Editar from '../../componentes/editar'


function Home() {

 const[users,setUsers]=useState([])

 const inputName=useRef()
 const inputMail=useRef()
 const inputAge=useRef()

   async function getUsers(){
    const usersFromApi= await api.get('/usuarios')

    setUsers(usersFromApi.data)
    
  }
    
    async function createUsers(){
    await api.post('/usuarios',{
      name:inputName.current.value,
      email:inputMail.current.value,
      age:inputAge.current.value,
    })
    
    getUsers()
  }

  async function deletetUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
    
  }
  async function editUsers(id){
    await api.put(`/usuarios/${id}`,{
      name:inputName.current.value,
      email:inputMail.current.value,
      age:inputAge.current.value,
      
    })
    
    getUsers()
  }
      useEffect(()=>{ 
        getUsers()
        
      },    [])

  return (
    <div className='container'>
      <form >
        <h1>Cadastro de Usuarios</h1>
        <input 
          placeholder="nome" 
          name='nome' 
          type="text" 
          ref={inputName}/>

        <input 
          placeholder="e-mail" 
          name='email' 
          type="text" 
          ref={inputMail}/>

        <input 
          placeholder="idade"
          name='age' 
          type="text" 
          ref={inputAge}/>

        <button 
          className='cadastro' 
          type='button' 
          onClick={createUsers}>
            Cadastrar
          </button>

      </form>

{users.map((user)=>( 
      <div key={user.id} className='card'>
        
        <div >
          
          <p><span>Nome: </span>{user.name}</p>
          <p><span>E-Mail:</span> {user.email}</p>
          <p><span>Idade:</span> {user.age}</p>
        </div>

        
        <div className='action'>
          <button type='button' onClick={()=> deletetUsers(user.id)}>
            <Deletar  />
            </button>

            <button type='button' onClick={()=> editUsers(user.id)}> 
            <Editar  />

            </button>
        </div>

      </div>))}
     
    </div>
  )
}

export default Home
