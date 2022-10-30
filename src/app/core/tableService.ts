import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {Fixtures, Table} from "../mock-api/model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class TableService {
  data: Fixtures[];

  constructor(private http: HttpClient) {
    this.data = require('data.json');
  };

  getFixtures(): Fixtures[][] {
    let formattedData: any[] = [];
    let tempArray: any = [];
    let i = 0
    var str = localStorage.getItem('fixture_data')
    if (str)
      this.data = JSON.parse(str);
    this.data.forEach(fix => {
      tempArray.push(fix);
      i++;
      if (i == 10) {
        formattedData.push(tempArray);
        tempArray = [];
        i = 0;
      }
    })
    return formattedData;
  }

  getTable(fixtures: Fixtures[]): Table[] {
    var str = localStorage.getItem('fixture_data')
    if (str)
      this.data = JSON.parse(str);
    const clubs = new Set();
    let table: Table[] = [];
    fixtures.forEach(fixture => {
      if (!clubs.has(fixture.Home)) {
        clubs.add(fixture.Home)
        let club = new Table();
        club.goalsTaken = fixture.AwayGoals;
        club.goalsScored = fixture.HomeGoals;
        club.clubName = fixture.Home;
        if (fixture.Result == 'H') {
          club.points = 3
        } else if (fixture.Result == 'A') {
          club.points = 0
        } else {
          club.points = 1;
        }
        table.push(club)
      } else {
        let index = table.findIndex(e => e.clubName == fixture.Home)
        let club = table[index];
        club.goalsTaken += fixture.AwayGoals;
        club.goalsScored += fixture.HomeGoals;
        if (fixture.HomeGoals > fixture.AwayGoals) {
          club.points += 3
        } else if (fixture.HomeGoals < fixture.AwayGoals) {
          club.points += 0
        } else {
          club.points += 1;
        }
      }
      if (!clubs.has(fixture.Away)) {
        clubs.add(fixture.Away)
        let club = new Table();
        club.goalsTaken = fixture.HomeGoals;
        club.goalsScored = fixture.AwayGoals;
        club.clubName = fixture.Away;
        if (fixture.HomeGoals < fixture.AwayGoals) {
          club.points = 3
        } else if (fixture.HomeGoals > fixture.AwayGoals) {
          club.points = 0
        } else {
          club.points = 1;
        }
        table.push(club);
      } else {
        let index = table.findIndex(e => e.clubName == fixture.Away)
        let club = table[index];
        club.goalsTaken += fixture.HomeGoals;
        club.goalsScored += fixture.AwayGoals;
        if (fixture.HomeGoals < fixture.AwayGoals) {
          club.points += 3
        } else if (fixture.HomeGoals > fixture.AwayGoals) {
          club.points += 0
        } else {
          club.points += 1;
        }
      }
    })
    table = table.sort((c2, c1) => {
      if (c1.points > c2.points)
        return 1
      else if (c1.points < c2.points)
        return -1
      else if (c1.goalsScored - c1.goalsTaken < c2.goalsScored - c2.goalsTaken) {
        return -1
      } else if (c1.goalsScored - c1.goalsTaken > c2.goalsScored - c2.goalsTaken) {
        return 1
      } else {
        return 0
      }
    });
    return table;
  }

}
