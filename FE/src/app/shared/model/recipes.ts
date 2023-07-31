
export class RecipeModel {
  
    constructor(
      public id: number, 
      public names: string,
      public ingredients:string[],
      public instructions: string) {

    }
     
  }
  