import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import API from '../services/Api';

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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

const buttonDiv = {
  'margin-left': '10px'
}

const modalDivStyle = {
    'padding-bottom': '10px',
    'padding-top': '10px'
}
  

export default function DataView(props) {
    const [courses, setCourses] = React.useState([]);
    const [modality, setModality] = React.useState();
    const [code, setCode] = React.useState();
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [activeTerm, setActiveTerm] =  React.useState(0);
    const filterData = () => {
      API({
        method: 'post',
        api: 'filter_courses',
        data: {
          modality, code, startDate, endDate, activeTerm
        }
      }).then(response => {
        // here
        let dedupedCourses = {};
        // response.data.data

        setCourses(response.data.data);
      })
    }
    
    const modalityChanger = (event) => setModality(event.target.value)
    const codeValueChanger = (event) => setCode(event.target.value)
    const startDateChanger = (event) => setStartDate(event.target.value)
    const endDateChanger = (event) => setEndDate(event.target.value)
    const activeTermChanger = (event) => setActiveTerm(event.target.value)
    

    const today = new Date();
  return (
    <div>
        <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Modality" variant="outlined" onChange={modalityChanger} value={modality} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Code" variant="outlined" onChange={codeValueChanger} value={code} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Start Date" variant="outlined" onChange={startDateChanger} value={startDate} />
                <TextField id="outlined-basic" label="End Date" variant="outlined" onChange={endDateChanger} value={endDate} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="ActveTerm?" variant="outlined" onChange={activeTermChanger} value={activeTerm} />
            </div>
            <div>
              <Button variant="SEARCH" onClick={() => filterData()}>Query</Button>
            </div>
            {/* <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={today}
                    disablePast
                    views={['year', 'month', 'day']}
                />
              </LocalizationProvider>           
            </div> */}
            
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course code</TableCell>
            <TableCell align="center">Instructor Name</TableCell>
            <TableCell align="center">Term</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            {/* <TableCell align="center">Status</TableCell>
            <TableCell align="center">Template</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.room_id}</TableCell>
              <TableCell align="center">{row.instructorPrefName}</TableCell>
              <TableCell align="center">{row.term}</TableCell>
              <TableCell align="center">{row.startDate}</TableCell>
              <TableCell align="center">{row.endDate}</TableCell>
              {/* <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.blueprint_course_id}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  );
}
