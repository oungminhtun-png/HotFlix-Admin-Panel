import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Alert, Stack, Tooltip, IconButton,
  Button, TextField, InputAdornment, TablePagination, Paper, Chip
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - icons
import {
  EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, 
  SearchOutlined, StarOutlined, NumberOutlined
} from '@ant-design/icons';

const RatingList = () => {
  const navigate = useNavigate();
  
  // States
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Pagination States
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINTS.RATING_LIST);
      if (!response.ok) throw new Error('Rating data များ ဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။');

      const data = await response.json();
      // results array ထဲက data ကို ယူခြင်း
      setRatings(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search Logic (Rating number ကို search လုပ်ရန်)
  const filteredRatings = ratings.filter((item) => {
    if (!item || !item.rating) return false; 
    return item.rating.toString().includes(searchText);
  });

  // Pagination Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Action Handlers
  const handleCreate = () => navigate('/rating/create');
  const handleViewDetail = (id) => navigate(`/rating/detail/${id}`);
  const handleEdit = (id) => navigate(`/rating/update/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('ဒီ Rating ကို ဖျက်ရန် သေချာပါသလား?')) {
      try {
        const response = await fetch(ENDPOINTS.RATING_DELETE(id), { method: 'DELETE' });
        if (response.ok) {
          setRatings(ratings.filter((r) => r.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>
  );

  return (
    <MainCard 
      title="Rating Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleCreate} size="small">
          Add Rating
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
            placeholder="Search rating value..."
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
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Rating Value</TableCell>
                <TableCell>Reference ID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRatings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell sx={{ pl: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ 
                          bgcolor: parseFloat(item.rating) >= 8 ? '#f6ffed' : '#fff7e6',
                          p: 1, borderRadius: 1.5, display: 'flex' 
                        }}>
                          <StarOutlined style={{ color: parseFloat(item.rating) >= 8 ? '#52c41a' : '#faad14' }} />
                        </Box>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ fontWeight: 700, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                          onClick={() => handleViewDetail(item.id)}
                        >
                          {item.rating}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <NumberOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
                        <Typography variant="caption" color="secondary" sx={{ fontFamily: 'monospace' }}>
                          {item.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={parseFloat(item.rating) >= 8 ? "High Rated" : "Average"} 
                        size="small" 
                        variant="light"
                        color={parseFloat(item.rating) >= 8 ? "success" : "warning"}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="View Detail">
                          <IconButton color="info" size="small" onClick={() => handleViewDetail(item.id)}>
                            <EyeOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="primary" size="small" onClick={() => handleEdit(item.id)}>
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small" onClick={() => handleDelete(item.id)}>
                            <DeleteOutlined />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredRatings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">No rating records found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRatings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </MainCard>
  );
};

export default RatingList;