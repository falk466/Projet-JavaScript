var data = [[40,50,60],[50,70,60],[80,70,90],[50,60,80]];
var vectors = PCA.getEigenVectors(data);
//Outputs 
// [{
//     "eigenvalue": 520.0992658908312,
//     "vector": [0.744899700771276, 0.2849796479974595, 0.6032503924724023]
// }, {
//     "eigenvalue": 78.10455398035167,
//     "vector": [0.2313199078283626, 0.7377809866160473, -0.6341689964277106]
// }, {
//     "eigenvalue": 18.462846795484058,
//     "vector": [0.6257919271076777, -0.6119361208615616, -0.4836513702572988]
// }]


var first = PCA.computePercentageExplained(vectors,vectors[0])
// 0.8434042149581044
var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1])
// 0.9700602484397556


var adData = PCA.computeAdjustedData(data,vectors[0])
// {
//     "adjustedData": [
//         [-22.27637101744241, -9.127781049780463, 31.316721747529886, 0.08743031969298887]
//     ],
//     "formattedAdjustedData": [
//         [-22.28, -9.13, 31.32, 0.09]
//     ],
//     "avgData": [
//         [-55, -62.5, -72.5],
//         [-55, -62.5, -72.5],
//         [-55, -62.5, -72.5],
//         [-55, -62.5, -72.5]
//     ],
//     "selectedVectors": [
//         [0.744899700771276, 0.2849796479974595, 0.6032503924724023]
//     ]
// }

    