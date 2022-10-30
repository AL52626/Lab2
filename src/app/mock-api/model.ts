export class Fixtures {
  Home: string = '';
  Away: string = '';
  HomeGoals: number = 0;
  AwayGoals: number = 0;
  Result: string = '';
  Comments: Comment[] = [];
}

export class Comment {
  Comment: string = '';
  User?: string = '';
  Date?: string = '';
}

export class Table {
  clubName: string = '';
  goalsScored: number = 0;
  goalsTaken: number = 0;
  points: number = 0;
//  Position:number=0;
}
