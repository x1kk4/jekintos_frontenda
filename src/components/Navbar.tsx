import { Box } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar: FC = () => {
  const [decoration, setDecoration] = useState(["none", "underline"])
  const location = useLocation().pathname
  console.log(location)

  useEffect(() => {
    location === "/my-files" ? setDecoration(["underline", "none"]) : setDecoration(["none", "underline"])
  }, [location])

  return (
    <Box sx={{ display: "flex", gap: 12, m: "auto" }}>
      <Box>
        <Link
          to="/"
          style={{ textDecoration: "none" }}>
          <p
            style={{
              color: "white",
              fontSize: "24px",
              textDecoration: decoration[1],
              fontFamily: "Roboto, Helvetica, Arial,sans-serif",
            }}>
            System Files
          </p>
        </Link>
      </Box>
      <Box>
        <Link
          to="/my-files"
          style={{ textDecoration: "none" }}>
          <p
            style={{
              color: "white",
              fontSize: "24px",
              textDecoration: decoration[0],
              fontFamily: "Roboto, Helvetica, Arial,sans-serif",
            }}>
            My Files
          </p>
        </Link>
      </Box>
    </Box>
  )
}

export default Navbar
