import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Stack,
  TextField,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useState } from "react";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import { usePositions } from "../../context/PositionContext";

export default function Positions() {
  const { positions, removePosition } = usePositions();

  const [selectedPositions, setSelectedPositions] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredPositions = positions.filter((position) =>
    position.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id) => {
    setSelectedPositions((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedPositions.map((id) => removePosition(id))
      );

      setSelectedPositions([]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Positions
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <TextField
            size="small"
            label="Search"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/positions/new"
          >
            Add Position
          </Button>

          <Button
            variant="outlined"
            disabled={selectedPositions.length !== 1}
            component={Link}
            to={`/positions/${selectedPositions[0]}/edit`}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            disabled={selectedPositions.length !== 1}
            onClick={() => {
              // TODO
              console.log("Duplicate");
            }}
          >
            Duplicate
          </Button>

          <Button
            color="error"
            variant="outlined"
            disabled={selectedPositions.length === 0}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    filteredPositions.length > 0 &&
                    selectedPositions.length === filteredPositions.length
                  }
                  indeterminate={
                    selectedPositions.length > 0 &&
                    selectedPositions.length < filteredPositions.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPositions(
                        filteredPositions.map((p) => p.id)
                      );
                    } else {
                      setSelectedPositions([]);
                    }
                  }}
                />
              </TableCell>

              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPositions.map((position) => (
              <TableRow
                key={position.id}
                hover
                onClick={() => handleSelect(position.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPositions.includes(position.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSelect(position.id)}
                  />
                </TableCell>

                <TableCell>
                  {position.title}
                </TableCell>

                <TableCell>
                  {position.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <ConfirmDialog
        open={open}
        title="Delete Position"
        message="Are you sure you want to delete the selected position(s)?"
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}