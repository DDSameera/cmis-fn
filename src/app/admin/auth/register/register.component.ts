import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/_services/request-handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  successMessage: any = '';
  errorMessages: any = '';

  inputName: string = '';
  inputUserName: string = '';
  inputShopName: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  inputPasswordConfirm: string = '';

  constructor(private requestHandlerService: RequestHandlerService) {}

  ngOnInit(): void {}

  registerUser() {
    let body = {
      name: this.inputName,
      username: this.inputUserName,
      shop_name: this.inputShopName,
      email: this.inputEmail,
      password: this.inputPassword,
      password_confirmation: this.inputPasswordConfirm,
    };

    console.log(body);

    this.requestHandlerService.postRequest('api/register', body).subscribe(
      (resultData: any) => {
        if (resultData.success) {
           this.errorMessages = null;
          this.successMessage = 'User Registered Successfully';
        } else {
           this.successMessage=null;
          this.errorMessages = 'Something goes wrong';
        }
      },
      (errorData: any) => {
        console.log(errorData);
        this.successMessage=null;
        this.errorMessages = errorData.error.errors;
      }
    );
  }


}
