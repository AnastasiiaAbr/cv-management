import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button,
  Box, Stack, TextField, MenuItem, Checkbox
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useCategories } from "../../context/CategoryContext";

import { useAttributes } from "../../context/AttributeContext";

export default function Attributes() {
  const { attributes, deleteAttribute } = useAttributes();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categories } = useCategories();

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedAttributes.map((id) =>
          deleteAttribute(id)
        )
      );

      setSelectedAttributes([]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (id) => {
    setSelectedAttributes((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredAttributes = attributes.filter((attribute) => {
    const matchesSearch = attribute.name
      .toLowerCase()
      .startsWith(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      attribute.category.id === Number(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" sx={{mb: 3}}>
          Attribute Library
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <TextField
            size="small"
            label="Search"
            placeholder="Type attribute name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <TextField
            select
            size="small"
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: 220 }}
          >
            <MenuItem value="">
              All
            </MenuItem>

            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </TextField>

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
            disabled={selectedAttributes.length !== 1}
            component={Link}
            to={`/attributes/${selectedAttributes[0]}/edit`}>
            Edit
          </Button>

          <Button
            color="error"
            variant="outlined"
            disabled={selectedAttributes.length === 0}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
      <Paper sx={{mt: 3}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    filteredAttributes.length > 0 &&
                    selectedAttributes.length === filteredAttributes.length
                  }
                  indeterminate={
                    selectedAttributes.length > 0 &&
                    selectedAttributes.length < filteredAttributes.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAttributes(
                        filteredAttributes.map((a) => a.id)
                      );
                    } else {
                      setSelectedAttributes([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAttributes.map((attribute) => (
              <TableRow
                key={attribute.id}
                hover
                onClick={() => handleSelect(attribute.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAttributes.includes(attribute.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSelect(attribute.id)}
                  />
                </TableCell>
                <TableCell>{attribute.category.name}</TableCell>
                <TableCell>{attribute.name}</TableCell>
                <TableCell>{attribute.type}</TableCell>
                <TableCell>{attribute.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper >

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