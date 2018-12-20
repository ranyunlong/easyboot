import { platform } from 'os'
export function getStackPath(stack: string = '') {
    const find = stack.split('\n').find((value) => /at __decorate/.test(value))
    if (!find) return;
    const matchPath = find.replace(/^[\s]*at[\s]*__decorate[\s]*\(/, '').replace(/\)/, '')
    if (platform() === 'win32') {
        const [ disk, path, codeRow, codeColumn ] = matchPath.split(':')
        return {
            filePath: [disk, path].join(':'),
            codeRow: Number(codeRow),
            codeColumn: Number(codeColumn)
        }
    }
    const [ filePath, codeRow, codeColumn ] = matchPath.split(':')
    return {
        filePath,
        codeRow: Number(codeRow),
        codeColumn: Number(codeColumn)
    }
}