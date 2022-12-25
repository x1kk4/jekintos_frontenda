import { Box, Grid } from "@mui/material"
import { FC, useEffect, useState } from "react"
import FilesService from "../../api/FilesService"
import { useAuth } from "../../contexts/AuthContext"
import { Files } from "../../dataModels/Files"
import FileItem from "./FileItem"

const UserFiles: FC = () => {
  const [files, setFiles] = useState<Files>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  const filesFetch = async () => {
    setIsLoading(true)
    FilesService.getUserFiles(user.email)
      .then((response) => {
        setFiles(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    filesFetch()
  }, [])

  if (!user.email) {
    return (
      <p style={{ margin: "30vh auto", fontFamily: "Roboto, Helvetica, Arial,sans-serif", fontSize: 30 }}>
        Please Login! Z!
      </p>
    )
  }

  if (!isLoading)
    return (
      <Box sx={{ width: "100%", height: "79vh", overflow: "auto" }}>
        <Grid
          container
          spacing={3}
          sx={{ pl: 12, pr: 12 }}>
          {files.map((file, key) => (
            <Grid
              item
              xs={3}
              key={key}>
              <FileItem
                file={file}
                type={"user"}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  return (
    <p style={{ margin: "30vh auto", fontFamily: "Roboto, Helvetica, Arial,sans-serif", fontSize: 30 }}>Loading...</p>
  )
}

export default UserFiles
