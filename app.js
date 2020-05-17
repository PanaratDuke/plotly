function unpack(rows,index){
    return rows.map(function(row){
        return row[index];
    });
}


dropDown=d3.select('#select-otuId');
d3.json('Resources/samples.json').then((data)=>{
    console.log("Print Metadata",data.metadata);
    var info = data.metadata;
    console.log("Print info", info)
    // var id = info.map();
    // console.log("Print id = ", id)
    
    // console.log("Print id",info);
    var sampleNames=data.names;
    sampleNames.forEach((sample)=>{
        dropDown.append('option')
                .text(sample)
                .property('this.value', sample);
    });
});

// const VERSION: number = 2016030600;
// export default VERSION;

function changedOption(optionSelected){
    console.log("changedOption : optionSelected = ",optionSelected);
    // var demographicInfo = 
    var printDemographic=d3.select('#demographic');
    printDemographic.text(
        `ID : ${optionSelected}`);
};

// init();