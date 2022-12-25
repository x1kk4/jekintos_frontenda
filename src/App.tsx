import { useEffect } from "react"
import { useNavigate, useLocation, Routes, Route } from "react-router"
import AuthService from "./api/AuthService"
import SystemFiles from "./components/Files/SystemFiles"
import UserFiles from "./components/Files/UserFiles"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./Layout"

function App() {
  const { user, setUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const auth = async (url: string) => {
    const response = await AuthService.login(url)
    const data = response.data
    setUser(data)
    window.localStorage.setItem("email", data.email)
    window.localStorage.setItem("name", data.displayName)
    window.localStorage.setItem("picture", data.picture)
  }

  useEffect(() => {
    if (location.search !== "" && user.email === undefined && location.search.includes("code=")) {
      auth(location.search)
    } else if (window.localStorage.email) {
      const storage = window.localStorage
      setUser({
        displayName: storage.getItem("name"),
        picture: storage.getItem("picture"),
        email: storage.getItem("email"),
      })
    }
  }, [])

  useEffect(() => {
    if (location.search !== "") {
      navigate({
        pathname: "/",
        search: "",
      })
    }
  }, [user])

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={<SystemFiles />}
        />
        <Route
          path="my-files"
          element={<UserFiles />}
        />
      </Route>
    </Routes>
  )
}

export default App
