
export class BondResult {
  id: number;
  bondId: number;
  duration: number;
  convexity: number;
  modifiedDuration: number;
  percentageTCEA: number;
  percentageTREA: number;

  constructor(id: number = 0, bondId: number = 0, duration: number = 0, convexity: number = 0,
              modifiedDuration: number = 0, percentageTCEA: number = 0, percentageTREA: number = 0) {
    this.id = id;
    this.bondId = bondId;
    this.duration = duration;
    this.convexity = convexity;
    this.modifiedDuration = modifiedDuration;
    this.percentageTCEA = percentageTCEA;
    this.percentageTREA = percentageTREA;
  }

}
