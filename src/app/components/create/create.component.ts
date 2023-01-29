import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { FormBuilder,FormGroup,NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  dataUser: any;
  public postForm:FormGroup
  constructor(
    private afAuth: AngularFireAuth,
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router:Router
  ) { 
    this.postForm = this.formBuilder.group({
      Ncuenta:[''],
      cedula:[''],
      valor:[''],
      nombre:[''],
    })
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        this.dataUser = user; 
        console.log(user) 
      } else {
        this.router.navigate(['/login']); 
      }
    })
  }
  onSubmit(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Crear un nuevo cliente',
      text: "No podras revertir esta accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.createpost(this.postForm.value)
        swalWithBootstrapButtons.fire(
          'Creado',
          'Cliente creado exitosamente',
          'success'
        )
        this.router.navigate(['/dashboard'])
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se a creado el cliente',
          'error'
        )
      }
    })



    
    
  }

}
