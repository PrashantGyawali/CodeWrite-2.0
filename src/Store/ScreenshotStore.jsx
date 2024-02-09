import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';


const scTitleBarAtom= atom(true);
const scTitleBarTypeAtom= atomWithStorage('codewrite-sc-title-type', "macindows");

export {scTitleBarAtom,scTitleBarTypeAtom}