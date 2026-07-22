import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Stack, TextField, MenuItem, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

import ConfirmDialog from "../components/common/ConfirmDialog";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../services/user.service";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [editingUser, setEditingUser] = useState({
    id: null,
    email: "",
    role: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = async () => {
    try {
      const user = await getUser(selectedUsers[0]);

      setEditingUser(user);
      setOpenEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await updateUser(editingUser.id, {
        email: editingUser.email,
        role: editingUser.role,
      });

      await loadUsers();

      setOpenEdit(false);

      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) => deleteUser(id))
      );

      await loadUsers();

      setSelectedUsers([]);

      setOpenDelete(false);
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
          User Management
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            label="Search"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            disabled={selectedUsers.length !== 1}
            onClick={handleOpenEdit}
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={selectedUsers.length === 0}
            onClick={() => setOpenDelete(true)}
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
                    filteredUsers.length > 0 &&
                    selectedUsers.length === filteredUsers.length
                  }
                  indeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length < filteredUsers.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(
                        filteredUsers.map((user) => user.id)
                      );
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </TableCell>

              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleSelect(user.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSelect(user.id)}
                  />
                </TableCell>

                <TableCell>{user.id}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
          }}
        >
          <TextField
            label="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                email: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            select
            label="Role"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                role: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="ADMIN">
              ADMIN
            </MenuItem>

            <MenuItem value="RECRUITER">
              RECRUITER
            </MenuItem>

            <MenuItem value="CANDIDATE">
              CANDIDATE
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={openDelete}
        title="Delete User"
        message={
          selectedUsers.length === 1
            ? "Are you sure you want to delete this user? This action cannot be undone."
            : `Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`
        }
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}