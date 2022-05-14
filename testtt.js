import * as R from 'ramda';

import fs from "fs";

import chiSquaredTest from 'chi-squared-test';

import PCA from 'pca-js'


import {csvToJson, getCSV, getCSV2, csvToArray} from "./fct.js";
import {csvToJSON} from "./csvToJSON.js";

const csv = fs.readFileSync('./CSV_file/Iris.csv', 'utf8')
const columns = ['Id','SepalLengthCm','SepalWidthCm','PetalLengthCm','PetalWidthCm','Species']


const data = csvToJSON(csv)
console.log(data);
// console.log((R.pluck('Id', dodo)));




const splitIndex = R.pipe(
    R.converge(R.multiply(0.80), [R.length]),
    Math.round,
);

const splitData = R.splitAt(splitIndex(data), data);


const trainingData = splitData[0];
const testingData = splitData[1];


console.log(trainingData);
console.log(testingData);


const getObserved = R.pipe(
    R.pluck('Species'),
    R.countBy(R.identity),
    R.values,
);

const getExpected = R.pipe(
    getObserved,
    R.converge(
    R.repeat,
    [R.converge(R.divide,[R.sum,R.length]),R.length],
    ),
);

const getDegreeOfFreedom = R.pipe(
    getObserved,
    R.converge(R.subtract(1), [R.length]),
    Math.abs,
);



const observed = getObserved(testingData);
const expected = getExpected(testingData);
const DegreeOfFreedom = getDegreeOfFreedom(testingData)


const probabilities = chiSquaredTest(observed, expected, DegreeOfFreedom);
console.log(probabilities);


const getValues = R.pipe(
    
    R.map(
        R.pipe(
            R.values,
            R.drop(2),
            R.dropLast(1),
        )
    )
        
    
);

const values = getValues(trainingData);

console.log(values);


const vectors = PCA.getEigenVectors(values);

var first = PCA.computePercentageExplained(vectors,vectors[0])

var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1])


// var adData = PCA.computeAdjustedData(trainingData,vectors[0])

// var data = [[40,50,60],[50,70,60],[80,70,90],[50,60,80]];
// var vectors = PCA.getEigenVectors(data);
// var first = PCA.computePercentageExplained(vectors,vectors[0])
// // 0.8434042149581044
// var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1])
// // 0.9700602484397556


// var adData = PCA.computeAdjustedData(data,vectors[0])

// const getValues = R.pipe(
//     R.map(
//         R.pipe(
//             R.values,
//             R.drop(1),
//             R.dropLast(1),
//         )
//     )
// );

// const getVectors = R.pipe(
//     getValues,
//     PCA.getEigenVectors
// );

// //console.log(getVectors(dataset));

// const firstsd = R.pipe(
//     getVectors,
//     R.converge(PCA.computePercentageExplained, [R.identity, R.prop(0)]),
// );

// const topTwosd = R.pipe(
//     getVectors,
//     R.converge(PCA.computePercentageExplained, [R.identity, R.prop(0), R.prop(1)]),
// );

// console.log(firstsd(dodo));
// console.log(topTwosd(dodo));