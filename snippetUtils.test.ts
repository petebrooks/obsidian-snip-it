import { findSnippet, updateSplit } from './snippetUtils';
import { isWord } from './utils';

describe('findSnippet', () => {
    it('should return the replacement for a matching snippet without regex', () => {
        const selectedText = 'hello';
        const snippets = ['hello : world'];
        const isRegex = false;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('world');
    });

    it('should return the replacement for a matching snippet with regex', () => {
        const selectedText = 'hello123';
        const snippets = ['hello\\d+ : world'];
        const isRegex = true;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('world');
    });

    it('should return an empty string if no snippet matches without regex', () => {
        const selectedText = 'hello';
        const snippets = ['hi : world'];
        const isRegex = false;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('');
    });

    it('should return an empty string if no snippet matches with regex', () => {
        const selectedText = 'hello';
        const snippets = ['hi\\d+ : world'];
        const isRegex = true;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('');
    });

    it('should handle multiple snippets and return the first matching one without regex', () => {
        const selectedText = 'hello';
        const snippets = ['hi : world', 'hello : universe'];
        const isRegex = false;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('universe');
    });

    it('should handle multiple snippets and return the first matching one with regex', () => {
        const selectedText = 'hello123';
        const snippets = ['hi\\d+ : world', 'hello\\d+ : universe'];
        const isRegex = true;
        const result = findSnippet(selectedText, snippets, isRegex);
        expect(result).toBe('universe');
    });
});

describe('isWord', () => {
    const wordDelimiters = "$()[]{}<>,.!?;:'\"\\/";

    it('should return true for a character that is not a whitespace or a delimiter', () => {
        expect(isWord('a', wordDelimiters)).toBe(true);
    });

    it('should return false for a whitespace character', () => {
        expect(isWord(' ', wordDelimiters)).toBe(false);
    });

    it('should return false for a delimiter character', () => {
        expect(isWord('$', wordDelimiters)).toBe(false);
    });

    it('should return true for a character that is not in the delimiters', () => {
        expect(isWord('b', wordDelimiters)).toBe(true);
    });
});

describe('updateSplit', () => {
    it('should split snippets file correctly without regex', () => {
        const newlineSymbol = '$nl$';
        const snippetsFile = 'snippet1 : result1$nl$snippet2 : result2';
        const isRegex = false;
        const result = updateSplit(newlineSymbol, snippetsFile, isRegex);
        expect(result).toEqual(['snippet1 : result1', 'snippet2 : result2']);
    });

    it('should split snippets file correctly with regex', () => {
        const newlineSymbol = '$nl$';
        const snippetsFile = 'snippet1 : result1$nl$snippet2 : result2';
        const isRegex = true;
        const result = updateSplit(newlineSymbol, snippetsFile, isRegex);
        expect(result).toEqual(['snippet1 : result1', 'snippet2 : result2']);
    });

    it('should handle empty lines correctly', () => {
        const newlineSymbol = '$nl$';
        const snippetsFile = 'snippet1 : result1$nl$$nl$snippet2 : result2';
        const isRegex = false;
        const result = updateSplit(newlineSymbol, snippetsFile, isRegex);
        expect(result).toEqual(['snippet1 : result1', 'snippet2 : result2']);
    });

    it('should handle special characters in newline symbol', () => {
        const newlineSymbol = '$nl$';
        const snippetsFile = 'snippet1 : result1$nl$snippet2 : result2';
        const isRegex = false;
        const result = updateSplit(newlineSymbol, snippetsFile, isRegex);
        expect(result).toEqual(['snippet1 : result1', 'snippet2 : result2']);
    });
});
