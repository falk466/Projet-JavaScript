# Projet JavaScript de Augustin Fourcaud et Theo Tailame




### Explication du code

##### ouverture d'un fichier csv 

```
const csv = fs.readFileSync('./fr-en-resultats-detailles-au-dnb.csv', 'utf8')
```

##### conversion au format Json

```
const data = csvToJSON(csv)
```

##### séparation en donné de test et d'entrainement

```
const splitData = R.splitAt(splitIndex(data), data);
const trainingData = splitData[0];
const testingData = splitData[1];
```

##### test de chi2 sur les données de test

```
const observed = getObserved(testingData);
const expected = getExpected(testingData);
const degreeOfFreedom = 1;

const probabilities = chiSquaredTest(observed, expected, degreeOfFreedom);
```

##### PCA sur les données d'entrainement

```
const vectors = PCA.getEigenVectors(getXY(trainingData));
var adData = PCA.computeAdjustedData(getXY(trainingData),vectors[0],vectors[1]);
```



