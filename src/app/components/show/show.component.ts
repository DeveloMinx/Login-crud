import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html', 
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  dataUser: any;
  Posts:Post[]
  constructor(private postService: PostService,
    private afAuth: AngularFireAuth, 
    private router: Router) { }

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
  }

  deleteRow = (post => this.postService.deletepost(post))
}
