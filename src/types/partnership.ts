export interface PartnershipData {
  inningsID: string;
  batTeamId: string;
  batTeamName: string;
  batTeamShortName: string;
  partnershipDataDTO: PartnershipDataItem[];
}

export interface PartnershipDataItem {
  bat1Id: string;
  bat1Name: string;
  bat1Runs: string;
  bat1balls: string;
  bat1ImageID: string;
  bat2Id: string;
  bat2Name: string;
  bat2Runs: string;
  bat2balls: string;
  bat2ImageID: string;
  totalRuns: string;
  totalBalls: string;
}
