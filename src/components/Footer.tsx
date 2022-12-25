import { Box, Button } from "@mui/material"
import { FC, useState } from "react"
import FilesService from "../api/FilesService"
import { useAuth } from "../contexts/AuthContext"

const Footer: FC = () => {
  const [fileId, setFileId] = useState("")
  const { user } = useAuth()

  const poehali = (fileId: string): void => {
    try {
      FilesService.shareFile(user.email, fileId)
      setFileId("")
    } catch (e) {
      console.error(e)
      setFileId("")
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "7vh",
        bgcolor: "#322659",
        color: "white",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: 10,
        pr: 10,
      }}>
      <Box sx={{ fontFamily: "Roboto, Helvetica, Arial,sans-serif" }}>Евгений Макарьев</Box>
      {user.email && (
        <Box>
          <input onChange={(e) => setFileId(e.target.value)} />
          <Button
            //@ts-ignore
            onClick={() => poehali(fileId)}
            sx={{ ml: 3 }}
            variant="contained">
            Send
          </Button>
        </Box>
      )}
      <Box sx={{ fontFamily: "Roboto, Helvetica, Arial,sans-serif" }}>Константин Басков</Box>
    </Box>
  )
}

export default Footer
