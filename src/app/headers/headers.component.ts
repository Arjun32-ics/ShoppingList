import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

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


  constructor(private datastorageservice : DataStorageService) { }

  ngOnInit(): void {
  }

  onstoreData(){
    this.datastorageservice.storeRecipe();
  }

  onfetchData(){
    this.datastorageservice.fetchRecipe().subscribe();
  }
}
