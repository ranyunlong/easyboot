import downloadGitRepo = require('download-git-repo')

export default (repo: string, path: string) => {
    return new Promise((resolve, reject) => {
        downloadGitRepo(repo, path, (err: Error) => {
            if (err) return reject(err)
            resolve()
        })
    })
}