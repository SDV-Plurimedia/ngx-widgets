import {Component, EventEmitter} from '@angular/core';
import {Subject, Observable} from 'rxjs/Rx';
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { HttpL5Service } from "../../../_core/_services/http/http-l5";

declare var GLOBAL_CONFIG;

@Component({
  selector: 'ibp-search',
  templateUrl: './ibp-search.html',
  styleUrls: ['./ibp-search.css'],
  inputs : ['search_panel'],
  outputs: ['search_panelChange', 'ibpSelection']
})

export class IbpSearchComponent {

  public images = [];

  //Control du sujet.
  public searchTermControl: FormControl;
  //Images ibp séléctionnées.
  public selectedImages = [];

  //Panel de listing des résultats de recherche.
  public search_panel: boolean;
  public search_panelChange = new EventEmitter();

  //Soumission du formulaire.
  public ibpSelection = new EventEmitter();

  //Chaine observable (sujet de la recherche).
  private searchTermStream = new Subject<string>();


  constructor(private _httpL5Service: HttpL5Service) {
    this.searchTermControl = new FormControl('');
    //On souscrit aux changements de valeur de controleur de sujet de recherche.
    this.searchTermControl.valueChanges.subscribe((subject: string) => {
    this.searchTermStream.next(subject);
    });
  }

  /**
   * Permet d'obtenir une temporisation sur la saisie afin de ne pas requêter à
   * chaque lettre saisie.
   */
  items: Observable<string[]> = this.searchTermStream
    .debounceTime(400) //Temporisation en millisecondes.
    .distinctUntilChanged()
    .switchMap((subject: string) => {
      this.searchTermStream.next(subject);
      //Execution de la requete Elasticsearch.
      this.onTheFySearch(subject);
      return [];
    });

  ngOnInit() {
  }
   ngOnChanges(changes) {
     if (this.search_panel){
        console.log('ibp ')
      this._httpL5Service.getCached('/pulse/ibp-search?proxyUrl=search/images').subscribe((data) => {
        if (data.images) {
          this.images = data.images.map((image) => {
            image.src = GLOBAL_CONFIG['ibp_url'] + 'images/view/' + image.id + '/ibp_square';
            return image;
          });
        }
      });
      this.items.subscribe();
     }
      this.search_panelChange.emit(this.search_panel);
   }

   onSubmit(){
     this.ibpSelection.emit(this.selectedImages);
     this.toggleSearchPanel();
   }

   onChange(is_checked: boolean, img: any) {
     //Image cochée.
     if (is_checked) {
       this.selectedImages.push(img.id);
     }
     //Image décochée.
     else {
       let index = this.selectedImages.indexOf(img.id);
       this.selectedImages.splice(index, 1);
     }
   }

  /**
  * Recherche à la volée.
  */
  onTheFySearch(subject: string): void {
    this._httpL5Service.getCached('/pulse/ibp-search?proxyUrl=search/images&term=' + subject).subscribe((data) => {
        if (data.images) {
        this.images = data.images.map((image) => {
          image.src = GLOBAL_CONFIG['ibp_url'] + 'images/view/' + image.id + '/ibp_square';
          return image;
        });
      }
    });
  }

   /**
   * Affichage ou non du panel de listing des résultats de recherche.
   */
  toggleSearchPanel() {

    //Fermeture du panel.
    this.search_panel = !this.search_panel;
    this.search_panelChange.emit(this.search_panel);
    if (!this.search_panel){
      this.searchTermControl.setValue('');
    }
    }

}
