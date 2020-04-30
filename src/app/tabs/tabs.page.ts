import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs', { static: true, read: IonTabs }) private tabsRef: IonTabs;

  constructor() {}

  ngOnInit(){
    console.log(this.tabsRef.select('tab1'));
  }

}
