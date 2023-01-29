import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { FormBuilder, FormGroup,NgModel} from '@angular/forms'
import {Router, ActivatedRoute} from '@angular/router'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/app/post.model';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dep',
  templateUrl: './dep.component.html',
  styleUrls: ['./dep.component.css']
})
export class DepComponent implements OnInit {
  dataUser: any;
  Posts:Post[]
  public editForm: FormGroup
  public editForms: FormGroup
  postRef:any
  constructor(
    private afAuth: AngularFireAuth,
    public postService:PostService,
    public formBuilder:FormBuilder,
    public activeRoute:ActivatedRoute,
    public router:Router
  ) {

    this.editForms=this.formBuilder.group({
      valor:[''],


    })
    this.editForm=this.formBuilder.group({
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
    this.postService.getPosts().subscribe((res)=>{
      this.Posts = res.map((e)=>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data()as Post)
        }
      })
    })
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.getPostById(id).subscribe(res =>{
      this.postRef = res
      this.editForm = this.formBuilder.group({
        Ncuenta:[this.postRef.Ncuenta],
        cedula:[this.postRef.cedula],
        valor:[this.postRef.valor],
        nombre:[this.postRef.nombre],
      })
    })

    const ids = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.getPostById(ids).subscribe(res =>{
      this.postRef = res
      this.editForms = this.formBuilder.group({
        valor:[this.postRef.valor],

      })
    })

  }

  onSubmit(){
    if(this.re<0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Error al momento de realizar el deposito',
        showConfirmButton: false,
        timer: 2500
      })
    }else if(this.input2<=0 || this.input2==null){
      Swal.fire({
        icon:'info',
        title: 'Debes ingresar el valor a depositar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Depósito exitoso',
        showConfirmButton: false,
        timer: 2500
      })
    const id= this.activeRoute.snapshot.paramMap.get('id')
    this.postService.updatePost(this.editForm.value, id)
    this.router.navigate(['/dashboard'])
    }
  }
  entrada:number;
  input1:number;
  input2:number;

  re:number;
  mensage:string;
  mostrar(){
    const n3=<HTMLInputElement>document.getElementById("n3");
    this.entrada=parseInt(n3.value)+0;
  }
  sumas(){
    const n1=<HTMLInputElement>document.getElementById("n1");
    const n2=<HTMLInputElement>document.getElementById("n2");
    this.re=parseInt(n1.value) + parseInt(n2.value);
  }

  }






