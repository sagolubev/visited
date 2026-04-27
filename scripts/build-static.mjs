import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const entries = ["index.html", "CNAME", "favicon.svg", "css", "fonts", "js"];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of entries) {
	await cp(path.join(root, entry), path.join(dist, entry), {
		recursive: true,
		force: true,
	});
}

console.log(`Built static site in ${path.relative(root, dist)}/`);
