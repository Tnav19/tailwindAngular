import { Component, OnInit } from '@angular/core';
import { JobsService } from './jobs.service';

@Component({
  selector: 'pmo-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.less']
})
export class JobsComponent implements OnInit {

 jobList:any = [];

 constructor(private _jobService: JobsService){}

 ngOnInit(): void {
   this.listJobs();
 }

 listJobs(){
   this._jobService.list().subscribe((response)=>{
     this.jobList = response;
   },(error=>{

   }));
 }

 createJob(){
   let Job = {
     id: new Date().getTime(),
     title:`Some Job` 
   }
   this._jobService.create(Job).subscribe((response)=>{
     this.listJobs();
   },(error=>{

   }));
 }

 editJob(Job: any){
   let data = {
     id: new Date().getTime(),
     title:`Some Job` 
   }
   this._jobService.update(Job.id,data).subscribe((response)=>{
     this.listJobs();
   },(error=>{

   }));
 }

 deleteJob(id: any){
   this._jobService.delete(id).subscribe((response)=>{
     this.listJobs();
   },(error=>{
   }));
 }
}
