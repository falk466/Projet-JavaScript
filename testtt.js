import * as R from 'ramda';

import fs from "fs";

import {csvToJson, getCSV, getCSV2, csvToArray} from "./fct.js";
import {csvToJSON} from "./csvToJSON.js";

const csv = fs.readFileSync('./CSV_file/Iris.csv', 'utf8')
const columns = ['Id','SepalLengthCm','SepalWidthCm','PetalLengthCm','PetalWidthCm','Species']




















const dodo = csvToJSON(csv)
console.log(dodo);

console.log((R.pluck('Id', dodo)));

import chiSquaredTest from 'chi-squared-test';

// We expect a fair die
var expected = [2, 2, 2, 2, 2, 2];

// Looks pretty unfair...
var observed = [6, 3, 3, 0, 0, 0];

// Reduction in degrees of freedom is 1, since knowing 5 categories determines the 6th
var reduction = 1;

var probability = chiSquaredTest(observed, expected, reduction);
// Gives 0.010362, which indicates that it's unlikely the die is fair 
console.log(probability)
// However, something a little more likely
observed = [1, 2, 4, 4, 2, 1];
probability = chiSquaredTest(observed, expected, reduction);
console.log(probability.probability)
// Gives back 0.415881, which is indicates that they did come from the same distribution (by most statistical standards)





const getpercentage =  R.divide(R.__,100);

const getIndexSplit = R.pipe(
    R.converge(R.multiply(getpercentage(80)), [R.length]),
    Math.round,
);


const splitInTrainingAndTesting = R.converge(R.splitAt,[getIndexSplit,R.identity]);

const getTraining = R.pipe(splitInTrainingAndTesting,R.head);
const getTesting = R.pipe(splitInTrainingAndTesting,R.last);


console.log(getTraining(dodo));
console.log(getTesting(dodo));




const getObservedValues = R.pipe(
    R.pluck('Species'),
    R.countBy(R.identity),
    R.values
);

const getNumberOfOutput = R.pipe(
    getObservedValues,
    R.length
);

console.log(getObservedValues(dodo));

const getExpectedValues = R.converge(
    R.repeat,[
        R.converge(R.multiply,[
        R.converge(R.divide(1),[getNumberOfOutput]),
        R.length
        ]),
        getNumberOfOutput
    ]
);

console.log(getExpectedValues(dodo));

const probabilities = chiSquaredTest(getObservedValues(dodo), getExpectedValues(dodo), reduction);
console.log(probabilities)
