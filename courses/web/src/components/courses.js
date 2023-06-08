import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicTable from './courseTable';
import API from '../services/Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Mapping from './mapping';
import { Runners } from './runners';
import { CSVLink, CSVDownload } from "react-csv";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const buttonDiv = {
  'margin-left': '10px'
}

export default function Courses() {
    const [value, setValue] = React.useState(0);
    const [jobId, setJobId] = React.useState();
    const [canvasCourse, setCanvasCourses] = React.useState([]);

    React.useEffect(() => {
        // API({
        //     method: 'get',
        //     api: ''
        // }).then(response => {
        //     setCanvasCourses(response.courses);
        // })
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onJobIdChange = (event) => {
      setJobId(event.target.value);
    }

    const seachForExports = (event) => {
      API({
        method: 'get',
        api: `exports?jobId=${jobId}`
      }).then(response => {
          let parsedData = response.data.exports.map(exp => {
            return { id: exp.id, ...JSON.parse(exp.data) };
          })

          setCanvasCourses(parsedData);
      })
    }

    const prepareCsvData = () => {
      let data = canvasCourse.map(course => {
        return [course.course_id, course.short_name, course.long_name, course.term_id, course.start_date, course.end_date, course.status, course.blueprint_course_id]
      })

      data.unshift(['course_id', 'short_name', 'long_name', 'term_id', 'start_date', 'end_date', 'status', 'blueprint_course_id'])

      return data;
    }
    
    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="courses">
            <Tab label="Runner" />
            <Tab label="Course Shells" {...a11yProps(0)} />
            <Tab label="Mappings" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Runners/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <h1>Course Shells</h1>

            <div>
              <TextField id="outlined-basic" label="JobId" variant="outlined" onChange={onJobIdChange} value={jobId} />
              <Button style={buttonDiv} variant="contained" onClick={seachForExports}>Find</Button>

              {/* <CSVDownload data={prepareCsvData()} target="_blank" />; */}
              <CSVLink style={buttonDiv} filename={`${jobId}.csv`} data={prepareCsvData()}>Export</CSVLink>;
              {/* <Button style={buttonDiv} variant="contained" onClick={seachForExports}>Export</Button> */}
            </div>
            <BasicTable rows={canvasCourse} />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <h1>Mappings</h1>
            <Mapping/>
        </TabPanel>
      </Box>
    );
  }