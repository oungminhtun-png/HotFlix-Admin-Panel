import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import { 
  Button, 
  List, 
  ListItem, 
  Divider, 
  Chip, 
  Stack, 
  Typography, 
  Grid,
  CircularProgress,
  Box,
  Container
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

const UsersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Call Logic (လက်ရှိတွင် Mock data သုံးထားသည်)
    const fetchUserData = () => {
      setUser({
        id: id,
        username: "testuser",
        email: "test@example.com",
        role: "customer",
        is_premium: false,
        premium_expiry: "N/A",
        groups: [],
        user_permissions: []
      });
      setLoading(false);
    };
    fetchUserData();
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ p: 1 }}>
      {/* Breadcrumb Title ကို ညှိရန် စာသားသီးသန့် ထုတ်ပြခြင်း */}
      <Typography variant="h4" sx={{ mb: 3 }}>User Details</Typography>

      <MainCard>
        <Grid container spacing={4}>
          
          {/* Account Information Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
              Account Information
            </Typography>
            <List disablePadding>
              <DetailItem label="User ID" value={user.id} isId />
              <DetailItem label="Username" value={user.username} />
              <DetailItem label="Email Address" value={user.email} />
              <DetailItem 
                label="Account Role" 
                value={<Chip label={user.role} size="small" color="primary" variant="light" sx={{ textTransform: 'capitalize' }} />} 
              />
            </List>
          </Grid>

          {/* Membership & Permissions Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
              Access & Membership
            </Typography>
            <List disablePadding>
              <DetailItem 
                label="Premium Status" 
                value={<Chip label={user.is_premium ? 'Premium' : 'Standard'} color={user.is_premium ? 'success' : 'default'} size="small" />} 
              />
              <DetailItem label="Premium Expiry" value={user.premium_expiry} />
              <DetailItem 
                label="Groups" 
                value={user.groups.length > 0 ? user.groups.join(', ') : 'No groups assigned'} 
              />
              <DetailItem 
                label="Permissions" 
                value={
                  user.user_permissions.length > 0 ? (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {user.user_permissions.map((p, i) => <Chip key={i} label={p} size="small" variant="outlined" />)}
                    </Stack>
                  ) : 'No specific permissions'
                } 
              />
            </List>
          </Grid>

          {/* Action Buttons - ညာဘက်အောက်တွင် တန်းစီရန် */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => navigate('/users/list')}
                sx={{ minWidth: 120 }}
              >
                Back to List
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate(`/users/update/${id}`)}
                sx={{ minWidth: 120 }}
              >
                Edit User
              </Button>
            </Stack>
          </Grid>

        </Grid>
      </MainCard>
    </Box>
  );
};

// Layout ညှိထားသော Sub-component
const DetailItem = ({ label, value, isId = false }) => (
  <ListItem sx={{ px: 0, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Grid container alignItems="flex-start">
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500, 
            wordBreak: isId ? 'break-all' : 'normal',
            pl: { sm: 2 } // Desktop မှာ label နဲ့ ခွာရန်
          }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  </ListItem>
);

export default UsersDetail;