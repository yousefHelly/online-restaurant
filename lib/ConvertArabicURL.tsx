export function convert(str: string) {
    return decodeURIComponent(JSON.parse('"'+str.replace(/\"/g,'\\"')+'"'));
}