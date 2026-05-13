import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { ENDPOINTS } from 'endpoints/endpoints';

const PremiereList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ENDPOINTS.PREMIERE_LIST)
      .then(res => res.json())
      .then(json => {
        setData(json.results || json);
        setLoading(false);
      });
  }, []);

  if (loading) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;

  return (
    <MainCard title="Premiere List">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Premiere Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default PremiereList;