const tightloop = require('../tightloop.js');

/*
 *
 * * Test case * */
const testjson = [
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 },
{ longstring: '9543947201874802734853045', data: {}, none: null, number: 0x42 }
];

tightloop(() => {
        const s = JSON.stringify(testjson);
        const d = JSON.parse(s);
        const l = d.length;
}, { duration: 4000, ui: true });
