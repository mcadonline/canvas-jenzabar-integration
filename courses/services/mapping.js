import { Mapping } from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';


export const MappingService = {
    createMappings(body, callback) {
        let uuid = uuidv4();
        body.uuid = uuid;
        Mapping.Create(body, (err) => {

            if (err) {
                console.error('Failed')
            }

            callback(err, uuid);
        })
    },
    getMappings(callback) {
        Mapping.All((err, rows) => {
            callback(err, rows);
        })
    } 
}