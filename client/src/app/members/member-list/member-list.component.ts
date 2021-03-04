import { Member } from './../../model/member';
import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  
  constructor(private memberservice: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberservice.getMembers().subscribe(membersData => {
      this.members = membersData;
      console.log(this.members);
    });
    
  }

}
