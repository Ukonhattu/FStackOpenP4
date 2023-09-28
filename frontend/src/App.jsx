import { useState, useEffect, useRef } from 'react'
import LoginForm from './Components/Login/LoginForm'
import LogoutButton from './Components/Login/LogoutButton'
import blogService from './services/blogService'
import ListBlogs from './Components/Blogs/ListBlogs'
import CreateUserForm from './Components/Login/CreateUserForm'
import CreateBlogForm from './Components/Blogs/CreateBlogForm'
import Notification from './Components/Notification/Notification'
import Togglable from './Components/Toggable'

function App() {
  const [user, setUser] = useState(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return null
  })
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    type: ''
  })
  const createBlogToggle = useRef()

  const handleNotification = (message, type) => {
    setNotification({
      message,
      type
    })
    setTimeout(() => {
      setNotification({
        message: null,
        type: ''
      })
    }, 5000)
  }

  useEffect(() => {
    if (!user) {
      return
    }
    async function getBlogs() {
      const fetchedBlogs = await blogService.getAll(user)
      setBlogs(fetchedBlogs)
    }
    getBlogs()
  }, [user])
  if (!user) {
    return (
      <>
      <Notification notification={notification} />
      <LoginForm setUser={setUser} handleNotification={handleNotification}/>
      <CreateUserForm handleNotification={handleNotification}/>
    </>
    )
  }


  
  return (
    <div>
      <Notification notification={notification} />
      <h1>Logged in</h1>
      <p>username: {user.username}</p>
      <ListBlogs blogs={blogs} user={user}/>
      <Togglable buttonLabel="Create Blog" ref={createBlogToggle}>
        <CreateBlogForm 
          user={user} 
          setBlogs={setBlogs}
          handleNotification={handleNotification}
          createBlogToggle={createBlogToggle}
          />
      </Togglable>
      <LogoutButton/>
    </div>
  )
}

export default App
