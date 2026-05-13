import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Stack, Grid, Rating, Alert } from '@mui/material';
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

const BannerCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '', rating: '0', description: '', button_text: '', link: '', image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const response = await fetch(ENDPOINTS.BANNER_LIST, { method: 'POST', body: data });
      if (response.ok) navigate('/banner/list');
      else setError('သိမ်းဆည်းရာတွင် အမှားအယွင်းရှိပါသည်။');
    } catch (err) { setError('Network Error ဖြစ်နေပါသည်။'); }
    finally { setLoading(false); }
  };

  return (
    <MainCard title="Add New Banner">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Title" required onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <span>Rating:</span>
                <Rating precision={0.1} onChange={(e, val) => setFormData({...formData, rating: (val * 2).toString()})} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Button Text" onChange={(e) => setFormData({...formData, button_text: e.target.value})} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Link URL" onChange={(e) => setFormData({...formData, link: e.target.value})} /></Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">Upload Image <input type="file" hidden accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} /></Button>
              {formData.image && <Box sx={{ mt: 1 }}>{formData.image.name}</Box>}
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button color="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Banner'}</Button>
          </Stack>
        </Stack>
      </form>
    </MainCard>
  );
};

export default BannerCreate;