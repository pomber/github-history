#!/usr/bin/env node
const runServer = require("./server");
const fs = require("fs");
const execa = require("execa");

let path = process.argv[2] || "./.";

if (path === "--help") {
  console.log(`Usage:

  githistory some/file.ext
  `);
  process.exit();
}

if (!fs.existsSync(path)) {
  console.log(`File not found: ${path}`);
  process.exit();
}

execa("git", ["rev-parse", "--is-inside-work-tree"])
  .then(() => runServer(path))
  .catch(() => {
    console.log(`Git repository not found: ${path}`);
    process.exit();
  });
