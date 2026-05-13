import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Stack, Tooltip, IconButton,
  Button, TextField, InputAdornment, Pagination, Avatar
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS, IMAGE_BASE_URL } from 'endpoints/endpoints';

// assets - ant-design icons
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  PlusOutlined, 
  SearchOutlined 
} from '@ant-design/icons';

const DirectorList = () => {
  const navigate = useNavigate();
  
  // States
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const fetchDirectors = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${ENDPOINTS.DIRECTOR_LIST}?page=${page}&search=${searchText}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setDirectors(data.results || []);
        setTotalCount(data.count || 0);
      }
    } catch (err) {
      console.error("Director fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, searchText]);

  useEffect(() => {
    fetchDirectors();
  }, [fetchDirectors]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    if (window.confirm('ဒီ Director ကို ဖျက်ရန် သေချာပါသလား?')) {
      console.log('Deleting Director ID:', id);
    }
  };

  if (loading && directors.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Director Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/director/create')} size="small">
          Add Director
        </Button>
      }
    >
      <Stack spacing={3}>
        {/* Search Bar */}
        <Box sx={{ width: { xs: '100%', sm: 350 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search director name..."
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
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3, width: '250px' }}>Director ID</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Joined Date</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directors.map((row) => (
                <TableRow hover key={row.id}>
                  {/* ID Column */}
                  <TableCell sx={{ pl: 3 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'Monospace', 
                        bgcolor: '#f5f5f5', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: '4px',
                        color: 'text.secondary'
                      }}
                    >
                      {row.id}
                    </Typography>
                  </TableCell>

                  {/* Image Column */}
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={`${IMAGE_BASE_URL}${row.image}`}
                      sx={{ width: 45, height: 45, border: '1px solid #eee' }}
                    >
                      {row.director.charAt(0)}
                    </Avatar>
                  </TableCell>

                  {/* Director Name Column */}
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {row.director}
                    </Typography>
                  </TableCell>

                  {/* Created At Column */}
                  <TableCell align="center">
                    <Typography variant="body2" color="textSecondary">
                      {new Date(row.created_at).toLocaleDateString()}
                    </Typography>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="View"><IconButton color="info" size="small" onClick={() => navigate(`/director/detail/${row.id}`)}><EyeOutlined /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton color="primary" size="small" onClick={() => navigate(`/director/update/${row.id}`)}><EditOutlined /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" size="small" onClick={() => handleDelete(row.id)}><DeleteOutlined /></IconButton></Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {directors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No directors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
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

export default DirectorList;