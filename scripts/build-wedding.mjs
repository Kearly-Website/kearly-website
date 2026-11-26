import { readFile, readdir, writeFile } from "node:fs/promises";
const types = {html:"text/html; charset=utf-8",css:"text/css; charset=utf-8",js:"text/javascript; charset=utf-8",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",webp:"image/webp",woff2:"font/woff2",txt:"text/plain",xml:"application/xml"};
const assets = {};
async function collect(directory, prefix = "") {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const path = prefix + "/" + entry.name;
    const filename = directory + "/" + entry.name;
    if (entry.isDirectory()) await collect(filename,path);
    else {
      const type = types[entry.name.split(".").at(-1)];
      if (type) assets[path] = {type,data:(await readFile(filename)).toString("base64")};
    }
  }
}
await collect("wedding/site");
assets["/assets/photo-admin.js"] = {type:types.js,data:(await readFile("wedding/worker/photo-admin.js")).toString("base64")};
const slots = JSON.parse(await readFile("wedding/content/images.json","utf8"));
const worker = await readFile("wedding/worker/index.js","utf8");
await writeFile("wedding/generated.mjs","const assets = " + JSON.stringify(assets) + ";\nconst slots = " + JSON.stringify(slots) + ";\n" + worker);
