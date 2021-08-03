import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required, Validators.email], this.emailExist().bind(this)),
      'password': new FormControl(null, [
        Validators.required, Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue
      ])
    })
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      })
  }

  emailExist(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.usersService.getUserByEmail(control.value)
        .pipe(
          map(user=> user ? {emailExist: true} : null)
        );
    };
  }
}



