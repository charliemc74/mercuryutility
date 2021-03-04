import { PPmSummary } from './../model/ppmsummary';
import { Component, OnInit } from '@angular/core';
import { PpmDetailsService } from '../services/ppmdetails.service';

@Component({
  selector: 'app-ppmsummary',
  templateUrl: './ppmsummary.component.html',
  styleUrls: ['./ppmsummary.component.css']
})
export class PpmSummaryComponent implements OnInit {

  ppms: PPmSummary[];
  
  constructor(private ppmService: PpmDetailsService) { }

  ngOnInit(): void {
    this.loadPPMs();
  }

  loadPPMs() {
    this.ppmService.getPPMs().subscribe(ppmData => {
      this.ppms = ppmData;
      console.log(this.ppms);
    });
    
  }

}
