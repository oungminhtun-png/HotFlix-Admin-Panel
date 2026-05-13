import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Stack, IconButton, Button, CircularProgress, Pagination,
  Rating, Tooltip, Avatar
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { ENDPOINTS, IMAGE_BASE_URL } from 'endpoints/endpoints';

const BannerList = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ count: 0, next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 

  const fetchBanners = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`${ENDPOINTS.BANNER_LIST}?page=${page}`);
      const data = await response.json();
      
      if (response.ok) {
        setBanners(data.results || []);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous
        });
      }
    } catch (error) {
      console.error("Banner fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners(currentPage);
  }, [currentPage, fetchBanners]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading && banners.length === 0) return (
    <Box sx={{ p: 10, textAlign: 'center' }}><CircularProgress /></Box>
  );

  return (
    <MainCard 
      title="Banner Management" 
      secondary={
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/banner/create')} size="small">
          Add Banner
        </Button>
      }
    >
      <TableContainer sx={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Banner ID</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Title & Rating</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell sx={{ pl: 3 }}>
                  <Typography variant="caption" sx={{ fontFamily: 'Monospace', color: 'text.secondary' }}>
                    {row.id.substring(0, 8)}...
                  </Typography>
                </TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={`${IMAGE_BASE_URL}${row.image}`}
                    sx={{ width: 90, height: 50, border: '1px solid #eee' }}
                  />
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{row.title}</Typography>
                    <Rating value={parseFloat(row.rating) / 2} readOnly precision={0.1} size="small" />
                  </Stack>
                </TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.description}
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="View Detail">
                      <IconButton color="info" size="small" onClick={() => navigate(`/banner/detail/${row.id}`)}>
                        <EyeOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary" size="small" onClick={() => navigate(`/banner/update/${row.id}`)}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <IconButton color="error" size="small">
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Pagination count={Math.ceil(pageInfo.count / rowsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" shape="rounded" />
      </Stack>
    </MainCard>
  );
};

export default BannerList;