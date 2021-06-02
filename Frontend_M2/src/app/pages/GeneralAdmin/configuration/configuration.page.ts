import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  public notification:boolean = true;
  public private:boolean = true;
  public authentication:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  myChange(){
    console.log(this.notification);
    console.log(this.private);
    console.log(this.authentication);
  }

}
