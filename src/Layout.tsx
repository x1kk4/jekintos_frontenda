import { Box } from "@mui/material"
import { FC } from "react"
import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"

const Layout: FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default Layout
