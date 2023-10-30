export interface Alert {
  success: boolean,
  message: string
}

export interface PopulatedAspirant {
  _id: string,
  name: string,
  seat: string,
  party: string,
  avatarUrl: string,
  voter: {
    _id: string,
    location: {
      county: string,
      constituency: string,
      ward: string
    }
  }
  
}

export interface Aspirant {
  _id: string,
  name: any,
  seat: string,
  party: string,
  avatarUrl?: string,
  avatar?: File,
  votes?: number,
  location?: {
    county: string,
    constituency: string,
    ward: string
  } 
}
export interface Position {
  position: string,
  aspirants: Aspirant[]
}
export interface VoteModel {
  presidency:string,
  womenrep: string,
  mp:string,
  governor:string,
  senator:string,
  mca:string
}