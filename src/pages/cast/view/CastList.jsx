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

const CastList = () => {
  const navigate = useNavigate();
  
  // States
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const fetchCasts = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${ENDPOINTS.CAST_LIST}?page=${page}&search=${searchText}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCasts(data.results || []);
        setTotalCount(data.count || 0);
      }
    } catch (err) {
      console.error("Cast fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, searchText]);

  useEffect(() => {
    fetchCasts();
  }, [fetchCasts]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    if (window.confirm('ဒီ Cast ကို ဖျက်ရန် သေချာပါသလား?')) {
      console.log('Deleting Cast ID:', id);
      // အောက်တွင် Delete API Call ထည့်နိုင်သည်
    }
  };

  if (loading && casts.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Cast Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/cast/create')} size="small">
          Add Cast
        </Button>
      }
    >
      <Stack spacing={3}>
        {/* Search Bar */}
        <Box sx={{ width: { xs: '100%', sm: 350 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search cast name..."
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
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3, width: '100px' }}>Short ID</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Cast Name</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casts.map((row) => (
                <TableRow hover key={row.id}>
                  {/* ID Column with Substring 4 */}
                  <TableCell sx={{ pl: 3 }}>
                    <Tooltip title={row.id}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'Monospace', 
                          bgcolor: '#f5f5f5', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: '4px',
                          color: 'text.secondary',
                          cursor: 'help'
                        }}
                      >
                        {/* ID ကို စာလုံး ၄ လုံးပဲ ဖြတ်ပြထားပါသည် */}
                        {row.id ? row.id.toString().substring(0, 4) : 'N/A'}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* Photo Column */}
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={`${IMAGE_BASE_URL}${row.image}`}
                      sx={{ width: 45, height: 45, border: '1px solid #eee' }}
                    >
                      {row.cast ? row.cast.charAt(0) : 'C'}
                    </Avatar>
                  </TableCell>

                  {/* Name Column */}
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {row.cast}
                    </Typography>
                  </TableCell>

                  {/* Created Date Column */}
                  <TableCell align="center">
                    <Typography variant="body2" color="textSecondary">
                      {row.created_at ? new Date(row.created_at).toLocaleDateString() : '---'}
                    </Typography>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="View"><IconButton color="info" size="small" onClick={() => navigate(`/cast/detail/${row.id}`)}><EyeOutlined /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton color="primary" size="small" onClick={() => navigate(`/cast/update/${row.id}`)}><EditOutlined /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" size="small" onClick={() => handleDelete(row.id)}><DeleteOutlined /></IconButton></Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {casts.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No casts found.
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

export default CastList;