import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages = [];
  protected currentUser : string = '';

  constructor(private socket: Socket, private toastCtrl: ToastController) { }

  ngOnInit(): void {
       this.socket.connect();

       let name = `User-${new Date().getTime()} `;
       this.currentUser = name;

       this.socket.emit('set-name', name);

       this.socket.fromEvent('users-changed').subscribe(data => {
           console.log('got data: ', data);
           let user = data['user'];

           if (data['event'] == 'left'){
             this.showToast(`User left: ${user}`);
           } else {
             this.showToast(`User joined: ${user}`);
           }
       });

       this.socket.fromEvent('message').subscribe(message => {
           console.log('New: ', message);
           this.messages.push(message);
       })

   }

   sendMessage(){
       this.socket.emit('send-message', {text: this.message});
       this.message='';
   }

   ionViewWillLeave(){
       this.socket.disconnect();
   }

   async showToast(msg){
     let toast = await this.toastCtrl.create({
       message: msg,
       position: 'top',
       duration: 2000
     });
     toast.present();
     }

}
