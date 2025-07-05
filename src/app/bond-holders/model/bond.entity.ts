import { Issuer } from "./issuer.entity";

export class Bond {
  id!: number;
  name!: string;
  nominalValue!: number;
  comercialValue!: number;
  years!: number;
  cuponFrequency!: string; // Ej: 'MONTHLY'
  daysPerYear!: number;
  interestRateType!: string; // Ej: 'EFFECTIVE'
  capitalization!: string; // Ej: 'NONE'
  interestRatePercentage!: number;
  anualDiscountRatePercentage!: number;
  incomeTaxPercentage!: number;
  issueDate!: string; // ISO string
  premiumPercentage!: number;
  structuringPercentage!: number;
  placementPercentage!: number;
  floatingRatePercentage!: number;
  CAVALIPercentage!: number;
  anualInflationPercentage!: number;
  issuer!: Issuer;
  constructor() {
    this.id = 0;
    this.name = '';
    this.nominalValue = 0;
    this.comercialValue = 0;
    this.years = 0;
    this.cuponFrequency = '';
    this.daysPerYear = 0;
    this.interestRateType = '';
    this.capitalization = '';
    this.interestRatePercentage = 0;
    this.anualDiscountRatePercentage = 0;
    this.incomeTaxPercentage = 0;
    this.issueDate = '';
    this.premiumPercentage = 0;
    this.structuringPercentage = 0;
    this.placementPercentage = 0;
    this.floatingRatePercentage = 0;
    this.CAVALIPercentage = 0;
    this.anualInflationPercentage = 0;
    this.issuer = new Issuer();
  }
}
