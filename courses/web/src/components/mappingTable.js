import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const modalDivStyle = {
    'padding-bottom': '10px',
    'padding-top': '10px'
}
  

export default function MappingTable(props) {
    const { rows } = props;
    const [open, setOpen] = React.useState(false);

  return (
    <TableContainer component={Paper}>
    

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Source Key</TableCell>
            <TableCell align="center">Source Value</TableCell>
            <TableCell align="center">Destination Key</TableCell>
            <TableCell align="center">Destination Value</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.sourceKey}</TableCell>
              <TableCell align="center">{row.sourceValue}</TableCell>
              <TableCell align="center">{row.DestinationKey}</TableCell>
              <TableCell align="center">{row.DestinationValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
