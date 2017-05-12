import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css'],
    moduleId: module.id,
    providers: [ChatService]
})
export class ChatComponent implements OnInit {

    constructor(private chat: ChatService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

}
