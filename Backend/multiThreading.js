import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

cluster.setupPrimary({
    exec: _dirname + "/server.js"
})

for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
}

cluster.on("exit", (worker, code, signal) => {
    cluster.fork()
})