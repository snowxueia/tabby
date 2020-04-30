import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'
import { Router } from '@angular/router'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  posts
  sub

  constructor(private aff: AngularFireFunctions,public router: Router) {}

  ngOnInit() {
    const getFeed = this.aff.httpsCallable('getFeed')
    this.sub = getFeed({}).subscribe(data => {
      this.posts = data
    })
  }
  async goToLogin() {
		this.router.navigate(['/login'])
	}
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
