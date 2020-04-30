import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

    mainuser: AngularFirestoreDocument
	userPosts
	sub
	posts
	username: string
	profilePic: string

	constructor(private afs: AngularFirestore, private user: UserService, private router: Router) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.userPosts = this.mainuser.valueChanges()
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.posts = event.posts
			this.username = event.username
			this.profilePic = event.profilePic
		})
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}


  goTo(postID: string){
	setTimeout(() => {
		this.router.navigate(['./tabs/post/' + postID.split('/')[0]])
	  }, 1000);
  }

  ngOnInit(){
  }

}
