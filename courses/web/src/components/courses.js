import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicTable from './courseTable';
import API from '../services/Api';

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

const canvasRows = [
    {
        name: 'First Course',
        sisid: 'FA 101',
        terms: 'Spring, Fall'
    }
]

export default function Courses() {
    const [value, setValue] = React.useState(0);
    const [canvasCourse, setCanvasCourses] = React.useState([]);

    React.useEffect(() => {
        API({
            method: 'get',
            api: ''
        }).then(response => {
            setCanvasCourses(response.courses);
        })
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="courses">
            <Tab label="Canvas" {...a11yProps(0)} />
            <Tab label="Jenzabar" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <h1>Canvas</h1>
            <BasicTable rows={canvasRows} />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <h1>Jenzabar</h1>
            <BasicTable rows={canvasRows} />
        </TabPanel>
      </Box>
    );
  }