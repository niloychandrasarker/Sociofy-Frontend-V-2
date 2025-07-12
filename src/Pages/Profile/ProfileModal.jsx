import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from '../../Redux/Auth/auth.action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [editData, setEditData] = React.useState({
    firstName: auth.user?.firstName || "",
    lastName: auth.user?.lastName || "",
    bio: auth.user?.bio || "",
    avatar: auth.user?.avatar || "",
  });

  React.useEffect(() => {
    setEditData({
      firstName: auth.user?.firstName || "",
      lastName: auth.user?.lastName || "",
      bio: auth.user?.bio || "",
      avatar: auth.user?.avatar || "",
    });
  }, [auth.user, open]);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    dispatch(updateProfileAction(editData));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-modal-title"
      aria-describedby="edit-profile-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-profile-modal-title" variant="h6" component="h2" mb={2}>
          Edit Profile
        </Typography>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          fullWidth
          value={editData.firstName}
          onChange={handleEditChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          fullWidth
          value={editData.lastName}
          onChange={handleEditChange}
        />
        <TextField
          margin="dense"
          label="Bio"
          name="bio"
          fullWidth
          multiline
          rows={3}
          value={editData.bio}
          onChange={handleEditChange}
        />
        <TextField
          margin="dense"
          label="Avatar URL"
          name="avatar"
          fullWidth
          value={editData.avatar}
          onChange={handleEditChange}
        />
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}