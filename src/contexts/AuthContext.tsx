import { createContext, ReactElement, useState, FC, useContext } from "react"

export const AuthContext = createContext<any>({
  displayName: undefined,
  picture: undefined,
  email: undefined,
})

interface UserProviderProps {
  children: ReactElement
}

export const AuthProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState({
    displayName: undefined,
    picture: undefined,
    email: undefined,
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
