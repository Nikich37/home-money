import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User = new User('', '', '');

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    let userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
