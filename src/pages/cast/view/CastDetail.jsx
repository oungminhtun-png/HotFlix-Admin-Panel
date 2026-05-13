import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { 
  Box, Typography, Stack, Button, CircularProgress, Divider, 
  TextField, Grid, CardMedia, Alert, Paper
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS, IMAGE_BASE_URL } from 'endpoints/endpoints';
import { EditOutlined, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const CastDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const finalUrl = ENDPOINTS.CAST_DETAIL(id);

    setLoading(true);
    fetch(finalUrl)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error(`Error ${res.status}: သရုပ်ဆောင်အချက်အလက် ရှာမတွေ့ပါ။`);
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API Endpoint မှားယွင်းနေပါသည်။");
        }
        return res.json();
      })
      .then((data) => {
        setCast(data);
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

  if (error || !cast) return (
    <MainCard title="Error">
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button variant="contained" onClick={() => navigate('/cast/list')}>Back to List</Button>
    </MainCard>
  );

  return (
    <MainCard 
      title="Cast Information"
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/cast/update/${id}`)}
        >
          Edit
        </Button>
      }
    >
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Grid container spacing={4}>
          
          {/* Left Side: Profile Image (Limited Size) */}
          <Grid item xs={12} sm={5} md={4}>
            <Paper variant="outlined" sx={{ p: 1, borderRadius: 2, bgcolor: '#fafafa' }}>
              <Box sx={{ 
                width: '100%', 
                height: 350, // ပုံအရမ်းမကြီးအောင် height ကန့်သတ်ထားသည်
                borderRadius: 1, 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#eee'
              }}>
                {cast.image ? (
                  <CardMedia
                    component="img"
                    image={`${IMAGE_BASE_URL}${cast.image}`}
                    alt={cast.name}
                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: 80, color: '#ccc' }} />
                )}
              </Box>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                  {cast.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  ID: {cast.id.substring(0, 8)}...
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Side: Details */}
          <Grid item xs={12} sm={7} md={8}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>Biography</Typography>
                <Divider />
              </Box>
              
              <TextField 
                fullWidth 
                label="Full Name" 
                value={cast.name || ''} 
                InputProps={{ readOnly: true }} 
              />

              <TextField 
                fullWidth 
                multiline 
                rows={10} 
                label="Biography Detail" 
                value={cast.bio || 'သရုပ်ဆောင်အကြောင်း အချက်အလက် မရှိပါ။'} 
                InputProps={{ readOnly: true }} 
                sx={{ bgcolor: '#fff' }}
              />

              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Last Updated: {new Date(cast.updated_at || cast.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Button 
              variant="text" 
              startIcon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/cast/list')}
            >
              Back to Cast List
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CastDetail;