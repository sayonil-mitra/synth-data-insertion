import schemaMappings from "./schemas/schema.json" assert { type: "json" };
import { fetchData } from "./utils/schema-apis.js";

for (const schemaName in schemaMappings) {
  // extract schema ids
  let schemaId = schemaMappings[schemaName];

  const fetchResponse = await fetchData(schemaId);
}
