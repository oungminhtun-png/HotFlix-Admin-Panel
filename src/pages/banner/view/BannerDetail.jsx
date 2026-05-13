import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { 
  Box, Typography, Stack, Button, CircularProgress, Divider, 
  Rating, TextField, Grid, CardMedia, Alert 
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS, IMAGE_BASE_URL } from 'endpoints/endpoints';
import { EditOutlined, ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons';

const BannerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // အရေးကြီး - ENDPOINTS.BANNER_DETAIL သည် Function ဖြစ်သွားပြီဖြစ်၍ (id) ထည့်ပေးရပါမည်
    const finalUrl = ENDPOINTS.BANNER_DETAIL(id);

    setLoading(true);
    fetch(finalUrl)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error(`Error ${res.status}: Banner details မရှိပါ သို့မဟုတ် ရှာမတွေ့ပါ။`);
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server မှ HTML ပြန်လာနေသည်။ Endpoint လမ်းကြောင်း မှားယွင်းနေပါသည်။");
        }
        return res.json();
      })
      .then((data) => {
        setBanner(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>
  );

  if (error || !banner) return (
    <MainCard title="Error Occurred">
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button variant="contained" onClick={() => navigate('/banner/list')}>Back to List</Button>
    </MainCard>
  );

  return (
    <MainCard 
      title="Banner Details"
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/banner/update/${id}`)}
        >
          Edit
        </Button>
      }
    >
      <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography variant="h5" color="primary" gutterBottom>Image Preview</Typography>
            <Box sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden', textAlign: 'center' }}>
              <CardMedia
                component="img"
                image={`${IMAGE_BASE_URL}${banner.image}`}
                alt={banner.title}
                sx={{ width: '100%', maxHeight: 400, objectFit: 'contain', p: 1 }}
              />
            </Box>
          </Grid>
          
          <Grid item>
            <Stack spacing={2}>
              <TextField fullWidth label="Title" value={banner.title} InputProps={{ readOnly: true }} />
              <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <Typography variant="caption" color="textSecondary">Rating Score</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={parseFloat(banner.rating) / 2} readOnly precision={0.1} />
                  <Typography variant="h6">{banner.rating}/10</Typography>
                </Stack>
              </Box>
              <TextField fullWidth multiline rows={4} label="Description" value={banner.description} InputProps={{ readOnly: true }} />
              <TextField 
                fullWidth 
                label="Target Link" 
                value={banner.link} 
                InputProps={{ 
                  readOnly: true, 
                  startAdornment: <LinkOutlined style={{marginRight: 8}} /> 
                }} 
              />
            </Stack>
          </Grid>

          <Grid item>
            <Divider sx={{ my: 2 }} />
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/banner/list')}
            >
              Back to Banner List
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default BannerDetail;