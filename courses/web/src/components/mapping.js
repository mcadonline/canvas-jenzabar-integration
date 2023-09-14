import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicTable from './courseTable';
import API from '../services/Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MappingTable from './mappingTable';


const modalDivStyle = {
    'padding-bottom': '10px',
    'padding-top': '10px'
}

const buttonDiv = {
    'margin-left': '10px'
}

export default function Mapping() {
    const [sourceKey, setSourceKey] = React.useState();
    const [sourceValue, setSourceValue] = React.useState();
    const [mapKey, setMapKey] = React.useState();
    const [mapValue, setMapValue] = React.useState();
    const [mappings, setMappings] = React.useState([]);

    const sourceKeyChanger = (event) => setSourceKey(event.target.value)
    const sourceValueChanger = (event) => setSourceValue(event.target.value)
    const mapKeyChanger = (event) => setMapKey(event.target.value)
    const mapValueChanger = (event) => setMapValue(event.target.value)

    API({
        method: 'get',
        api: 'mappings'
    }).then(response => {
        let parsedData = response.data.mappings.map(mapping => {
                return {
                    sourceKey: mapping.source_key,
                    sourceValue: mapping.source_value,
                    DestinationKey: mapping.map_key,
                    DestinationValue: mapping.map_value,
                    uuid: mapping.uuid
                }
            })

            setMappings(parsedData);
    })

    const createMapping = (event) => {
        API({
          method: 'post',
          api: `mappings`,
          data: {
            mapping: {
                sourceKey,
                mapKey,
                sourceValue,
                mapValue
            }
          }
        }).then(response => {
            let mappingsObj = mappings;
            mappingsObj.push({
                sourceKey,
                sourceValue,
                DestinationKey: mapKey,
                DestinationValue: mapValue,
                uuid: response.data.mapping
            }) 
  
            setMappings(mappingsObj);
        })
      }

    return (
        <Box sx={{ width: '100%' }}>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Source Key" variant="outlined" onChange={sourceKeyChanger} value={sourceKey} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Source Value" variant="outlined" onChange={sourceValueChanger} value={sourceValue} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Destination Key" variant="outlined" onChange={mapKeyChanger} value={mapKey} />
            </div>
            <div style={modalDivStyle}>
                <TextField id="outlined-basic" label="Destination Value" variant="outlined" onChange={mapValueChanger} value={mapValue} />
            </div>
            <Button style={buttonDiv} variant="contained" onClick={createMapping}>Create</Button>

            <div style={modalDivStyle}>
                <MappingTable rows={mappings} />
            </div>
        </Box>
    );
}