import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Alert, Stack, Tooltip, IconButton,
  Button, TextField, InputAdornment, TablePagination, Paper
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

// assets - icons
import {
  EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined, TagOutlined
} from '@ant-design/icons';

const GenreList = () => {
  const navigate = useNavigate();
  
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINTS.GENRE_LIST);
      if (!response.ok) throw new Error('Genre data များ ဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။');

      const data = await response.json();
      // သင့် JSON အရ results ထဲမှာ data ရှိတာဖြစ်လို့ data.results ကို ယူရပါမယ်
      setGenres(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- အရေးကြီးသော ပြင်ဆင်ချက်: field နာမည်ကို genre.genre လို့ ပြောင်းထားသည် ---
  const filteredGenres = genres.filter((item) => {
    if (!item || !item.genre) return false; 
    return item.genre.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreate = () => navigate('/genre/create');
  const handleViewDetail = (id) => navigate(`/genre/detail/${id}`);
  const handleEdit = (id) => navigate(`/genre/update/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('ဒီ Genre ကို ဖျက်ရန် သေချာပါသလား?')) {
      try {
        const response = await fetch(ENDPOINTS.GENRE_DELETE(id), { method: 'DELETE' });
        if (response.ok) {
          setGenres(genres.filter((g) => g.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Genre Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleCreate} size="small">
          Add Genre
        </Button>
      }
    >
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ width: { xs: '100%', sm: 300 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search genre..."
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

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Genre Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGenres
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell sx={{ pl: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <TagOutlined style={{ color: '#1890ff' }} />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                          onClick={() => handleViewDetail(item.id)}
                        >
                          {item.genre} {/* ဤနေရာတွင် item.genre ကို သုံးထားပါသည် */}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="secondary">
                        {item.id}
                      </Typography>
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
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGenres.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </MainCard>
  );
};

export default GenreList;