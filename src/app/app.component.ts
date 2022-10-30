import {Component, Inject} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nogomet';

  constructor(public authService: AuthService,@Inject(DOCUMENT) public doc:Document) {
  }

  print(str:any){
    console.log(str);
    this.authService.getAccessTokenSilently().subscribe(data=> console.log(   data))


  }
}
