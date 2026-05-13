import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { 
  Box, Typography, Stack, Button, CircularProgress, Divider, 
  Grid, Alert, Paper, Chip 
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - icons
import { 
  EditOutlined, 
  ArrowLeftOutlined, 
  TagOutlined, 
  InfoCircleOutlined,
  CalendarOutlined,
  LinkOutlined
} from '@ant-design/icons';

const GenreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const finalUrl = ENDPOINTS.GENRE_DETAIL(id);
    setLoading(true);
    fetch(finalUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: Genre အချက်အလက် ရှာမတွေ့ပါ။`);
        return res.json();
      })
      .then((data) => {
        setGenre(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress size={32} />
    </Box>
  );

  if (error || !genre) return (
    <MainCard title="System Alert">
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button variant="outlined" startIcon={<ArrowLeftOutlined />} onClick={() => navigate('/genre/list')}>
        Back to List
      </Button>
    </MainCard>
  );

  return (
    <MainCard 
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <TagOutlined style={{ color: '#1890ff' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>Genre Profile</Typography>
        </Stack>
      }
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/genre/update/${id}`)}
          sx={{ borderRadius: 1.5 }}
        >
          Edit Detail
        </Button>
      }
    >
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        <Grid container spacing={4}>
          
          {/* Header Info */}
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
                  CATEGORY NAME
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {genre.genre}
                </Typography>
              </Box>
              <Chip 
                label="System Verified" 
                variant="outlined" 
                color="success" 
                size="small" 
                sx={{ borderRadius: 1, px: 1, bgcolor: '#f6ffed' }} 
              />
            </Stack>
            <Divider sx={{ mt: 3 }} />
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              {/* ID Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <LinkOutlined style={{ color: '#8c8c8c' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Reference ID</Typography>
                </Stack>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    bgcolor: '#fafafa', 
                    fontFamily: 'JetBrains Mono, monospace', 
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    borderStyle: 'dashed'
                  }}
                >
                  {genre.id}
                </Paper>
              </Box>

              {/* Static Info Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>About this Genre</Typography>
                </Stack>
                <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                  ဤ <strong>{genre.genre}</strong> သည် platform ပေါ်ရှိ content များကို စနစ်တကျ ခွဲခြားရန် အသုံးပြုပါသည်။ 
                  ယခု category အောက်တွင်ရှိသော movie နှင့် series များအားလုံးကို user များ လွယ်ကူစွာ ရှာဖွေနိုင်မည် ဖြစ်ပါသည်။
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Metadata Section */}
          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#fcfcfc' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Record Details</Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">Created Date</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarOutlined style={{ fontSize: '12px' }} />
                    <Typography variant="subtitle2">May 11, 2026</Typography>
                  </Stack>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">Data Status</Typography>
                  <Typography variant="subtitle2" color="success.main">Active</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">Content Usage</Typography>
                  <Typography variant="subtitle2">Global Access</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Navigation Footer */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Button 
              variant="text" 
              startIcon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/genre/list')}
              sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'transparent', color: 'primary.main' } }}
            >
              Back to Genre List
            </Button>
          </Grid>

        </Grid>
      </Box>
    </MainCard>
  );
};

export default GenreDetail;