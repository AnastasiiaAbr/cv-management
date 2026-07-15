import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button,
  Box, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmDialog from "../../components/common/ConfirmDialog";


import { useAttributes } from "../../context/AttributeContext";

export default function Attributes() {
  const { attributes, deleteAttribute } = useAttributes();
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteAttribute(selectedAttributeId);
    setSelectedAttributeId(null);
    setOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Attribute Library
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/attributes/new"
          >
            Add Attribute
          </Button>

          <Button
            variant="outlined"
            disabled={!selectedAttributeId}
            component={Link}
            to={`/attributes/${selectedAttributeId}/edit`}
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="outlined"
            disabled={!selectedAttributeId}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attributes.map((attribute) => (
              <TableRow
                key={attribute.id}
                hover
                selected={selectedAttributeId === attribute.id}
                onClick={() => setSelectedAttributeId(attribute.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{attribute.category.name}</TableCell>
                <TableCell>{attribute.name}</TableCell>
                <TableCell>{attribute.type}</TableCell>
                <TableCell>{attribute.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <ConfirmDialog
        open={open}
        title="Delete Attribute"
        message="Are you sure you want to delete this attribute? This action cannot be undone."
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}