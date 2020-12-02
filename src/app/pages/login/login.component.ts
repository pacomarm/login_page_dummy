import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean = true;
  
  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit( ) {

    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Please wait'
    });

    Swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe( resp => {
      // Successful login
      console.log(resp);
      Swal.close();

      if(this.recordarme === true){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Log in error',
        text: err.error.error.message
      });
    });
  }

}
