import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { 
  Button, 
  Stack, 
  Typography, 
  Grid,
  CircularProgress,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  Divider,
  Paper
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';

const UsersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Call Mockup
    setTimeout(() => {
      setUser({
        id: id,
        username: "testuser",
        email: "test@example.com",
        role: "customer",
        is_premium: true,
        premium_expiry: "2026-12-31",
        groups: ["VIP Member", "Support Team"],
        user_permissions: ["view_reports", "edit_content", "delete_logs"]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <MainCard 
      title="User Profile Information"
      secondary={
        <Button 
          variant="contained" 
          startIcon={<EditOutlined />} 
          onClick={() => navigate(`/users/update/${id}`)}
        >
          Edit Profile
        </Button>
      }
    >
      {/* Container ကို Width ကန့်သတ်ထားခြင်းဖြင့် အပေါ်အောက်ကြည့်ရတာ ပိုရှင်းသွားစေသည် */}
      <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Grid container spacing={2.5} direction="column">
          
          {/* Section 1: Account Info */}
          <Grid item>
            <Typography variant="h5" color="primary" sx={{ mb: 1 }}>Account Details</Typography>
            <Divider />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="System User ID"
              value={user.id}
              InputProps={{ readOnly: true }}
              variant="filled"
              size="small"
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Username"
              value={user.username}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Email Address"
              value={user.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Assigned Role"
              value={user.role.toUpperCase()}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Section 2: Membership */}
          <Grid item sx={{ mt: 2 }}>
            <Typography variant="h5" color="primary" sx={{ mb: 1 }}>Membership Status</Typography>
            <Divider />
          </Grid>

          <Grid item>
            <Paper variant="outlined" sx={{ p: 1.5, bgcolor: '#fbfbfb' }}>
              <FormControlLabel
                control={<Switch checked={user.is_premium} disabled />}
                label={user.is_premium ? "Premium Subscription: Active" : "Standard Account"}
              />
            </Paper>
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Expiry Date"
              value={user.premium_expiry || 'No Expiry'}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Section 3: Access Control */}
          <Grid item sx={{ mt: 2 }}>
            <Typography variant="h5" color="primary" sx={{ mb: 1 }}>Access Control</Typography>
            <Divider />
          </Grid>

          <Grid item>
             <Typography variant="caption" color="textSecondary">User Groups</Typography>
             <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                {user.groups.map((group) => (
                  <Chip key={group} label={group} color="secondary" variant="combined" size="small" />
                ))}
             </Stack>
          </Grid>

          <Grid item>
            <Typography variant="caption" color="textSecondary">Permissions</Typography>
            <Box sx={{ mt: 0.5, p: 2, border: '1px solid #e6ebf1', borderRadius: 1 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {user.user_permissions.map((perm) => (
                  <Chip key={perm} label={perm} variant="outlined" size="small" />
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid item sx={{ mt: 3, mb: 2 }}>
            <Divider sx={{ mb: 3 }} />
            <Stack direction="row" spacing={2}>
              <Button 
                fullWidth
                variant="outlined" 
                color="secondary" 
                startIcon={<ArrowLeftOutlined />}
                onClick={() => navigate('/users/list')}
              >
                Back to List
              </Button>
              <Button 
                fullWidth
                variant="contained" 
                startIcon={<EditOutlined />}
                onClick={() => navigate(`/users/update/${id}`)}
              >
                Go to Edit
              </Button>
            </Stack>
          </Grid>

        </Grid>
      </Box>
    </MainCard>
  );
};

export default UsersDetail;