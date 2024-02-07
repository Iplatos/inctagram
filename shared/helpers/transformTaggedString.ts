const taggedSegmentRegex = /(<(?<tag>[\w-]+)>.*?<\/\k<tag>>)/i;
const splitedTaggedSegmentRegex = /<(?<tag>[\w-]+)>(.*?)<\/(\k<tag>)>/i;

type MatchParams = {
  content: string;
  input: string;
  match: string;
  matchIndex: number;
  tag: string;
};
export type TaggedStringMappers<T> = Record<string, (matchParams: MatchParams) => T>;

const mapTaggedString = <T>(input: string, mappersObj: TaggedStringMappers<T>): (T | string)[] =>
  input
    .split(taggedSegmentRegex)
    // filter <tag> capturing group, spliced into the output array
    .filter((_, i) => (i + 1) % 3)
    .map(token => {
      const matchArray = splitedTaggedSegmentRegex.exec(token);

      if (!matchArray) {
        return token;
      }

      const { 0: match, 1: tag, 2: content, index: matchIndex, input } = matchArray;

      return mappersObj[tag]?.({ content, input, match, matchIndex, tag }) ?? token;
    });

export const transformTaggedString = {
  interpolate(...params: Parameters<typeof mapTaggedString<string>>) {
    return mapTaggedString(...params).join('');
  },
  map: mapTaggedString,
};
