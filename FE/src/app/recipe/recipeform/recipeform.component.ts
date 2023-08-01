import { Component, Inject, ViewChild } from '@angular/core';
import { RecipeModel } from '../../shared/model/recipes';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css'],
})
export class RecipeformComponent {
  public form: FormGroup;
  public editMode: boolean = false;
  @ViewChild('myForm', { static: false }) myForm!: NgForm;
  
  constructor(
    private recipeservice: RecipeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecipeformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: RecipeModel }
  ) {
    this.form = this.fb.group({
      id: [null],
      names: [null, [Validators.required]],
      ingredients: this.fb.array([this.createIngredientControl()]),
      instructions: [null, [Validators.required]],
    });

    if (data && data.record) {
      this.form.patchValue(data.record);
      if (data.record.ingredients) {
        this.clearIngredients();
        data.record.ingredients.forEach((ingredient) => {
          this.addIngredientControl(ingredient);
        });
      }
    }

    this.editMode = data.editMode;
  }

  public createIngredientControl(value: string = ''): FormGroup {
    return this.fb.group({
      ingredient: [value, Validators.required],
    });
  }

  public get ingredientsControl(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public addIngredientControl(value: string = ''): void {
    this.ingredientsControl.push(this.createIngredientControl(value));
  }

  public removeIngredient(index: number): void {
    this.ingredientsControl.removeAt(index);
  }

  public clearIngredients(): void {
    while (this.ingredientsControl.length > 1) {
      this.ingredientsControl.removeAt(0);
    }
  }

  public submitRecipe(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      formData.ingredients = formData.ingredients.map((control: { ingredient: string }) => control.ingredient);
      if (this.editMode) {
        this.recipeservice.updateRecipe(formData).subscribe(
          (updatedRecipe: RecipeModel) => {
            this.dialogRef.close(updatedRecipe);
            this.editMode = false;
          },
          
        );
      } else {
        this.recipeservice.addRecipe(formData).subscribe(
          (newRecipe: RecipeModel) => {
            
            
            this.dialogRef.close(newRecipe);
            this.myForm.resetForm();
            this.editMode = false;
          },
          
        );
      }
    }
  }

  public cancelRecipe(): void {
    this.dialogRef.close();
    this.myForm.resetForm();
  }
}
