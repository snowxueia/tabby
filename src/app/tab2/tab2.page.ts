import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { IonButton, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
@Injectable()
export class Tab2Page implements OnInit{

  imageURL: string
  desc: string
  

  scaleCrop: string = '-/scale_crop/200x200'
	
	effects = {
		effect1: '',
		effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
		effect3: '-/filter/vevera/150/',
		effect4: '-/filter/carris/150/',
		effect5: '-/filter/misiara/150/'
	}
  activeEffect: string = this.effects.effect1
  busy: boolean = false

  @ViewChild('fileButton', { static: false, read: ElementRef }) fileButton: ElementRef

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router: Router) {}

  ngOnInit() {
  }

  async createPost() {
    this.busy = true
    const image = this.imageURL
    const desc = this.desc
    const activeEffect = this.activeEffect

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      likes: [],
      effect: activeEffect
    })

    this.busy = false
    this.imageURL = ""
    this.desc = ""

    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post was created!',
      buttons: ['Cool!']
    })

    await alert.present()

    this.router.navigate(['/tabs/tab1'])
  }

  setSelected(effect: string) {
		this.activeEffect = this.effects[effect]
  }
  
  uploadFile() {
    //this.fileButton.nativeElement.click()
    setTimeout(() => {
      this.fileButton.nativeElement.click()
    }, 1000);
  
  }

  fileChanged(event) {
    this.busy = true

    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', '0c3c34ecdcb73801aff6')

    this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
      console.log(event)
      setTimeout(() => {
        this.imageURL = JSON.parse(JSON.stringify(event)).file
        this.busy = false
      }, 1000);
    })
  }
}
