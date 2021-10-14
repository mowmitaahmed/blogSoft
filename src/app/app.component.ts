import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub ?: Subscription;
  title = 'blogsite';

  constructor( private cdRef: ChangeDetectorRef , public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change);
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    
  }

}
