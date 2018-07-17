import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import Permissions from '../../store/models/permissions';
import { SocketService, Event } from '../../core/services/socket.service';
import { AsyncService } from '../../core/services/aync.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  permissions: {
    viewPublicAlgos: boolean,
    viewMyAlgos: boolean,
    vewRoles: boolean,
    viewMyInstances: boolean
  };

  constructor(private userService: UserService, private socketService: SocketService, private asyncService: AsyncService) {
    this.userService.loggedUserSubject.subscribe(() => {
      this.permissions = {
        viewPublicAlgos: this.userService.hasPermission(Permissions.GET_ALL_ALGOS),
        viewMyAlgos: this.userService.hasPermission(Permissions.GET_USER_ALGOS),
        vewRoles: this.userService.hasPermission(Permissions.GET_ALL_USER_ROLES)
        && this.userService.hasPermission(Permissions.GET_ALL_USERS_WITH_ROLES),
        viewMyInstances: this.userService.hasPermission(Permissions.GET_USER_INSTANCES)
      };
    });

    this.socketService.initSocket();
    //
    // this.socketService.onEvent(Event.CONNECT).subscribe(() => {
    //   console.log('connected');
    //
    //   this.socketService.onData().subscribe((data) => {
    //     console.log(data);
    //   });
    //
    //   setInterval(() => {
    //     this.socketService.send({id: 'dasdas', payload: 'dsadsad'});
    //   }, 500)
    //
    // });

    this.socketService.initializeWebSocketConnection();

    this.asyncService.connect();
    this.asyncService.subscribe('message').subscribe((data) => {
      console.log(data);
    });


  }
}
