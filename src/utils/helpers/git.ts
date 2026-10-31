import { freeze } from './collection';

const SHORT_SHA_LENGTH = 7;

export interface Commit {
  sha: string;
  shortSha: string;
  url: string;
}

export const resolveCommit = (sha: string | null, repoUrl: string): Commit | null => {
  if (sha == null) {
    return null;
  }

  return freeze({
    sha,
    shortSha: sha.slice(0, SHORT_SHA_LENGTH),
    url: `${repoUrl}/commit/${sha}`,
  });
};
