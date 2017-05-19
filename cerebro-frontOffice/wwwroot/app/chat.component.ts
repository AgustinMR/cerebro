import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ChatService, ChannelEvent } from "./chat.service";

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/ChatComponent',
    providers: [ChatService]
})

export class ChatComponent implements OnInit {

    @Input() apiUrl: string;
    @Input() channel: string;
    eventName = "user.connected";

    messages = "";

    constructor(private http: Http, private channelService: ChatService) {

    }

    ngOnInit() {
        // Get an observable for events emitted on this channel
        //
        /*this.channelService.sub(this.channel).subscribe(
            (x: ChannelEvent) => {
                if (x.Name === "user.subscribed") {
                    alert();
                    this.appendStatusUpdate(x);
                }
            },
            (error: any) => {
                console.warn("Attempt to join channel failed!", error);
            }
        );*/
        this.channelService.sub(this.channel).map(response => {
        }).subscribe(response => console.log("Message recibed on EmployeeTaskComponent ngOnInit method"), error => console.log("Ha ocurrido un error: ", error), () => { });
    }


    private appendStatusUpdate(ev: ChannelEvent): void {
        // Just prepend this to the messages string shown in the textarea
        //
        alert();
        let date = new Date();
        switch (ev.data.State) {
            case "starting": {
                this.messages = `${date.toLocaleTimeString()} : starting\n` + this.messages;
                break;
            }

            case "complete": {
                this.messages = `${date.toLocaleTimeString()} : complete\n` + this.messages;
                break;
            }

            default: {
                this.messages = `${date.toLocaleTimeString()} : ${ev.data.State} : ${ev.data.PercentComplete} % complete\n` + this.messages;
            }
        }
    }

    callApi() {
        this.http.get(this.apiUrl)
            .map((res: Response) => res.json())
            .subscribe((message: string) => { console.log(message); });
    }

}