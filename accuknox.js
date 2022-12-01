const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "test.log");
const file = fs.readFileSync(FILE_PATH, "utf8");

const RECORD = new Map();
file
  .trim()
  .split("\n")
  .map((line) => line.split(" "))
  .forEach((row) => {
    const [eid, fid] = row;
    if (!RECORD.has(fid)) RECORD.set(fid, new Set());
    const record = RECORD.get(fid);
    if (record.has(eid)) {
      throw `Duplicate record: eater_id: ${eid}, foodmenu_id: ${fid}`;
    } else {
      record.add(eid);
    }
  });

const SORTED = [...RECORD].sort((a, b) => b[1].size - a[1].size);
const TOP_3 = SORTED.slice(0, 3)
  .map((row, i) => `${i + 1}) ${row[0]}`)
  .join("\n");
console.log(TOP_3);