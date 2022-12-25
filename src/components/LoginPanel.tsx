import React, { FC, useEffect, useState } from "react"
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import AuthService from "../api/AuthService"
import { useAuth } from "../contexts/AuthContext"

const LoginInfo: FC = () => {
  const [loginUrl, setLoginUrl] = useState("")
  const { user, setUser } = useAuth()

  const buttonInit = async () => {
    const response = await AuthService.init()
    const data = response.data
    setLoginUrl(data.url)
  }

  useEffect(() => {
    try {
      if (!user.email) {
        buttonInit()
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenuAndLogout = () => {
    window.localStorage.clear()
    setUser({ displayName: null, picture: null, email: null })
    setAnchorElUser(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  if (user.email) {
    return (
      <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row", gap: 2, m: "auto 2vw" }}>
        <Box textAlign={"right"}>
          <Typography
            fontWeight="600"
            fontSize={20}>
            {user.displayName}
          </Typography>
          <Typography
            fontWeight="400"
            color={"#CBD5E0"}>
            {user.email}
          </Typography>
        </Box>
        <Tooltip title={user.displayName}>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={user.name || ""}
              src={user.picture || ""}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "60px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
          <MenuItem onClick={handleCloseUserMenuAndLogout}>
            <Typography textAlign="center">Log out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row", gap: 2, m: "auto 2vw" }}>
        {loginUrl && (
          <Button
            href={loginUrl}
            variant="contained"
            sx={{
              display: "flex",
              bgcolor: "#E2E8F0",
              color: "black",
              fontSize: 18,
              fontWeight: "500",
              mt: "0 auto",
            }}>
            <img
              src="/google.png"
              style={{ width: "40px", marginRight: "10px" }}></img>
            <p style={{ marginTop: "5px" }}>SIGN IN</p>
          </Button>
        )}
      </Box>
    )
  }
}

export default LoginInfo
