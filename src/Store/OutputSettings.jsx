import { atomWithStorage } from 'jotai/utils';

const autorunAtom = atomWithStorage('codewrite-autorun', true);
const showConsoleAtom = atomWithStorage('codewrite-showConsole', true);
const showConsoleOnErrorAtom = atomWithStorage('codewrite-showConsoleOnError', true);

export {autorunAtom,showConsoleAtom,showConsoleOnErrorAtom}