import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  companyForm!: FormGroup;

  hideBasic:boolean = false;
  hideManagement: boolean = true;
  hideProducts: boolean = true;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe({
      next: (qparams: any) => {
        if (qparams.companyName) {
          this.loadCompanyForm(qparams.companyName);
        }
      },
    });
  }

  stepper(enableIndex: number) {
    if(enableIndex==0) {
      this.hideBasic=false;
      this.hideManagement=true;
      this.hideProducts=true;
    } else if(enableIndex==1) {
      this.hideBasic=true;
      this.hideManagement=false;
      this.hideProducts=true;
    } else if(enableIndex==2) {
      this.hideBasic=true;
      this.hideManagement=true;
      this.hideProducts=false;
    }
  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      country: ['', Validators.required],
      pincode: [
        0,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ],
      city: ['', Validators.required],
      countryCode: ['', Validators.required],
      companyContact: ['', Validators.required],
      companyWebsite: [''],
      logo: ['', Validators.required],
      brief: ['', Validators.required,Validators.maxLength(200)],
      mission: ['', Validators.maxLength(200)],
      socialURL: [''],
      keyContact: [
        this.fb.group({
          name: ['',Validators.required],
          designation:['',Validators.required],
          countryCode:['',Validators.required],
          phoneNumber: [null,Validators.required],
          email: ['',Validators.required,Validators.email]
        }),Validators.required],
      products: [
        this.fb.array([
          this.fb.group({
            productName: ['', Validators.required],
            description: ['', Validators.required],
            websiteURL: [''],
          }),
        ]),Validators.required],
      management: [
        this.fb.array([
          this.fb.group({
            managementName: [''],
            managementDesignation: [''],
            summary: [''],
            linkedIn: [''],
          }),
        ]),
      ]
    });
  }

  loadCompanyForm(companyName: string) {
    this.companyService.getCompany(companyName).subscribe({
      next: (res: any) => {},
      error: () => {},
    });
  }

  submitForms() {
    this.companyService.addCompany(this.companyForm.value).subscribe({
      next: (res: any) => {},
      error: () => {},
    });
  }
}
