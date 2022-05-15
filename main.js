import * as R from 'ramda';
import fs from "fs";

import chiSquaredTest from 'chi-squared-test';
import PCA from 'pca-js'

import {csvToJSON} from "./csvToJSON.js";

const csv = fs.readFileSync('./fr-en-resultats-detailles-au-dnb.csv', 'utf8')

const data = csvToJSON(csv)
console.log(data);


const splitIndex = R.pipe(
    R.converge(R.multiply(0.80), [R.length]),
    Math.round,
);
const splitData = R.splitAt(splitIndex(data), data);
const trainingData = splitData[0];
const testingData = splitData[1];



const getObserved = R.pipe(
    R.pluck('session_examen'),
    R.countBy(R.identity),
    R.values,
);

const getFairValue = R.pipe(
    R.converge(
    R.divide,
    [R.sum,R.length]),
    Math.round,
);

const getExpected = R.pipe(
    getObserved,
    R.converge(
    R.repeat,
    [getFairValue,R.length]
    ),
    
);

const observed = getObserved(testingData);
console.log(observed);
const expected = getExpected(testingData);
console.log(expected);
const degreeOfFreedom = 1;

const probabilities = chiSquaredTest(observed, expected, degreeOfFreedom);
console.log(probabilities.probability);



const getXY = R.pipe(
    
    R.map(
        R.pipe(
            R.values,
            R.drop(9),
            R.dropLast(7),
        )
    )
        
    
);

const vectors = PCA.getEigenVectors(getXY(trainingData));

var first = PCA.computePercentageExplained(vectors,vectors[0]);
console.log(first)
var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1]);
console.log(topTwo)

var adData = PCA.computeAdjustedData(getXY(trainingData),vectors[0],vectors[1]);
console.log(adData.formattedAdjustedData);

