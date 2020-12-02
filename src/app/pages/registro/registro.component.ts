import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: boolean = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() { 

    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Please wait'
    });

    Swal.showLoading();
    
    this.auth.nuevoUsuario(this.usuario).subscribe(resp =>{
      // Successful register of account
      console.log(resp);
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (err)=> {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Log in error',
        text: err.error.error.message
      });
    });
  }


}
