export interface  Constituency {
  constituency: string,
  wards: string[]
}
export interface Loc {
  county: string,
  constituencies: Constituency[],
}
export interface VoterLocation {
  county: string,
  constituency: string,
  ward: string
}
export interface Voter {
  _id?:string,
  idNumber:any,
  dateOfBirth: Date,
  gender: string,
  location: VoterLocation,
  role?:string,
  voted?:boolean
}
export interface Login {
  idNumber:number,
  dateOfBirth: Date
}

export interface Alert {
  success: boolean,
  message: string
}
