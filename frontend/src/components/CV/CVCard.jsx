import {
  Button,
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CVCard({ cv }) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Created:{" "}
            {new Date(cv.createdAt).toLocaleDateString()}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Updated:{" "}
            {new Date(cv.updatedAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => navigate(`/cvs/${cv.id}`)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}