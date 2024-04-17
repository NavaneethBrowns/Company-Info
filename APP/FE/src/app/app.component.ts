import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  companyForm!: FormGroup;
  productForm!: FormArray;
  managementForm!: FormArray;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe({
      next:(qparams:any)=>{
        if(qparams.companyName) {
          this.loadCompanyForm(qparams.companyName);
        }
      }
    })
  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: ['',Validators.required],
      CompanyAddress: ['',Validators.required],
      country: ['',Validators.required],
      pincode: [0,Validators.required,Validators.minLength(6),Validators.maxLength(6)],
      city: ['',Validators.required],
      countryCode: ['',Validators.required],
      companyContact: ['',Validators.required],
      companyWebsite: [''],
      logo: ['',Validators.required],
    });
    this.productForm = this.fb.array([this.fb.group({
      productName: ['',Validators.required] ,
      description: ['',Validators.required],
      websiteURL: [''] ,
    })]);
    this.managementForm = this.fb.array([this.fb.group({
      managementName: [''] ,
      managementDesignation: [''],
      summary: [''],
      linkedIn: [''],
    })]);
  }

  loadCompanyForm(companyName: string) {
    this.companyService.getCompany(companyName).subscribe({
      next:(res:any)=>{

      },
      error:()=>{
        
      }
    })
  }

  submitForms() {
    let formData: any = {
      ...this.companyForm.value,
      ...{ products: this.productForm.value },
      ...{ management: this.managementForm.value },
    };
    this.companyService.getAllCompanies({}).subscribe({
      next:(res:any)=>{

      },
      error:()=>{

      }
    })
  } 
}
