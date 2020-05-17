// var otuData = data;

// function otuCollection(data){
//     var otuId = data.map(d=>d);
//     console.log("Print otuId : ",otuId)
//     // console.log("Print otuid :",otuID)
//     var selectOtuId = d3.select('#select-otuId');

//     otuId.forEach(i=>{
//         var cell = selectOtuId.append('option');
//         cell.text(i);
//     });
// };

// otuCollection(otuData)

d3.json('Resources/samples.json').then(data=>{console.log(data)});

function popDropDown(){
    dropDown=d3.select('#select-otuId');
    d3.json('Resources/samples.json').then((data)=>{
        console.log(data);
        var sampleNames=data.names;
        sampleNames.forEach((sample)=>{
            dropDown.append('option')
                    .text(sample)
                    .property('value', sample);
        });
        
    });

// };

// printDemographic=d3.select('#demographic');
// console.log("Print d3.select",printDemographic);
// printDemographic.text(
//             "ID :"+ id);
// console.log("Type of : ",typeof 0)
//         printDemographic=d3.select('#demographic');
//         console.log("Print d3.select",printDemographic);
//         printDemographic
//             .text("ID :"+ id);


function changedOption(optionSelected){
    console.log(optionSelected);
    // printDemographic=d3.select('#demographic');
    //     printDemographic.text(
    //         "ID :" id);
};

init();

function init(){
    // console.log('start');
    // 1. load data || data=d3.json
    popDropDown()
    // 1.5 populat dropdown || 
    // 2. populate drop down
    // 3. call graphing function || graphData(data)
};

function graphData(data){
    Plotly.nfdsaf
}