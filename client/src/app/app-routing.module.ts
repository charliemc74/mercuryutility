import { ApplicationlogsComponent } from './applicationlogs/applicationlogs.component';
import { PpmSummaryComponent } from './ppmsummary/ppmsummary.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './gaurds/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { PpmDetailsComponent } from './ppmdetails/ppmdetails.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'ppmsummary', component: PpmSummaryComponent, canActivate: [AuthGuard]},
      { path: 'ppmdetails/:id', component: PpmDetailsComponent,  canActivate: [AuthGuard]},
      { path: 'logs', component: ApplicationlogsComponent,  canActivate: [AuthGuard]},
      { path: 'errors', component: TestErrorsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
