export class HiredBond {
  id: number;
  name: string;
  nominalValue: number;
  comercialValue: number;
  years: number;
  cuponFrequency: string;
  daysPerYear: number;
  interestRateType: string;
  capitalization: string;
  interestRatePercentage: number;
  anualDiscountRatePercentage: number;
  incomeTaxPercentage: number;
  issueDate: Date;
  premiumPercentage: number;
  structuringPercentage: number;
  placementPercentage: number;
  floatingRatePercentage: number;
  CAVALIPercentage: number;
  anualInflationPercentage: number;
  bondType: string;
  issuer: Issuer;
  bondHolder: BondHolder;

  constructor(
    id: number,
    name: string,
    nominalValue: number,
    comercialValue: number,
    years: number,
    cuponFrequency: string,
    daysPerYear: number,
    interestRateType: string,
    capitalization: string,
    interestRatePercentage: number,
    anualDiscountRatePercentage: number,
    incomeTaxPercentage: number,
    issueDate: Date,
    premiumPercentage: number,
    structuringPercentage: number,
    placementPercentage: number,
    floatingRatePercentage: number,
    CAVALIPercentage: number,
    anualInflationPercentage: number,
    bondType: string,
    issuer: Issuer,
    bondHolder: BondHolder
  ) {
    this.id = id;
    this.name = name;
    this.nominalValue = nominalValue;
    this.comercialValue = comercialValue;
    this.years = years;
    this.cuponFrequency = cuponFrequency;
    this.daysPerYear = daysPerYear;
    this.interestRateType = interestRateType;
    this.capitalization = capitalization;
    this.interestRatePercentage = interestRatePercentage;
    this.anualDiscountRatePercentage = anualDiscountRatePercentage;
    this.incomeTaxPercentage = incomeTaxPercentage;
    this.issueDate = issueDate;
    this.premiumPercentage = premiumPercentage;
    this.structuringPercentage = structuringPercentage;
    this.placementPercentage = placementPercentage;
    this.floatingRatePercentage = floatingRatePercentage;
    this.CAVALIPercentage = CAVALIPercentage;
    this.anualInflationPercentage = anualInflationPercentage;
    this.bondType = bondType;
    this.issuer = issuer;
    this.bondHolder = bondHolder;
  }

}

class Issuer {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;

  constructor(id: number, username: string, name: string, surname: string, email: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
}

class BondHolder{
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;

  constructor(id: number, username: string, name: string, surname: string, email: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
}
