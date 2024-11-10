import { BrowserRouter, NavigateFunction } from "react-router-dom"
import { ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react"
import { UserContext } from "./shared/context/user.context"
import { UserInt } from "./interfaces/UserInt"
import { useState } from "react"
import { Navbar } from "./shared/components/Navbar/Navbar"
import { RouterController } from "./shared/components/RouterController/RouterController"
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const userContext: UserInt = JSON.parse(localStorage.getItem('user') || '{}');
  const [user, setUser] = useState<UserInt>({
    auth: localStorage.getItem('token') ? true : false,
    _id: userContext?._id,
    name: userContext?.name,
    lastname: userContext?.lastname,
    email: userContext?.email
  })

  const login = (
    token: string,
    user: UserInt,
    navigate: NavigateFunction
  ) => {
    const saveUser: UserInt = {
      auth: true,
      _id: user?._id,
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(saveUser))

    setUser(saveUser)
    navigate("/")
    toast.success("Inicio de sesión exitoso")
  }

  const logout = (
    navigate: NavigateFunction
  ) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser({
      auth: false,
      _id: null,
      name: null,
      lastname: null,
      email: null,
    })

    navigate('/')
    toast.error("Sesión cerrada")
  }

  return (
    <BrowserRouter basename='/'>
      <UserContext.Provider
        value={{ user, setUser, login, logout }}
      >
        <ChakraProvider value={defaultSystem}>
          <Flex
            direction="column"
          >
            <Navbar />

            <RouterController />

            <Toaster
              position="top-left"
            />
          </Flex>
        </ChakraProvider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
