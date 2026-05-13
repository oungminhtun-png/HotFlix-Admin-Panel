import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Chip, CircularProgress, Alert, Stack, Tooltip, IconButton,
  Button, TextField, InputAdornment, Pagination, Avatar
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - ant-design icons
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  PlusOutlined, 
  SearchOutlined,
  CrownOutlined 
} from '@ant-design/icons';

const UsersList = () => {
  const navigate = useNavigate();
  
  // States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Pagination States
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch Users Function
  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem('serviceToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      setLoading(true);
      const url = `${ENDPOINTS.USERS_LIST}?page=${page}&page_size=${rowsPerPage}&search=${searchText}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        // API response structure (results) ကို mapping လုပ်တာပါ
        setUsers(data.results || []);
        setTotalCount(data.count || 0);
        setError(null);
      } else if (response.status === 401) {
        localStorage.removeItem('serviceToken');
        navigate('/login', { replace: true });
      } else {
        setError(data.message || 'ဒေတာဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။');
      }
    } catch (err) {
      setError('Network Error ဖြစ်နေပါသည်။ Server နှင့် ချိတ်ဆက်၍မရပါ။');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchText, navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    if (window.confirm('ဒီ user ကို ဖျက်ရန် သေချာပါသလား?')) {
      console.log('Deleting User ID:', id);
      // Delete API call logic here
    }
  };

  if (loading && users.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Users Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/users/create')} size="small">
          Add User
        </Button>
      }
    >
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        {/* Search Bar */}
        <Box sx={{ width: { xs: '100%', sm: 350 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search username or email..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ color: '#bfbfbf' }} />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Table Content */}
        <TableContainer sx={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3, width: '250px' }}>ID</TableCell>
                <TableCell>User Info</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Membership</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  {/* ID Column */}
                  <TableCell sx={{ pl: 3 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'Monospace', 
                        bgcolor: '#f5f5f5', 
                        p: 0.5, 
                        borderRadius: '4px',
                        color: 'text.secondary'
                      }}
                    >
                      {user.id}
                    </Typography>
                  </TableCell>

                  {/* User Info Column */}
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main', fontSize: '1rem', fontWeight: 600 }}>
                        {user.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user.username}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Email Column */}
                  <TableCell>{user.email}</TableCell>

                  {/* Role Column */}
                  <TableCell align="center">
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color={user.role === 'admin' ? 'primary' : 'secondary'} 
                      variant="outlined" 
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>

                  {/* Membership Column */}
                  <TableCell align="center">
                    {user.is_premium ? (
                      <Chip 
                        icon={<CrownOutlined style={{ color: '#faad14' }} />} 
                        label="Premium" size="small" 
                        sx={{ bgcolor: '#fffbe6', color: '#d48806', border: '1px solid #ffe58f' }} 
                      />
                    ) : (
                      <Chip label="Standard" size="small" variant="light" />
                    )}
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="View"><IconButton color="info" size="small" onClick={() => navigate(`/users/detail/${user.id}`)}><EyeOutlined /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton color="primary" size="small" onClick={() => navigate(`/users/update/${user.id}`)}><EditOutlined /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" size="small" onClick={() => handleDelete(user.id)}><DeleteOutlined /></IconButton></Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    ဒေတာမရှိပါ။
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Rounded Outlined Pagination Section */}
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 2, pb: 2 }}>
          <Pagination
            count={Math.ceil(totalCount / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '6px',
                borderColor: '#d9d9d9',
              },
              '& .Mui-selected': {
                backgroundColor: '#e6f7ff !important',
                color: '#1890ff',
                borderColor: '#91d5ff',
                fontWeight: 'bold'
              }
            }}
          />
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default UsersList;