import schemaMappings from "./schemas/schema.json" assert { type: "json" };
import data from "./schemas/data.json" assert { type: "json" };
import { insertData, fetchData } from "./utils/schema-apis.js";

for (const schemaName in data?.data) {
  // extract schema ids
  let schemaId = schemaMappings[schemaName.toLowerCase()];
  let schemaData = data?.data?.[schemaName];

  const insertResponse = await insertData(schemaId, schemaData);
}

for (const schemaName in data?.data) {
  // extract schema ids
  let schemaId = schemaMappings[schemaName.toLowerCase()];

  const fetchResponse = await fetchData(schemaId);
}
