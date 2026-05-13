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
  StarOutlined, 
  DatabaseOutlined,
  HistoryOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const RatingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const finalUrl = ENDPOINTS.RATING_DETAIL(id);
    setLoading(true);
    fetch(finalUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: Rating အချက်အလက် ရှာမတွေ့ပါ။`);
        return res.json();
      })
      .then((data) => {
        setRatingData(data);
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

  if (error || !ratingData) return (
    <MainCard title="System Error">
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button variant="outlined" startIcon={<ArrowLeftOutlined />} onClick={() => navigate('/rating/list')}>
        Back to List
      </Button>
    </MainCard>
  );

  const val = parseFloat(ratingData.rating);

  return (
    <MainCard 
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <StarOutlined style={{ color: '#faad14' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>Rating Detail View</Typography>
        </Stack>
      }
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/rating/update/${id}`)}
          sx={{ borderRadius: 1.5 }}
        >
          Edit Rating
        </Button>
      }
    >
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Paper elevation={0} sx={{ 
                  width: 80, height: 80, borderRadius: 3, 
                  bgcolor: val >= 8 ? '#f6ffed' : '#fff7e6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid', borderColor: val >= 8 ? '#b7eb8f' : '#ffe58f'
                }}>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: val >= 8 ? '#52c41a' : '#faad14' }}>
                    {ratingData.rating}
                  </Typography>
                </Paper>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>Rating Score</Typography>
                  <Typography variant="body2" color="textSecondary">Platform standard evaluation score</Typography>
                </Box>
              </Stack>
              <Chip 
                label={val >= 8 ? "Highly Recommended" : "Standard Rating"} 
                color={val >= 8 ? "success" : "primary"}
                sx={{ fontWeight: 600, borderRadius: 1 }}
              />
            </Stack>
            <Divider sx={{ mt: 3 }} />
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <DatabaseOutlined style={{ color: '#8c8c8c' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Reference UUID</Typography>
                </Stack>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fbfbfb', borderStyle: 'dashed', fontFamily: 'monospace' }}>
                  {ratingData.id}
                </Paper>
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <BarChartOutlined style={{ color: '#8c8c8c' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Technical Overview</Typography>
                </Stack>
                <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                  ဤ Rating တန်ဖိုး <strong>{ratingData.rating}</strong> ကို platform ပေါ်ရှိ content များ ခွဲခြားရန် အသုံးပြုပါသည်။
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#fafafa' }}>
              <Typography variant="subtitle1" sx={{ mb: 2.5, fontWeight: 700 }}>System Logs</Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">Data Integrity</Typography>
                  <Typography variant="subtitle2" color="success.main">Verified</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">Sync Status</Typography>
                  <Chip label="Live" size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#e6f7ff', color: '#1890ff' }} />
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default RatingDetail;