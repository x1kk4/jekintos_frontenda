import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { FC } from "react"
import { File } from "../../dataModels/Files"
import FilesService from "../../api/FilesService"
import { useAuth } from "../../contexts/AuthContext"

interface FileItemProps {
  file: File
  type: string
}

const FileItem: FC<FileItemProps> = ({ file, type }) => {
  const { user } = useAuth()

  return (
    <Card sx={{ height: 160, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div">
          {file.name}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          pb: 1,
        }}>
        <Button
          sx={{ bgcolor: "white", color: "black", fontFamily: "Roboto, Helvetica, Arial,sans-serif", fontWeight: 600 }}
          size="medium"
          variant="contained"
          href={file.previewUrl}
          target="_blank">
          Preview
        </Button>
        {file.downloadUrl && (
          <Button
            sx={{ fontFamily: "Roboto, Helvetica, Arial,sans-serif", fontWeight: 600 }}
            size="medium"
            variant="contained"
            href={file.downloadUrl}>
            Download
          </Button>
        )}
        {type === "system" && (
          <Button
            sx={{ bgcolor: "red", fontFamily: "Roboto, Helvetica, Arial,sans-serif", fontWeight: 600 }}
            size="medium"
            variant="contained"
            disabled={!user.email}
            onClick={() => {
              FilesService.copyFile(user.email, file.fileId).catch(() => {
                console.error("error updating system files")
              })
            }}>
            Copy
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default FileItem
