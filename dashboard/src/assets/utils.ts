export const log = console.log.bind(console);

export const removeContentEditableAttr = (str: string) => {
    return str.replaceAll('contenteditable', 'spellcheck');
};
