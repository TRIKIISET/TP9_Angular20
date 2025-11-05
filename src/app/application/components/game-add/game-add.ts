import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Game } from '../../models/game';
import { GameService } from '../../services/game-service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-game-add',
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './game-add.html',
  styleUrl: './game-add.css'
})
export class GameAdd implements OnInit {


  categories = Object.values(Category);
  games: Game[] = [];
  readonly fb: FormBuilder = inject(FormBuilder);


  // gameForm: FormGroup = new FormGroup({
  //   id: new FormControl("2",{nonNullable:true}),
  //   name: new FormControl("Echec", {nonNullable:true}),
  //   price: new FormControl(12.3, {nonNullable:true}),
  //   madeIn: new FormControl("Tunisie", {nonNullable:true}),
  //   category: new FormControl(Category.BoardGames, {nonNullable:true}),
  //   isNew: new FormControl(true, {nonNullable:true})
  // })


  private gameService: GameService = inject(GameService);

  gameForm!: FormGroup;
  ngOnInit(): void {
    this.gameForm = this.fb.nonNullable.group({
      id: [2],
      name: ["Ballon"],
      price: [12.3],
      madeIn: ['Tunisie'],
      category: [Category.BoardGames],
      isNew: [true],
      shops: this.fb.array([])
    })

    this.gameService.getGames().subscribe(
      data => {
        this.games = data
        this.gameForm.get('id')?.setValue((this.games.length + 1).toString());
      }
    )

    this.gameForm.get('name')?.valueChanges.subscribe(
      data => console.log(data)
    )
  }

  onSubmit() {
    console.log(this.gameForm.value);
    console.log(this.gameForm.get("id")?.value)
    console.log(this.gameForm.value["name"]);
    console.log(this.gameForm.value.price);
    console.log(this.gameForm.controls["madeIn"].value);
    // Ajout d'un jeu

    this.gameService.addGame(this.gameForm.value).subscribe(
      data => {
        this.games.push(data);
        this.onResetForm()
      }
    )
  }

  onResetForm() {
    this.gameForm.reset({ madeIn: 'Autre', category: Category.CardGames });
    this.gameForm.get('id')?.setValue((this.games.length + 1).toString());
    this.gameShops.clear();
  }

  public get gameShops() {
    return this.gameForm.get('shops') as FormArray;
  }

  onAddShop() {
    this.gameShops.push(this.fb.control(''));
  }

}
