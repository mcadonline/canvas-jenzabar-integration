import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../services/Api';
import Button from '@mui/material/Button';



class RunnersDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { runners: [], currentRunner: null };
  }

  handleChange(event) {
    // setCurrentRunner(event.target.value);
    this.setState({ currentRunner: event.target.value })
  };

  handleRunnerClick() {
    if (this.state.currentRunner) {
      API({
        method: 'post',
        api: this.props.api,
        data: { runner: this.state.currentRunner }
      }).then(response => {
        alert(`Intiated Runner`);
      })
    } else {
      alert('Select a runner')
    }
    
  }

  componentDidMount() {
    API({
      method: 'get',
      api: this.props.api
    }).then(response => {
      // console.log(response.data.runners);
      this.setState({ runners: response.data.runners })
      // this.forceUpdate()
        // setRunners(response.data.runners);
    })
  }

  render() {
    const { currentRunner, runners } = this.state;

    return(
      <Box sx={{ minWidth: 120, padding: '30px' }}>
      <h2>Select the runner</h2>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Runner</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentRunner}
          label="Runner"
          onChange={this.handleChange.bind(this)}
        >
            {runners.map((runner) => {
                return(
                    <MenuItem value={runner.value}>{runner.name}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
      <Box sx={{ padding: '10px' }}>
        <Button variant="contained" onClick={this.handleRunnerClick.bind(this)}>Run</Button>
      </Box>
    </Box>
    )
  }
}

// function RunnersDropDown(props) {
//     const [runners, setRunners] = React.useState(props.runners || []);
//    const [currentRunner, setCurrentRunner] = React.useState(null);

//     React.useEffect(() => {
//         API({
//             method: 'get',
//             api: props.api
//         }).then(response => {
//             setRunners(response.data.runners);
//         })
//     })

//   const handleChange = (event) => {
//     setCurrentRunner(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120, padding: '30px' }}>
//       <h2>Select the runner</h2>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Runner</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={currentRunner}
//           label="Runner"
//           onChange={handleChange}
//         >
//             {runners.map((runner) => {
//                 return(
//                     <MenuItem value={runner.value}>{runner.name}</MenuItem>
//                 )
//             })}
//         </Select>
//       </FormControl>
//       <Box sx={{ padding: '10px' }}>
//         <Button variant="contained">Run</Button>
//       </Box>
//     </Box>
//   );
// }


export class Runners extends React.Component {
  constructor(props) {
    super(props);
    this.state = { runners: [] };
  }

  componentDidMount() {
    API({
      method: 'get',
      api: 'runners'
    }).then(response => {
      // console.log(response.data.runners);
      this.setState({ runners: response.data.runners })
      // this.forceUpdate()
        // setRunners(response.data.runners);
    })
  }

  render() {
    const { runners } = this.state;

    console.log(runners);
    return(
      <div>
        <div>
            <h1>Runners</h1>
            <RunnersDropDown  api="runners" runners={runners} />
        </div>

        <div>
            <h1>Custom Runners</h1>
            <RunnersDropDown  api="custom_runners"  runners={runners}/>
        </div>        
      </div>
    )
  }
}

// export default function Runners() {
//   const [runners, setRunners] = React.useState([]);

//     React.useEffect(() => {
//       API({
//           method: 'get',
//           api: 'runners'
//       }).then(response => {
//           setRunners(response.data.runners);
//       })
//   })

//    return(
//     <div>
//         <div>
//             <h1>Runners</h1>
//             <RunnersDropDown  api="runners" runners={runners} />
//         </div>

//         <div>
//             <h1>Custom Runners</h1>
//             <RunnersDropDown  api="custom_runners"  runners={runners}/>
//         </div>        
//     </div>
//    )
// }