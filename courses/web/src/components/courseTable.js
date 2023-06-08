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
    const [currentEditor, setCurrentEditor] = React.useState();
    const handleOpen = (row) => {
      debugger;
      setCurrentEditor(row.id);
      setOpen(true); 
    }
    const handleClose = () => setOpen(false);

    function EditModal(modalProps) {
        const { row } = modalProps;
        const [template, setTemplate] = React.useState(row.blueprint_course_id);
        // const [savedTerms, setSavedTerms] = React.useState(row.terms);        

        // const onEditTerm = () => {
        //     // Call the update api
        //     setSavedTerms(terms)
        //     setTerms()
        // }

        // const onEditTemplate = () => {
          
        // }

        const onChange = (event) => {
            console.log(event)
            setTemplate(event.target.value);
            row.blueprint_course_id = event.target.value;
        }
    
        return(<Modal
            open={open && currentEditor === row.id}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={modalDivStyle}>
                    <span>Course Id:</span> {row.course_id}
                </div>
                <div style={modalDivStyle}>
                    <span>Short Nme:</span> {row.short_name}
                </div>
                <div style={modalDivStyle}>
                    <span>Long Name:</span> {row.long_name}
                </div>
                <div style={modalDivStyle}>
                    <span>Term Id:</span> {row.term_id}
                </div>
                <div style={modalDivStyle}>
                    <span>Start Date:</span> {row.start_date}
                </div>
                <div style={modalDivStyle}>
                    <span>End Date:</span> {row.end_date}
                </div>
                <div style={modalDivStyle}>
                    <span>Status:</span> {row.status}
                </div>
                <div style={modalDivStyle}>
                    <span>Template:</span> {template}
                </div>

                
                <div style={modalDivStyle}>
                    <TextField id="outlined-basic" label="Template Id" variant="outlined" onChange={onChange} value={template} />
                </div>

                {/* <div style={modalDivStyle}>
                    <Button variant="contained" onClick={onEditTemplate}>Update</Button>
                </div> */}
            </Box>
        </Modal>)
    }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course Id</TableCell>
            <TableCell align="center">Short Nme</TableCell>
            <TableCell align="center">Long Name</TableCell>
            <TableCell align="center">Term Id</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Template</TableCell>
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
              <TableCell align="center">{row.course_id}</TableCell>
              <TableCell align="center">{row.short_name}</TableCell>
              <TableCell align="center">{row.long_name}</TableCell>
              <TableCell align="center">{row.term_id}</TableCell>
              <TableCell align="center">{row.start_date}</TableCell>
              <TableCell align="center">{row.end_date}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.blueprint_course_id}</TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={() => handleOpen(row)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
