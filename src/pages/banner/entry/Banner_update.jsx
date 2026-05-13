import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Stack, Grid, Rating, CircularProgress } from '@mui/material';
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

const BannerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({ title: '', rating: '0', description: '', button_text: '', link: '', image: null });

  useEffect(() => {
    fetch(`${ENDPOINTS.BANNER_LIST}${id}/`)
      .then(res => res.json())
      .then(data => {
        setFormData({ ...data, image: null });
        setFetching(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    ['title', 'rating', 'description', 'button_text', 'link'].forEach(key => data.append(key, formData[key]));
    if (formData.image) data.append('image', formData.image);

    await fetch(`${ENDPOINTS.BANNER_LIST}${id}/`, { method: 'PUT', body: data });
    setLoading(false);
    navigate('/banner/list');
  };

  if (fetching) return <CircularProgress />;

  return (
    <MainCard title="Edit Banner">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></Grid>
            <Grid item xs={12} md={6}>
              <Rating precision={0.1} value={parseFloat(formData.rating) / 2} onChange={(e, val) => setFormData({...formData, rating: (val * 2).toString()})} />
            </Grid>
            <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></Grid>
            <Grid item xs={12}><Button variant="outlined" component="label">Change Image <input type="file" hidden onChange={(e) => setFormData({...formData, image: e.target.files[0]})} /></Button></Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={loading}>Update Banner</Button>
          </Stack>
        </Stack>
      </form>
    </MainCard>
  );
};

export default BannerUpdate;