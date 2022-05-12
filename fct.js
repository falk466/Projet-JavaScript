import * as R from 'ramda';
import fs from "fs";

const csvToJson = (csvfile, listcolumns) => R.compose(
    R.map(R.compose(
        R.zipObj(listcolumns),
        R.split(',')
    )),
    R.split('\r\n')
)(csvfile)

const getCSV2 = R.pipe(
    fs.readFileSync,
    R.toString,
    R.split('\r\n')
)

const getCSV = (path) => fs.readFileSync(path,'utf8');


const csvToArray = csvText =>
    csvText
    .split('\n')
    .map(item => item.split(','))

    .filter(item => item[0] !== '');

   

export {csvToJson, getCSV, getCSV2, csvToArray};