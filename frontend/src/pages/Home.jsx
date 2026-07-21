import { Navigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

export default function HomePage() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{
            minHeight: "60vh",
            py: 4,
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Find your next opportunity.
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 3,
                maxWidth: 500,
              }}
            >
              Create professional CVs, organize your skills and prepare
              tailored resumes for every position.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
              >
                Sign In
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="../public/imgs/work.svg"
              alt="Career"
              sx={{
                width: "100%",
                maxWidth: 450,
                display: "block",
                mx: "auto",
              }}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Everything you need to build your career
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            mb: 5,
          }}
        >
          Create, manage and tailor your CVs for every opportunity.
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mb: 6 }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <DescriptionOutlinedIcon
                  color="primary"
                  sx={{
                    fontSize: 40,
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Multiple CVs
                </Typography>

                <Typography color="text.secondary">
                  Create different CVs tailored for different positions and
                  employers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <WorkOutlineOutlinedIcon
                  color="primary"
                  sx={{
                    fontSize: 40,
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Position Library
                </Typography>

                <Typography color="text.secondary">
                  Browse available positions and understand the skills required
                  for each role.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <PsychologyOutlinedIcon
                  color="primary"
                  sx={{
                    fontSize: 40,
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Skill Management
                </Typography>

                <Typography color="text.secondary">
                  Keep your profile, skills and experience organized in one
                  place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}