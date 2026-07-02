import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import positions from "../data/positions";

export default function Positions() {
  return (
    <>
      <Typography variant='h4' gutterBottom>
        Positions
      </Typography>

      <Grid container spacing={2}>
        {positions.map((position) => (
          <Grid size={{ xs: 12, md: 6 }} key={position.id}>
            <Card>
              <CardActionArea component={Link} to={`/positions/${position.id}`}>
                <CardContent>
                  <Typography variant="h6">
                    {position.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}; 