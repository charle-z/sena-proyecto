import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    //Creo el nuevo atributo del formulario
    formularioLogin!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private conexion: ConexionService,
        private router: Router) { }


    ngOnInit() {
        this.formularioLogin = this.formBuilder.group({
            id: ['', Validators.required],
            contrasena: ['', Validators.required]
        })
    }


    ingresar() {
        if (!this.formularioLogin.valid) {
            return;
        }

        const loginData = this.formularioLogin.value;
        this.conexion.getUser(loginData.id, loginData.contrasena).subscribe
            ((data) => {
                console.log(data)
                if (data) {
                    if (data.ok === 'ok') {
                        this.router.navigate(['../folder'])
                    } else if (data.ok === 'aprendiz') {
                        alert("Por favor, verifique sus permisos.");
                    } else if (data.error === 'error') {
                        alert("Por favor, verifique su información.");
                    }
                }

            })
        this.ngOnInit();
    }
}

