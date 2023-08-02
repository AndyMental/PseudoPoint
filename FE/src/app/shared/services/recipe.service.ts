import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeModel } from '../model/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeModel[] = [];

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>('http://127.0.0.1:8000/recipes');
  }

  addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>('http://127.0.0.1:8000/recipes', recipe);
  }

  updateRecipe(updatedRecipe: RecipeModel): Observable<RecipeModel> {
    const url = `http://127.0.0.1:8000/recipes/${updatedRecipe.id}`;
    return this.http.put<RecipeModel>(url, updatedRecipe);
  }

  deleteRecipe(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/recipes/${id}`;
    return this.http.delete(url);
  }

  // Method to store the fetched recipes
  setRecipes(recipes: RecipeModel[]): void {
    this.recipes = recipes;
  }

  // Method to return the stored recipes
  getStoredRecipes(): RecipeModel[] {
    return this.recipes;
  }
}
