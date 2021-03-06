import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  message: Message = new Message('', '');

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=>{
      if (params['nowCanLogin']){
        this.showMessage('Теперь вы можете зайти в систему', 'success');
      }
      else if(params['accessDenied']){
        this.showMessage('Для работы с системой нужно авторизироваться');
      }
    })

    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required, Validators.minLength(6)
      ])
    });
  }

  private showMessage(text: string, type:string = 'danger'){
    this.message = new Message(type, text);
    window.setTimeout(()=>{
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    this.usersService.getUserByEmail(this.form.value.email)
      .subscribe(((user: User) =>{
        if (user){
          if (user.password === this.form.value.password){
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          }
          else{
            this.showMessage('Пароль неверный.');
            this.form.reset();
          }
        }
        else{
          this.showMessage('Неверные логин и пароль.');
          this.form.reset();
        }
      }))
  }
}
