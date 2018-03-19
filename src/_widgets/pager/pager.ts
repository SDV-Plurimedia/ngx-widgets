import {Component, Input, OnInit, OnChanges} from '@angular/core';


/** Objet de type Pager. */
export class Pager {

  // Attributs internes.
  private _from: number;
  private _pages: number;
  private _to: number;

  // private _current: number = 1;
  private _interval: Array<number> = [];

  /**
  * Instanciation de l'objet Pager.
  * @param _scope - Scope du composant instanciateur (this).
  * @param _quantity - Nombre d'éléments à paginer.
  * @param _perPage - Nombre d'éléments à afficher par page.
  * @param _delta - Nombre de page à afficher en accès direct.
  * @param _actionCallback - Méthode que devra implémenter le
  * composant invoquant le pager.
  * @param _current - La page courante
  */
  constructor(private _scope: any,
    private _quantity: number,
    private _perPage: number = 10,
    private _delta: number = 5,
    private _actionCallback:  (from: number, to: number) => void,
    private _current: number = 1) {
      this._setPages();
      this._setInterval();
    }

    /** Retourne la page courante. */
    getCurrent() {
      return this._current;
    }

    /** Liste des boutons de page à acces direct (spécifié via delta).*/
    getInterval() {
      return this._interval;
    }

    /** Nombre total de pages. */
    getPages() {
      return this._pages;
    }

    /** Calcul du nombre nécessaire de pages. */
    private _setPages() {
      this._pages = Math.ceil(this._quantity / this._perPage);
    }

    /**
    * Calcul de l'intervalle de la liste des pages du genre:
    * [<][3][4][5][6][>]
    */
    private _setInterval() {
      this._interval = [];
      // Il est nécessaire de ségmenter les pages.
      if (this._pages >= this._delta) {
        let median = Math.ceil(this._delta / 2 );
        let d0 = this._delta - median;

        if (this._current >= median) {
          // Fin d'intervalle.
          if (this._current >= this._pages - d0) {
            for (let i = this._pages - this._delta + 1; i <= this._pages; i++) {
              this._interval.push(i);
            }
          } else if (this._current - d0 === 0) {
            // tout début d'intervalle.
            for (let i = this._current; i < this._current + this._delta; i++) {
              this._interval.push(i - d0 + 1);
            }
          } else {
            // Milieu d'intervalle.
            for (let i = this._current; i < this._current + this._delta; i++) {
              this._interval.push(i - d0);
            }
          }
        } else {
          // Début d'intervalle.
          for (let i = 1; i <= this._delta; i++) {
            this._interval.push(i);
          }
        }
      } else {
        // On peut tout afficher.
        for (let i = 1; i <= this._pages; i++) {
         this._interval.push(i);
        }
      }
    }

    isCurrentPage(p: number) {
      return this._current === p;
    }

    isFirstPage() {
      return this._current === 1;
    }

    isLastPage() {
      return this._current === this._pages;
    }

    /** Mise à jour des attributs du pager pour une page donnée. */
    goToPage(p: number) {
      this._current = p;
      this._setInterval();
      this.elementsToShow();
    }

    /** Renvoie l'intervalle d'éléments à afficher (à ne pas confondre avec
    l'intervalle des pages delta). */
    elementsToShow() {
      if (this._current === 1) {
        this._from = 0;
      } else {
        this._from = (this._current - 1) * this._perPage;
      }
      this._to = this._from + this._perPage - 1;
      this._actionCallback.apply(this._scope, [this._from, this._to]);
    }
  }


@Component({
  selector: 'pager',
  templateUrl: './pager.html',
  styleUrls: ['./pager.css']
})

export class PagerComponent implements OnInit, OnChanges {

  @Input() pager: Pager;

  public pageInterval: Array<any>;
  public currentPage: number;
  public nbPage: number;

  constructor() {}

  ngOnInit() {
    this.pager.elementsToShow();
    this._setAttributes();
  }
  ngOnChanges(changes) {
    if (changes.pager) {
      this.pager = changes.pager.currentValue;
      if (changes.pager.previousValue) {
        this.goToPage(1);
      } else {
        this.goToPage(this.pager.getCurrent());
      }
    }
  }

  isCurrentPage(p: number) {
    return this.pager.isCurrentPage(p);
  }

  isFirstPage() {
    return this.pager.isFirstPage();
  }

  isLastPage() {
    return this.pager.isLastPage();
  }

  goToPage(p: number) {
    this.pager.goToPage(p);
    this._setAttributes();
  }

  private _setAttributes() {
    this.pageInterval = this.pager.getInterval();
    this.currentPage = this.pager.getCurrent();
    this.nbPage = this.pager.getPages();
  }
}
