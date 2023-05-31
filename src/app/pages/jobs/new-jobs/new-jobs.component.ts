import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBefore } from 'date-fns';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'pmo-new-jobs',
  templateUrl: './new-jobs.component.html',
  styleUrls: ['./new-jobs.component.less']
})
export class NewJobsComponent implements OnInit {
 form!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private _jobService: JobsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
   this.defaultsInit();
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
     job_number: a?.jobNumber,
     job_title: a?.jobTitle,
     job_start_date: a?.startDate,
     job_close_date: a?.endDate,
     experience_required: a?.experienceRequired==='true'?true:false,
     number_of_openings: a?.noOfOpenings,
     job_notes: a?.jobNotes,
   }
    Object.assign(a, {
      job_number: a?.jobNumber,
      job_title: a?.jobTitle,
      job_start_date: a?.startDate,
      job_close_date: a?.endDate,
      experience_required: a?.experienceRequired,
      number_of_openings: a?.noOfOpenings,
      job_notes: a?.jobNotes,
    });
    this._jobService.create(req).subscribe((res) => {
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
