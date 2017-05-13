import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/IndexComponent'
})

export class IndexComponent implements OnInit{

    constructor(private elRef: ElementRef) { }

    public blurBackground(): void {
        
    }

    ngOnInit() {
        alert();
    }

    
}