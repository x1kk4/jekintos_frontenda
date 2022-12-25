import { Box, Grid } from "@mui/material"
import { FC, memo, useEffect, useState } from "react"
import FilesService from "../../api/FilesService"
import { Files } from "../../dataModels/Files"
import FileItem from "./FileItem"

const SystemFiles: FC = () => {
  const [files, setFiles] = useState<Files>([])
  const [isLoading, setIsLoading] = useState(true)

  const filesFetch = async () => {
    setIsLoading(true)
    FilesService.getFiles()
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
                type={"system"}
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

export default memo(SystemFiles)
