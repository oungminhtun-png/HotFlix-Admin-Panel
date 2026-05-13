import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Tooltip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  TablePagination,
  Paper
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - icons
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined
} from '@ant-design/icons';

const GroupsList = () => {
  const navigate = useNavigate();
  
  // States
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Pagination States
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('serviceToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchGroups(token);
  }, [navigate]);

  const fetchGroups = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINTS.GROUPS_LIST, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('serviceToken');
        navigate('/login', { replace: true });
        return;
      }

      const data = await response.json();
      setGroups(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError('Group data များ ဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။');
    } finally {
      setLoading(false);
    }
  };

  // Search Logic
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // --- Action Handlers ---
  const handleCreate = () => navigate('/groups/create');
  
  // ဤနေရာတွင် Detail Page သို့ သွားရန် Logic ပါဝင်ပါသည်
  const handleViewDetail = (id) => {
    navigate(`/groups/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/groups/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('ဒီ Group ကို ဖျက်ရန် သေချာပါသလား?')) {
      try {
        const token = localStorage.getItem('serviceToken');
        const response = await fetch(ENDPOINTS.GROUPS_DELETE(id), {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setGroups(groups.filter((g) => g.id !== id));
        } else {
          alert('Error: ဖျက်၍ မရပါ။');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <MainCard 
      title="Groups Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleCreate} size="small">
          Add Group
        </Button>
      }
    >
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        {/* Search Bar */}
        <Box sx={{ width: { xs: '100%', sm: 300 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search groups..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Table Section */}
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Group Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Members</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGroups
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((group) => (
                  <TableRow hover key={group.id}>
                    <TableCell sx={{ pl: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <TeamOutlined style={{ color: '#1890ff' }} />
                        <Typography 
                           variant="subtitle1" 
                           sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                           onClick={() => handleViewDetail(group.id)} // နာမည်ကို နှိပ်ရင်လည်း Detail သွားရန်
                        >
                          {group.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {group.description || <Typography variant="caption" color="secondary">No description</Typography>}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={group.user_count || 0} size="small" color="info" variant="light" />
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        
                        {/* Eye Icon for Detail View */}
                        <Tooltip title="View Details">
                          <IconButton color="info" size="small" onClick={() => handleViewDetail(group.id)}>
                            <EyeOutlined />
                          </IconButton>
                        </Tooltip>

                        {/* Edit Icon */}
                        <Tooltip title="Edit Group">
                          <IconButton color="primary" size="small" onClick={() => handleEdit(group.id)}>
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>

                        {/* Delete Icon */}
                        <Tooltip title="Delete Group">
                          <IconButton color="error" size="small" onClick={() => handleDelete(group.id)}>
                            <DeleteOutlined />
                          </IconButton>
                        </Tooltip>
                        
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGroups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </MainCard>
  );
};

export default GroupsList;