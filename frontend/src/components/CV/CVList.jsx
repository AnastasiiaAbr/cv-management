import { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CVList({ cvs = [] }) {
  const [search, setSearch] = useState("");

  const filteredCVs = cvs.filter((cv) => {
    const fullName = `${cv.profile?.firstName ?? ""} ${cv.profile?.lastName ?? ""
      }`.toLowerCase();

    const position = (cv.position?.title ?? "").toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      position.includes(search.toLowerCase())
    );
  });

  if (cvs.length === 0) {
    return (
      <Typography color="text.secondary">
        No CVs created yet.
      </Typography>
    );
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={3}
      >
        <TextField
          size="small"
          label="Search"
          placeholder="Candidate or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 320 }}
        />
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCVs.map((cv) => (
              <TableRow
                key={cv.id}
                hover
              >
                <TableCell>
                  {cv.profile?.firstName} {cv.profile?.lastName}
                </TableCell>
                <TableCell>
                  {cv.position?.title}
                </TableCell>

                <TableCell>
                  {new Date(cv.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/cvs/${cv.id}`}
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}