import { atomWithStorage } from 'jotai/utils';

const tabornotAtom = atomWithStorage('codewrite-tabornot', false);
const autoCloseTagsAtom = atomWithStorage('codewrite-autoCloseTags', true);
const allowResizeAtom= atomWithStorage('codewrite-allowResize', true);
const maxHeightInSmallScreenAtom= atomWithStorage('codewrite-maxHeightInSmallScreen', true);
const maxHeightOptionsAtom= atomWithStorage('codewrite-maxHeightOptions', true);

export {tabornotAtom,autoCloseTagsAtom,allowResizeAtom,maxHeightInSmallScreenAtom,maxHeightOptionsAtom}

