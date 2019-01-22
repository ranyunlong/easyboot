"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const downloadGitRepo = require("download-git-repo");
exports.default = (repo, path) => {
    return new Promise((resolve, reject) => {
        downloadGitRepo(repo, path, (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
};
