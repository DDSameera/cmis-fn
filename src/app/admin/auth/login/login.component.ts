import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { encode } from 'js-base64';
import Swal from 'sweetalert2';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';
import { Router } from '@angular/router';
import { CacheDataService } from 'src/app/services/cache-data.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  inputEmail: string = '';
  inputPassword: string = '';

  constructor(
    private renderer: Renderer2,
    private title: Title,
    private requestHandlerService: RequestHandlerService,
    private localStorageDataService: LocalstorageDataService,
    private route:Router,
    private cacheDataService : CacheDataService,
    private authGuardService:AuthGuardService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-primary');
    this.title.setTitle('Login');
    this.authGuardService.checkAlreadyLog();


  }

  userLogin() {
    let bodyData = {
      email: this.inputEmail,
      password: this.inputPassword,
    };

    this.requestHandlerService.postRequest('api/login', bodyData).subscribe(
      (resultData: any) => {
        if (resultData.success) {
          localStorage.setItem('token', resultData.data.token);

          let data: any = {
            logged: true,
          };
          this.localStorageDataService.setLocalStorageAttribute(data);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login Successfully',

          });

          this.cacheDataService.loggedUserName = this.inputEmail;

          sessionStorage.setItem('logged-user',encode(this.inputEmail));

          this.route.navigateByUrl('/dashboard/ticket');
        } else {
          let data: any = {
            logged: false,
          };
          let encodedData = encode(JSON.stringify(data));
          localStorage.setItem('session-data', encodedData);

          this.errorMessage = 'Something goes wrong.';
        }
      },
      (errorData: any) => {
        let data: any = {
          logged: false,
        };
        let encodedData = encode(JSON.stringify(data));
        localStorage.setItem('session-data', encodedData);

        this.errorMessage = errorData.error.message;

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMessage,
        });
      }
    );
  }



}
