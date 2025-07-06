import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// Angular Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bond',
  templateUrl: './create-bond.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], styleUrl : './create-bond.component.css',
})
export class CreateBondComponent {
  bondForm: FormGroup;

  // Enum options for selectors
  cuponFrequencies = [
    'MONTHLY', 'BIMONTHLY', 'TRIMESTRAL', 'QUADRIMONTHLY', 'SEMIANNUAL', 'ANNUAL'
  ];
  capitalizations = [
    'NONE', 'DAILY', 'BIWEEKLY', 'MONTHLY', 'BIMONTHLY', 'TRIMONTHLY', 'QUADRIMONTHLY', 'SEMIANNUAL', 'ANNUAL'
  ];
  interestRateTypes = [
    'EFFECTIVE', 'NOMINAL'
  ];

  // Mensajes de éxito y error
  successMessage: string = '';
  errorMessage: string = '';

  // Traducciones para los selects
  cuponFrequenciesLabels: {[key: string]: string} = {
    'MONTHLY': 'Mensual',
    'BIMONTHLY': 'Bimestral',
    'TRIMESTRAL': 'Trimestral',
    'QUADRIMONTHLY': 'Cuatrimestral',
    'SEMIANNUAL': 'Semestral',
    'ANNUAL': 'Anual'
  };
  capitalizationsLabels: {[key: string]: string} = {
    'NONE': 'Ninguna',
    'DAILY': 'Diaria',
    'BIWEEKLY': 'Quincenal',
    'MONTHLY': 'Mensual',
    'BIMONTHLY': 'Bimestral',
    'TRIMONTHLY': 'Trimestral',
    'QUADRIMONTHLY': 'Cuatrimestral',
    'SEMIANNUAL': 'Semestral',
    'ANNUAL': 'Anual'
  };
  interestRateTypesLabels: {[key: string]: string} = {
    'EFFECTIVE': 'Efectiva',
    'NOMINAL': 'Nominal'
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.bondForm = this.fb.group({
      name: ['', Validators.required],
      nominalValue: [0, Validators.required],
      comercialValue: [0, Validators.required],
      years: [0, Validators.required],
      cuponFrequency: ['MONTHLY', Validators.required],
      daysPerYear: [360, Validators.required],
      interestRateType: ['EFFECTIVE', Validators.required],
      capitalization: ['NONE', Validators.required],
      interestRatePercentage: [0, Validators.required],
      anualDiscountRatePercentage: [0, Validators.required],
      incomeTaxPercentage: [0, Validators.required],
      issueDate: ['', Validators.required],
      premiumPercentage: [0, Validators.required],
      structuringPercentage: [0, Validators.required],
      placementPercentage: [0, Validators.required],
      floatingRatePercentage: [0, Validators.required],
      CAVALIPercentage: [0, Validators.required],
      anualInflationPercentage: [0, Validators.required]
    });
  }

  onInterestRateTypeChange(type: string) {
    if (type === 'EFFECTIVE') {
      this.bondForm.get('capitalization')?.setValue('NONE');
      this.bondForm.get('capitalization')?.disable();
    } else {
      this.bondForm.get('capitalization')?.enable();
    }
  }

  ngOnInit() {
    // Set initial state for capitalization
    if (this.bondForm.get('interestRateType')?.value === 'EFFECTIVE') {
      this.bondForm.get('capitalization')?.setValue('NONE');
      this.bondForm.get('capitalization')?.disable();
    }
  }

  onSubmit() {
    if (this.bondForm.valid) {
      const bondData = {
        ...this.bondForm.value,
        issueDate: new Date(this.bondForm.value.issueDate).toISOString()
      };
      this.http.post<any>('http://localhost:8080/api/v1/bonds', bondData)
          .subscribe({
            next: (res) => {
              this.successMessage = '¡Bono creado exitosamente!';
              this.errorMessage = '';
              // Redirigir al cashflow del bono creado (usa el id retornado)
              this.router.navigate(['bonds', res.id, 'cashflow']);
            },
            error: (err) => {
              this.errorMessage = 'Ocurrió un error al crear el bono.';
              this.successMessage = '';
              setTimeout(() => {
                this.errorMessage = '';
              }, 3500);
            }
          });
    }
  }
}
