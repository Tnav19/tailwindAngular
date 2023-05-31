import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { NewJobsComponent } from './new-jobs/new-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateJobsComponent } from './update-jobs/update-jobs.component';

const routes: Routes = [
 { path: '', component: JobsComponent },
 { path: 'new', component: NewJobsComponent },
 { path: ':id', component:UpdateJobsComponent }
]

@NgModule({
  declarations: [
    JobsComponent,
    NewJobsComponent,
    UpdateJobsComponent
  ],
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   RouterModule.forChild(routes)
 ]
})
export class JobsModule { }
