import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBefore } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'pmo-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.less']
})
export class UpdateJobsComponent implements OnInit {
 form!: FormGroup;
 jobId!:string;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _jobService: JobsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.defaultsInit();
   this.jobId = this.route.snapshot.paramMap.get('id')!
   this._jobService.listById(this.jobId).subscribe((a)=>{
    this.form.patchValue({
     jobNumber: a?.job_number,
     jobTitle: a?.job_title,
     startDate: a?.job_start_date,
     endDate: a?.job_close_date,
     experienceRequired: a?.experience_required,
     noOfOpenings: a?.number_of_openings,
     jobNotes: a?.job_notes,
   })
   })
  }
  defaultsInit(): void {
    this.form = this.fb.group({
      jobNumber: [null, [Validators.required]],
      jobTitle: [null, [Validators.required]],
      experienceRequired: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      noOfOpenings: [null, [Validators.required]],
      jobNotes: [null, [Validators.required]],
    });

    const start = this.form.get('startDate');
    const end = this.form.get('endDate');

    end?.valueChanges.pipe().subscribe(() => {
      const k = isBefore(new Date(start?.value), new Date(end?.value));
      k ? end?.setErrors(null) : end?.setErrors({ invalidSelection: true });
    });
  }

  submit(): void {
    if (!this.form?.valid) return;

    const a = this.form.getRawValue();
    var req={
     id:parseInt(this.jobId),
     job_number: a?.jobNumber,
     job_title: a?.jobTitle,
     job_start_date: a?.startDate,
     job_close_date: a?.endDate,
     experience_required: a?.experienceRequired==='true'?true:false,
     number_of_openings: a?.noOfOpenings,
     job_notes: a?.jobNotes,
   }
    this._jobService.update(this.jobId,req).subscribe((res) => {
      this._jobService.toastr('Details updated successfully', {
        icon: 'success',
      });
      this.router.navigateByUrl('/jobs');
    },
    (err) => this._jobService.toastr(err));
  }

  get f() {
    return this.form.controls;
  }
}
