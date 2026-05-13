import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Stack, Tooltip, IconButton,
  Button, TextField, InputAdornment, Pagination
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - ant-design icons
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  SearchOutlined 
} from '@ant-design/icons';

const CountryList = () => {
  const navigate = useNavigate();
  
  // States
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${ENDPOINTS.COUNTRY_LIST}?page=${page}&search=${searchText}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCountries(data.results || []);
        setTotalCount(data.count || 0);
      }
    } catch (err) {
      console.error("Country fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, searchText]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    if (window.confirm('ဒီ Country ကို ဖျက်ရန် သေချာပါသလား?')) {
      console.log('Deleting Country ID:', id);
    }
  };

  if (loading && countries.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Country Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/country/create')} size="small">
          Add Country
        </Button>
      }
    >
      <Stack spacing={3}>
        {/* Search Bar */}
        <Box sx={{ width: { xs: '100%', sm: 350 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search country..."
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
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3, width: '350px' }}>Country ID (UUID)</TableCell>
                <TableCell>Country Name</TableCell>
                <TableCell align="center">Created Date</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.map((row) => (
                <TableRow hover key={row.id}>
                  {/* ID Column */}
                  <TableCell sx={{ pl: 3 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'Monospace', 
                        bgcolor: '#f9f9f9', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: '4px',
                        color: 'text.secondary',
                        border: '1px solid #eee'
                      }}
                    >
                      {row.id}
                    </Typography>
                  </TableCell>

                  {/* Country Name Column */}
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {row.country}
                    </Typography>
                  </TableCell>

                  {/* Date Column */}
                  <TableCell align="center">
                    <Typography variant="body2" color="textSecondary">
                      {new Date(row.created_at).toLocaleDateString()}
                    </Typography>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" size="small" onClick={() => navigate(`/country/update/${row.id}`)}>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {countries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No countries found.
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

export default CountryList;