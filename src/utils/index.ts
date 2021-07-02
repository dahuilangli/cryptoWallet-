
export function subSplit(text: string, start: number, end: number) {
    return text.substr(0, start) + '...' + text.substr(text.length - end, text.length);
}