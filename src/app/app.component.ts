import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public players: Player [] = [];
  public title: String = 'Jogadores';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(23),
        Validators.required
      ])]
    });
    this.load();
  }

  add(){
    const name = this.form.controls['name'].value;
    const id = this.players.length + 1;
    const points = 0;
    this.players.push(new Player(id, name, points));
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear(){
    this.form.reset();
  }

  remove(player: Player){
    var index = this.players.indexOf(player);
    if(index != -1){
      this.players.splice(index, 1)
    }
  }


  save(){
    const data = JSON.stringify(this.players);
    localStorage.setItem('players', data);
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('players');
    if(data){
      this.players = JSON.parse(data);
    } else {
      this.players = [];
    }
  }

  setPoint(player: Player){
    player.points++;
    this.save();
  }

  removePoint(player: Player){
    if(player.points == 0) {
      player.points = 0;
      alert('Não pode ficar negativo!');
    }else {
      player.points--;
    }
    this.save();
  }

  changeMode(mode:string){
    this.mode=mode;
  }


}
