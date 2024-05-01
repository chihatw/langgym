export interface PaperCupBooleanParams {
  hasWoTopic: boolean;
  hasNiTopic: boolean;
  hasNoneTopic: boolean;
  hasWoGrouping: boolean;
  hasNiGrouping: boolean;
  hasNoneGrouping: boolean;
  hasStraightOrder: boolean;
  hasInvertOrder: boolean;
  hasPositive: boolean;
  hasNegative: boolean;
  hasGroupingTopic: boolean;
}

export interface ICueCard {
  label: string;
  pitchStr: string;
}

export interface CuePattern {
  wo: string;
  ni: string;
  doushi: string;
  topic: string;
  sentence: string;
  grouping: string;
  isWoFirst: boolean;
  isNegative: boolean;
}

export interface PaperCupCueObj {
  verb: ICueCard;
  nouns: ICueCard[];
  header: ICueCard;
}

export interface PaperCupParams {
  id: number;
  cue: string;
  params: string;
  created_at: Date;
}
