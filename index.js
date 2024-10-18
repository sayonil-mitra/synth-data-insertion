import schemaMappings from "./schemas/schema.json" assert { type: "json" };
import data from "./schemas/data.json" assert { type: "json" };
import { insertData, fetchData } from "./utils/schema-apis.js";
import { removeDuplicatePurgeId } from "./utils/dataManipulations.js";

for (const schemaName in data?.data) {
  let schemaId = "";
  // let schemaData = data?.data?.[schemaName];
  let schemaData = [];

  // find appropriate schema names from data.json
  Object.keys(schemaMappings).forEach((value, key) => {
    //process schema names from schema and data jsons for matching
    let schemaNameInJsonProcessed = schemaName.toLowerCase().replace("_", "");
    let schemaNameInMappingProcessed = value.toLowerCase().replace("_", "")
    if (schemaNameInMappingProcessed === schemaNameInJsonProcessed) {
      // extract schema ids
      schemaId = schemaMappings[value];
      schemaData = data?.data?.[schemaName];
    }
  });

  // remove duplicate purge ids if present
  let dataForInsertion = removeDuplicatePurgeId(schemaData)

  if (schemaId && dataForInsertion) {
    const insertResponse = await insertData(schemaId, dataForInsertion);
  } else {
    console.log("Schema id or data extraction failed for: ", schemaName)
  }
}

for (const schemaName in schemaMappings) {
  // extract schema ids
  let schemaId = schemaMappings[schemaName];

  const fetchResponse = await fetchData(schemaId);
}
