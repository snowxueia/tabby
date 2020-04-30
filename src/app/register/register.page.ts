import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
  }

  async login() {
    this.router.navigate(['/login'])
  }

  async register() {
    const { username, password, cpassword } = this 
    if(password != cpassword) {
      this.showAlert("Error!", "Password don't match")
      return console.error("Password don't match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@codedamn.com', password)
      console.log(res)
    //  this.showAlert("Success!", "Welcome aboard!")

      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.presentAlert('Success', "Welcome aboard!")
      this.router.navigate(['/tabs'])
      
    } catch(error) {
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await (await alert).present()
  }

}
