import {test, expect} from 'vitest';
import { areNodesEqual } from '../src/nodes-equal';
import { DOM_TYPES } from '../src/h';

test('two text nodes are equal', () => {
    const node1 = {
        type: DOM_TYPES.TEXT,
        value: 'hello'
    }
    const node2 = {
        type: DOM_TYPES.TEXT,
        value: 'hello'  
    }
    expect(areNodesEqual(node1, node2)).toBeTruthy()
})

test('two text nodes are not equal', () => {
    const node1 = {
        type: DOM_TYPES.TEXT,
        value: 'hello'
    }
    const node2 = {
        type: DOM_TYPES.TEXT,
        value: 'hello1'  
    }
    expect(areNodesEqual(node1, node2)).toBeTruthy()
})

test('element node and a text node', () => {
    expect(areNodesEqual(
        {type: 'element', tag: 'p'},
        {type: 'text', value: 'hello'}
    )).toBeFalsy()
})

test('two nodes of different types', () => {
    expect(areNodesEqual(
        {type: DOM_TYPES.ELEMENT, tag: 'p'},
        {type: DOM_TYPES.ELEMENT, tag: 'div'}
    )).toBeFalsy()
})

test('two [ elements with different text context', () => {
    const node1 =   {
        type: 'element',
        tag: 'p',
        children: [{ type: 'text', value: 'foo' }],
      }
      const nodeTwo =   {
        type: 'element',
        tag: 'p',
        children: [{ type: 'text', value: 'bar' }],
      }

      expect(areNodesEqual(node1, nodeTwo)).toBeTruthy()
})