import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Test des composants pour Ng2-Widgets!';
  private prenoms_liste = [{label: 'Antoine', value: 'antoine'},{label: 'Jean-Philippe', value: 'jp'}];
  private prenoms = [];


  public afficheBootbox( msg ) {
    alert(msg);
  }

  public valider(add){
    console.log('ajout',add);
    this.prenoms.push(add);//ici selon le cas on peut aussi gérer de la déduplication par exemple
  }

  public creer(str){
    console.log('creation',str);
    let nouveau_prenom = {
      label: str,
      value: str.toLowerCase()
    };
    this.prenoms_liste.push(nouveau_prenom);
    this.valider(nouveau_prenom);
  }

}
