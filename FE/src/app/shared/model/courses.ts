
export class CoursesModel {
    constructor(
      public course_id:number,
      public title: string,
      public instructor: string,
      public description: string,
      public price: number,
      public duration: number,
      public prerequisites:string) {
      
    }
  }
  