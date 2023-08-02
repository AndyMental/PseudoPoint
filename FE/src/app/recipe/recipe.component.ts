import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeModel } from '../shared/model/recipes'; // Update the import
import { RecipeService } from '../shared/services/recipe.service'; // Update the import
import { MatDialog } from '@angular/material/dialog';
import { RecipeformComponent } from './recipeform/recipeform.component'; // Update the import
import { ToastService,TOAST_STATE } from '../shared/services/Toast.service';
import { DeleteconfirmationDialogComponent } from '../deleteconfirmation-dialog/deleteconfirmation-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./repcipe.component.css'],
})
export class RecipeComponent  {
  public displayedColumns: string[] = ['id', 'names', 'ingredients', 'instructions', 'actions'];
  public recipes: RecipeModel[] = [];
  
  @ViewChild(MatTable) recipesTable!:MatTable<any>;
  public newRecipe: RecipeModel = {
    id: 0,
    names: '',
    ingredients: [],
    instructions: '',
  };

  constructor(private recipeService: RecipeService, private dialog: MatDialog,private toastservice:ToastService) {}

  ngOnInit(): void {
    
    this.recipeService.getRecipes().subscribe((data)=>{
      this.recipes = data
  })
}

  public  openAddRecipe():void {
    const dialogRef = this.dialog.open(RecipeformComponent, {
      width: '400px',
      data: { editMode: false, record: { ...this.newRecipe } },
    });
    dialogRef.afterClosed().subscribe((result: RecipeModel | undefined) => {
      
      if (result) {
        
        this.recipesTable.renderRows();
      }
      
    });
  }

  public addNewRecipe(newRecipeData: RecipeModel): void {
    const newRecipe: RecipeModel = {
      id: 0, // Set the initial ID to 0 or generate an appropriate ID
      names: newRecipeData.names,
      ingredients: newRecipeData.ingredients,
      instructions: newRecipeData.instructions,
    };
    this.recipeService.addRecipe(newRecipe).subscribe(
      (response: RecipeModel) => {
        
        this.recipes.push(response);
        this.recipesTable.renderRows();
      
        this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      },
      (error) => {
        this.toastservice.showToast(
          TOAST_STATE.danger,
          `Error occurred while adding new Recipe: ${error}`
        );
      }
    );
    
  }

  public updateExistingRecipe(id: number): void {
      const existingRecipe = this.recipes.find((recipe) => recipe.id === id);
      if (existingRecipe) {
        const dialogRef = this.dialog.open(RecipeformComponent, {
          width: '400px',
          data: { editMode: true, record: { ...existingRecipe } },
        });

        dialogRef.afterClosed().subscribe((result: RecipeModel | undefined) => {
          if (result) {
            const index = this.recipes.findIndex((recipe) => recipe.id === result.id);
            if (index !== -1) {
              this.recipes[index] = result;
              this.recipesTable.renderRows();
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
            }
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, 'Enable to edit ID :');
            }
          }
          if (result) {
            this.updateRecipe(result);
          }
        });
      } 
    }
  

  public updateRecipe(updatedRecipe: RecipeModel): void {
    this.recipeService.updateRecipe(updatedRecipe).subscribe(
      (response: RecipeModel) => {
        
        this.recipesTable.renderRows();
      },
      (error) => {
        
      }
    );
  }

  deleteRecipe(id: number):void {
    const dialogRef = this.dialog.open(DeleteconfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this recipe?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.recipeService.deleteRecipe(id).subscribe(
          () => {
            this.recipes = this.recipes.filter((item) => item.id !== id);
            //this.refreshData();
            this.recipesTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
          },
          (error) => {
            
            this.toastservice.showToast(
              TOAST_STATE.danger,
              `Error occurred while deleting Item: ${error}`
            );
          }
        );
      }
    });
  }
}
