import { isEqual } from 'lodash';

import { ExternalLibraryName } from '../../commons/application/types/ExternalTypes';
import { Input, PlaybackData } from '../sourceRecorder/SourceRecorderTypes';

export const oneHourInMilliSeconds = 3600000;
const oneByteInBits = 8;
const oneKbInBytes = 1024;
const fiveMbInKb = 5 * 1024;

const getLocalStorageSpace = () => {
  let allStrings = '';
  for (const key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      allStrings += window.localStorage[key];
    }
  }
  return allStrings ? 3 + (allStrings.length * 16) / (oneByteInBits * oneKbInBytes) : 0;
};

export const hasExceededLocalStorageSpace = () => {
  return getLocalStorageSpace() > fiveMbInKb;
};

export const playgroundQuestionId: number = -1;

export const resetPlaygroundInit = (
  chapter: number,
  externalLibrary: ExternalLibraryName,
  editorValue: string
) => {
  const playgroundLogs: string | null = localStorage.getItem('PlaygroundLogs');
  const playgroundPlayback: PlaybackData = JSON.parse(
    playgroundLogs ? playgroundLogs : JSON.stringify(defaultPlaybackData)
  );
  const newInit = {
    chapter: chapter,
    externalLibrary: externalLibrary,
    editorValue: editorValue
  };
  if (!isEqual(playgroundPlayback.init, newInit)) {
    playgroundPlayback.init = newInit;
  }
  localStorage.setItem('PlaygroundLogs', JSON.stringify(playgroundPlayback));
};

export const savePlaygroundLog = (newInput: Input) => {
  const playgroundLogs: string | null = localStorage.getItem('PlaygroundLogs');
  const playgroundPlayback: PlaybackData = JSON.parse(
    playgroundLogs ? playgroundLogs : JSON.stringify(defaultPlaybackData)
  );
  playgroundPlayback.inputs.push(newInput);
  localStorage.setItem('PlaygroundLogs', JSON.stringify(playgroundPlayback));

  const neww = localStorage.getItem('PlaygroundLogs');
  const hehexd: PlaybackData = JSON.parse(neww ? neww : JSON.stringify(defaultPlaybackData));
  console.log(hehexd);
};

export const getPlaygroundLogs = () => {
  const playgroundLogs: string | null = localStorage.getItem('PlaygroundLogs');
  const playgroundPlayback: PlaybackData = JSON.parse(
    playgroundLogs ? playgroundLogs : JSON.stringify(defaultPlaybackData)
  );
  return playgroundPlayback;
};

export const resetAssessmentInit = (
  chapter: number,
  externalLibrary: ExternalLibraryName,
  editorValue: string
) => {
  const assessmentLogs: string | null = localStorage.getItem('AssessmentLogs');
  const assessmentPlayback: PlaybackData = JSON.parse(
    assessmentLogs ? assessmentLogs : JSON.stringify(defaultPlaybackData)
  );
  const newInit = {
    chapter: chapter,
    externalLibrary: externalLibrary,
    editorValue: editorValue
  };
  if (!isEqual(assessmentPlayback.init, newInit)) {
    assessmentPlayback.init = newInit;
  }
  localStorage.setItem('AssessmentLogs', JSON.stringify(assessmentPlayback));
};

export const saveAssessmentLog = (newInput: Input) => {
  const assessmentLogs: string | null = localStorage.getItem('AssessmentLogs');
  const assessmentPlayback: PlaybackData = JSON.parse(
    assessmentLogs ? assessmentLogs : JSON.stringify(defaultPlaybackData)
  );
  assessmentPlayback.inputs.push(newInput);
  localStorage.setItem('AssessmentLogs', JSON.stringify(assessmentPlayback));
};

export const getAssessmentLogs = () => {
  const assessmentLogs: string | null = localStorage.getItem('AssessmentLogs');
  const assessmentPlayback: PlaybackData = JSON.parse(
    assessmentLogs ? assessmentLogs : JSON.stringify(defaultPlaybackData)
  );
  return assessmentPlayback;
};

export const defaultPlaybackData: PlaybackData = {
  init: {
    chapter: 1,
    externalLibrary: ExternalLibraryName.NONE,
    editorValue: ''
  },
  inputs: []
};
