const csvToArray = csvText =>
    csvText
    .split('\n')
    .map(item => item.split(';'))

    .filter(item => item[0] !== '');

function arrayToJSONObject (arr){

    var keys = arr[0];
 
    var newArr = arr.slice(1, arr.length);
 
    var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
    for (var i=0; i<data.length; i++) {
            var d = data[i],
                    o = {};
            for (var j=0; j<l; j++)
                    o[cols[j]] = d[j];
            formatted.push(o);
    }
    return formatted;
}



function csvToJSON (csv){

    const array = csvToArray(csv);
    
    const json = arrayToJSONObject(array);
    return json;
}


export {csvToJSON};