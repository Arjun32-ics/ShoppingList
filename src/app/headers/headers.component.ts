import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
 @Output() featureselected = new EventEmitter<string>();

  onSelect(feature:string){
   this.featureselected.emit(feature)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
