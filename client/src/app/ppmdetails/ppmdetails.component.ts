import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PPmSummary } from '../model/ppmsummary';
import { PpmDetailsService } from '../services/ppmdetails.service';

@Component({
  selector: 'app-ppmdetails',
  templateUrl: './ppmdetails.component.html',
  styleUrls: ['./ppmdetails.component.css']
})
export class PpmDetailsComponent implements OnInit {

  ppm: PPmSummary;
  
  constructor(private ppmService: PpmDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPPM();
  }

  loadPPM() {
    this.ppmService.getPPMById(this.route.snapshot.paramMap.get('id')).subscribe(ppmData => {
      this.ppm = ppmData;
      console.log(this.ppm);
    });
  }
}
