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
import API from '../services/Api';

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
  

export default function UserView(props) {
    const [users, setUsers] = React.useState([]);
    const [email, setEmail] = React.useState();
    const [id, setId] = React.useState();
    const [name, setName] = React.useState();

    const filterData = () => {
        API({
            method: 'post',
            api: 'filter_users',
            data: {
                email, id, name
            }
          }).then(response => {
            // here
            debugger;
            setUsers(response.data.data);
          })
    }
    
    const emailChanger = (event) => setEmail(event.target.value)
    const idChanger = (event) => setId(event.target.value)
    const nameChanger = (event) => setName(event.target.value)

  return (
    <div>
        <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={emailChanger} value={email} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Student Id" variant="outlined" onChange={idChanger} value={id} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={nameChanger} value={name} />
            </div>

            <div>
              <Button variant="SEARCH" onClick={() => filterData()}>Query</Button>
            </div>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Student Id</TableCell>
            <TableCell align="center">Preferred Name</TableCell>
            <TableCell align="center">Mcad Email</TableCell>
            {/* <TableCell align="center">Status</TableCell>
            <TableCell align="center">Template</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
   {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.personalEmail}</TableCell>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.preferredName}</TableCell>
              <TableCell align="center">{row.mcadEmail}</TableCell>
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
