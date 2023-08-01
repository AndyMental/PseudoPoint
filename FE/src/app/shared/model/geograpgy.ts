// export interface Location {
//     latitude: number;
//     longitude: number;
//   }
  
//   export interface Feature {
//     name: string;
//     location: Location;
//   }

  export interface Feature {
    id:number,
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }
  