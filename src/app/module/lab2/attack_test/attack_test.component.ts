import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {TableService} from "../../../core/tableService";
import {Comment, Fixtures, Table} from "../../../mock-api/model";
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  fixtures: Fixtures[][] = [];
  table: Table[] = [];
  dataSource: Table[] = [];
  columns: string[] | undefined;
  fixtureForm: any;
  user: any

  constructor(private _authService: AuthService, private _tableService: TableService, private _formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.fixtures = this._tableService.getFixtures()
    this._authService.user$.subscribe(user => {
      if (user) {
        this.user = user
        if (this.user?.role != 'Admin') {
          this.fixtureForm.disable();
        }
        this.fixtureForm.controls.forEach((gameWeek: any) => {
          gameWeek.controls.forEach((fixture: any) => {
            if (this.user?.role == 'Authenticated') fixture.get('Comments').enable()
          })
        })
      } else {
        if (this.user?.role != 'Admin') {
          this.fixtureForm.disable();
        }
      }
    });
    this.table = this._tableService.getTable(this.straightenArray(this.fixtures));
    this.dataSource = this.table;
    this.columns = ["position"].concat(Object.keys(new Table()));
    this.fixtureForm = this.createFormArray(this.fixtures);
    this.fixtureForm.controls.forEach((gameWeek: any) => {
      gameWeek.controls.forEach((fixture: any) => {
        if (this.user?.role == 'Authenticated') fixture.get('Comments').enable()
      })
    })
  }


  straightenArray(array: Fixtures[][]) {
    let mainArray: any = [];
    array.forEach(e => {
      mainArray = mainArray.concat(e);
    })
    return mainArray;
  }

  getAsFormGroup(object: any): FormGroup {
    return object as FormGroup;
  }

  createFormArray(obj: any): FormArray {
    let formArray: any = this._formBuilder.array([]);

    let formGroup: any = this._formBuilder.group({});

    Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Array) {
        formArray.push(this.createFormArray(obj[key]));
      } else if ((typeof (obj[key].Comment) === "string")) {
        formArray.push(this.createFormGroupComment(obj[key]));
      } else if (obj[key] instanceof Object) {
        formArray.push(this.createFormGroupFixture(obj[key]));

      } else {
        formGroup.addControl(key, new FormControl(''));
        formGroup.controls[key].setValue(obj[key]);
      }
    });
    return formArray;

  }

  deleteComment(comments: FormArray, index: number) {
    comments.removeAt(index);
  }

  addComment(fixture: FormGroup) {
    let comments = fixture.get('Comments') as FormArray;
    comments.push(this.createFormGroupComment(new Comment()));
  }

  createFormGroupFixture(object: any): FormGroup {
    let formGroup: any = this._formBuilder.group({});

    Object.keys(new Fixtures()).forEach((key) => {
      if (object[key] instanceof Array) {
        formGroup.addControl(key, this.createFormArray(object[key]));
      } else if (object[key] instanceof Object) {
        formGroup.addControl(key, this.createFormGroupFixture(object[key]));
      } else if (!object[key] && key == 'Comments') {
        formGroup.addControl(key, this.createFormArray([]));
      } else if (object[key] && key == 'Comments') {
        formGroup.addControl(key, this.createFormArray(object[key]));
      } else if (!object[key] && key != 'Comments') {
        formGroup.addControl(key, new FormControl(0));
      } else {
        formGroup.addControl(key, new FormControl(''));
        formGroup.controls[key].setValue(object[key]);
      }
    });

    return formGroup;
  }

  createFormGroupComment(object: any): FormGroup {
    let formGroup: any = this._formBuilder.group({});

    Object.keys(new Comment()).forEach((key) => {

      formGroup.addControl(key, new FormControl(''));
      formGroup.controls[key].setValue(object[key]);
      if (key == 'User' || key == 'Date') {
        formGroup.controls[key].disable();
      }
    });

    return formGroup;
  }

  saveChanges() {

    let form = this.fixtureForm as FormArray;
    let tempArray: any[] = [];
    this.fixtureForm.enable();
    form.controls.forEach(gameWeek => {

      Object.keys(gameWeek.value).forEach(key => {

        let valueToSave = gameWeek.value[key];
        let comments: any[] = [];
        valueToSave.Comments.forEach((e: any) => {
          if (e != '') {
            let newComment = new Comment();
            newComment.Comment = e.Comment;
            newComment.User = this.user.name;
            newComment.Date = new Date().toDateString();
            comments.push(newComment);
          }
        })
        valueToSave.Comments = comments;
        valueToSave.HomeGoals = Number(valueToSave.HomeGoals);
        valueToSave.AwayGoals = Number(valueToSave.AwayGoals);
        tempArray.push(valueToSave);
      })
    })
    localStorage.setItem('fixture_data', JSON.stringify(tempArray));
    var str = localStorage.getItem('fixture_data')
    if (str) {
      var x = JSON.parse(str);
    }
    this.fixtures = this._tableService.getFixtures()
    this.table = this._tableService.getTable(this.straightenArray(this.fixtures));
    this.dataSource = this.table;
    this.columns = ["position"].concat(Object.keys(new Table()));
    this.fixtureForm = this.createFormArray(this.fixtures);
    if (this.user?.role != 'Admin') {
      this.fixtureForm.disable();
    }
    this.fixtureForm.controls.forEach((gameWeek: any) => {
      gameWeek.controls.forEach((fixture: any) => {

        if (this.user?.role == 'Authenticated') fixture.get('Comments').enable()
      })
    })
  }

}
