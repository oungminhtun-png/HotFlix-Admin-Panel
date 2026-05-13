import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Stack, MenuItem, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const Users_create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', role: 'customer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/users/list');
  };

  return (
    <MainCard title="Create New User">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Username</Typography>
              <TextField fullWidth required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Email Address</Typography>
              <TextField fullWidth type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Role</Typography>
              <TextField fullWidth select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Stack>
          </Grid>

          {/* Button Group - Alignment ညှိရန် */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/users/list')}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ minWidth: 100 }}>
                Save User
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default Users_create;