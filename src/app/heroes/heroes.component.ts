import {Component, OnChanges, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnChanges {
  hero: Hero = {id: 1, name: 'Winstorm'};
  //heroes = HEROES;
  heroes: Hero[];
  //today = Date.now();
  //selectedHero: Hero;

  constructor(private  heroService: HeroService) {
    console.log('HeroesComponent Constructor');
  }
  ngOnInit() {
    console.log('HeroesComponent ngOnInit');
    this.getHeroes();
  }
  ngOnChanges() {
    console.log('HeroesComponent ngOnChanges');
  }
  // onSelect(hero: Hero){
  //   this.selectedHero = hero;
  // }
  getHeroes(): void{
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(response => this.heroes = response);
  }

  addHero(name: string): void{
    this.heroService.addHero({name} as Hero).subscribe(response => this.heroes.push(response));
  }

  deleteHero(hero: Hero): void{
    this.heroService.deleteHero(hero).subscribe(response => {
      if(response == true){
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    });
  }

}
