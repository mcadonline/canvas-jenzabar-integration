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
  

export default function BasicTable(props) {
    const { rows } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function EditModal(modalProps) {
        const { row } = modalProps;
        const [terms, setTerms] = React.useState(row.terms);
        const [savedTerms, setSavedTerms] = React.useState(row.terms);        

        const onEditTerm = () => {
            // Call the update api
            setSavedTerms(terms)
        }

        const onChange = (event) => {
            console.log(event)
            setTerms(event.target.value);
        }
    
        return(<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={modalDivStyle}>
                    <span>name:</span> {row.name}
                </div>
                <div style={modalDivStyle}>
                    <span>sisId:</span> {row.sisid}
                </div>
                <div style={modalDivStyle}>
                    <span>Terms:</span> {savedTerms}
                </div>
                <div style={modalDivStyle}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChange} value={terms} />
                </div>

                <div style={modalDivStyle}>
                    <Button variant="contained" onClick={onEditTerm}>Edit</Button>
                </div>
            </Box>
        </Modal>)
    }


  return (
    <TableContainer component={Paper}>
    

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Sis ID</TableCell>
            <TableCell align="center">Terms</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <EditModal row={row} />
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.sisid}</TableCell>
              <TableCell align="center">{row.terms}</TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={handleOpen}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
