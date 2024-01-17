import { atomWithStorage } from 'jotai/utils';

const themeAtom = atomWithStorage('codewrite-theme', "material");
const allowTryThemeAtom = atomWithStorage('codewrite-allowTryTheme', true);


export {themeAtom,allowTryThemeAtom}