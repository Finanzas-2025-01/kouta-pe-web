import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-bond',
  standalone: true,
  templateUrl: './edit-bond.component.html',
  styleUrls: ['./edit-bond.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditBondComponent implements OnInit {
  bondForm: FormGroup;
  bondId: string | null = null;
  successMessage = '';
  errorMessage = '';
  bondName = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.bondForm = this.fb.group({
      comercialValue: [0, Validators.required],
      interestRatePercentage: [0, Validators.required],
      anualDiscountRatePercentage: [0, Validators.required],
      premiumPercentage: [0, Validators.required],
      structuringPercentage: [0, Validators.required],
      placementPercentage: [0, Validators.required],
      floatingRatePercentage: [0, Validators.required],
      CAVALIPercentage: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.bondId = this.route.snapshot.paramMap.get('id');
    if (this.bondId) {
      this.http.get<any>(`https://bond-cash-backend.onrender.com/api/v1/bonds/${this.bondId}`)
        .subscribe({
          next: (bond) => {
            this.bondName = bond.name;
            this.bondForm.patchValue({
              comercialValue: bond.comercialValue,
              interestRatePercentage: bond.interestRatePercentage,
              anualDiscountRatePercentage: bond.anualDiscountRatePercentage,
              premiumPercentage: bond.premiumPercentage,
              structuringPercentage: bond.structuringPercentage,
              placementPercentage: bond.placementPercentage,
              floatingRatePercentage: bond.floatingRatePercentage,
              CAVALIPercentage: bond.CAVALIPercentage
            });
          },
          error: () => {
            this.errorMessage = 'No se pudo cargar el bono.';
          }
        });
    }
  }

  onSubmit() {
    if (this.bondForm.valid && this.bondId) {
      this.http.put(`https://bond-cash-backend.onrender.com/api/v1/bonds/${this.bondId}`, this.bondForm.value)
        .subscribe({
          next: () => {
            this.successMessage = '¡Bono actualizado exitosamente!';
            this.errorMessage = '';
            // Redirige al cashflow del bono actualizado
            this.router.navigate(['/bonds', this.bondId, 'cashflow']);
          },
          error: () => {
            this.errorMessage = 'Ocurrió un error al actualizar el bono.';
            this.successMessage = '';
            setTimeout(() => this.errorMessage = '', 3500);
          }
        });
    }
  }
}
