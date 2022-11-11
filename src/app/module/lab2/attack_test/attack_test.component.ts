import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {TableService} from "../../../core/tableService";
import {Comment, Fixtures, Table} from "../../../mock-api/model";
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-attack_test',
  templateUrl: './attack_test.component.html',
  styleUrls: ['./attack_test.component.scss']
})
export class Attack_testComponent implements OnInit {
  xssAttackForm = new FormControl('');
  script = " <script>alert(document.cookie)</script>";
  textToShow: string | null = '';
  hide = true;
  nameForm: FormControl = new FormControl('');
  passwordForm: FormControl = new FormControl('');
  nameFormSafe: FormControl = new FormControl('', Validators.required);
  passwordFormSafe: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  signupResult: string = '';
  captcha: string = '';

  constructor(public sanitizer: DomSanitizer, private _formBuilder: FormBuilder) {
  }


  ngOnInit(): void {

  }

  onSubmitSafe() {
    this.textToShow = this.xssAttackForm.value;
  }

  onSubmit() {
    document.write(this.xssAttackForm.value!);
  }

  getErrorMessage() {
    if (this.passwordFormSafe.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordFormSafe.hasError('minlength') ? 'Not a valid password' : '';
  }

  onSubmitFormRegular() {
    this.signupResult = "Signed up as " + this.nameForm.value;
  }

  onSubmitFormSafe() {
    this.signupResult = "Signed up as " + this.nameFormSafe.value;
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse)
    this.captcha = captchaResponse;

  }
}
