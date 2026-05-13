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

const DirectorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // endpoints.js ထဲမှာ DIRECTOR_DETAIL: (id) => ... ရှိရပါမယ်
    const finalUrl = ENDPOINTS.DIRECTOR_DETAIL(id);

    setLoading(true);
    fetch(finalUrl)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error(`Error ${res.status}: ဒါရိုက်တာအချက်အလက် ရှာမတွေ့ပါ။`);
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server Error: API Endpoint လွဲမှားနေပါသည်။");
        }
        return res.json();
      })
      .then((data) => {
        setDirector(data);
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

  if (error || !director) return (
    <MainCard title="Error">
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button variant="contained" onClick={() => navigate('/director/list')}>Back to List</Button>
    </MainCard>
  );

  return (
    <MainCard 
      title="Director Profile"
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/director/update/${id}`)}
        >
          Edit
        </Button>
      }
    >
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Grid container spacing={4}>
          {/* Left: Image */}
          <Grid item xs={12} sm={5} md={4}>
            <Paper variant="outlined" sx={{ p: 1, borderRadius: 2, bgcolor: '#fafafa' }}>
              <Box sx={{ 
                width: '100%', height: 350, borderRadius: 1, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eee' 
              }}>
                {director.image ? (
                  <CardMedia
                    component="img"
                    image={`${IMAGE_BASE_URL}${director.image}`}
                    alt={director.name}
                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: 80, color: '#ccc' }} />
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right: Info */}
          <Grid item xs={12} sm={7} md={8}>
            <Stack spacing={3}>
              <Typography variant="h3">{director.name}</Typography>
              <Divider />
              <TextField fullWidth label="Full Name" value={director.name || ''} InputProps={{ readOnly: true }} />
              <TextField 
                fullWidth multiline rows={8} 
                label="Biography" 
                value={director.bio || 'No biography available.'} 
                InputProps={{ readOnly: true }} 
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Button variant="text" startIcon={<ArrowLeftOutlined />} onClick={() => navigate('/director/list')}>
              Back to Director List
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default DirectorDetail;