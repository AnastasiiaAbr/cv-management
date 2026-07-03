import { Card, CardActionArea, CardContent, Grid, Typography, Box, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { usePositions } from "../context/PositionContext";

export default function Positions() {
  const { positions } = usePositions();
  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography variant='h4'>
          Positions
        </Typography>

        <Button 
        variant="contained"
        startIcon={<AddIcon/>}
        component={Link}
        to='/positions/new'
        >
          Add position
        </Button>
      </Box>

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