import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import LoginPanel from "./LoginPanel"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#322659",
        height: "10vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          m: "auto 2vw",
          fontSize: "30px",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        GoogleShare
      </Typography>
      <Navbar />
      <LoginPanel />
    </AppBar>
  )
}
export default Header
