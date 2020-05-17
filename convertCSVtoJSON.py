import csv, json

csvFilePath = 'Resources/samples.csv'
jsonFilePath = 'samples.json'

data = {}
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    # This code use to add more layer in json
    for csvRow in csvReader:
        Otu_Id = csvRow["Otu_id"]
        # print(Otu_Id)
        # break
        data[Otu_Id] = csvRow
        # print(data[Otu_Id])
        # break
    # csvReader = csv.DictReader(csvFile)
# root = {}
# root["uto_id"] = data
    # for csvRow in csvReader:
    #     data = csvRow
        # print(data)
# print(data)

with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))



# .js file
# data=[{'name': 'Kevin', 
#         'age': '32'}];

# .json
# [{'name': 'Kevin', 
#     'age': '32'}];

# console.log(data);
# data=d3.json('sample.json');