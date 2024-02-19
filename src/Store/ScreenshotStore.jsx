import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';


const scTitleBarAtom= atom(true);
const scTitleBarTypeAtom= atomWithStorage('codewrite-sc-title-type', "macwindows");
const scFontSizeAtom= atomWithStorage('codewrite-sc-fontSize', "20");
const scLineNumberAtom= atomWithStorage('codewrite-sc-lineNumber',"true");
const scLineHeightAtom= atomWithStorage('codewrite-sc-lineHeight', "1.5");
const scShadowAtom= atomWithStorage('codewrite-sc-shadow', "true");
const scFontStyleAtom= atomWithStorage('codewrite-sc-fontStyle', "Monospace");

const scBgColorAtom= atomWithStorage('codewrite-sc-bgColor', "white");
const scBgTypeAtom= atomWithStorage('codewrite-sc-bgType', "color");
const scBgImageAtom= atom(null);


export {scTitleBarAtom,scTitleBarTypeAtom,scFontSizeAtom,scLineNumberAtom,scLineHeightAtom,scShadowAtom,scFontStyleAtom,scBgColorAtom,scBgTypeAtom,scBgImageAtom}