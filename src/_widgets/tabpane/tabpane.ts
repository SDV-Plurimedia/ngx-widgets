/**
 * Angular / Core
 */
import {
  Component,
  Input,
  ContentChildren,
  AfterContentInit,
  QueryList
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**
 * Components
 */
import { TabComponent } from './tab';

/**
 * Le composant qui gère une liste d'onglet et leur contenus
 */
@Component({
  selector: 'tabpane',
  templateUrl: './tabpane.html',
  styleUrls: ['./tabpane.css']
})
export class TabpaneComponent implements AfterContentInit {
  /**
   * Applique ou non une classe css à ce composant
   */
  @Input() panel_mode: boolean = false;
  /**
   * Récupération de la totalité des composants TabComponent descendants
   * (composants directes & indirects)
   */
  @ContentChildren(TabComponent, { descendants: true })
  tabs: QueryList<TabComponent>;
  /**
   * Récupération des composants TabComponent directes
   */
  @ContentChildren(TabComponent, { descendants: false })
  directTabs: QueryList<TabComponent>;
  /**
   * La liste des descendants directes du composant
   */
  private _directChild: TabComponent[] = [];
  /**
   * La subscription aux descendants directes du composant
   */
  private _subDirectTabs: Subscription = null;
  /**
   * La subscription aux descendants indirects du composant
   */
  private _subTabs: Subscription = null;
  /**
   * L'identifiant supposé unique du composant
   */
  private _rand: number | string = null;

  constructor() {
    /**
     * Création d'un flag random (supposé unique) qui nous permet d'identifier les
     * composants descendants directes
     */
    this._rand = Math.random();
  }

  /**
   * Lifecycle Hook AfterContentInit
   */
  ngAfterContentInit() {
    // Premier des composants descendants lors du premier chargement
    this._calcDirectChild();
    // on recalcul a chaque changement des enfants, si on s'est pas encore inscrit sur cette querylist
    if (this.directTabs) {
      if (
        typeof this.directTabs.changes['observers'] === 'undefined' ||
        this.directTabs.changes['observers'].length === 0
      ) {
        // si un autre querylist étais déjà entrain d'etre écouté
        if (this._subDirectTabs) {
          this._subDirectTabs.unsubscribe();
        }
        this._subDirectTabs = this.directTabs.changes.subscribe(() =>
          this._calcDirectChild()
        );
      }
    }
    if (this.tabs) {
      if (
        typeof this.tabs.changes['observers'] === 'undefined' ||
        this.tabs.changes['observers'].length === 0
      ) {
        if (this._subTabs) {
          this._subTabs.unsubscribe();
        }
        this._subTabs = this.tabs.changes.subscribe(() =>
          this._calcDirectChild()
        );
      }
    }
  }

  /**
   * Rend un onglet actif
   * @param tab L'onglet à rendre actif
   */
  public setActiveTab(tab: TabComponent) {
    this.tabs.forEach((t: TabComponent) => (t.active = false));
    tab.active = true;
  }

  /**
   * Calcul et renseigne les id des enfants direct du tabpane en cours de traitement
   */
  private _calcDirectChild() {
    /**
     * On utilise un setTimeout pour que le dom soit à jours
     * (résoud le problème de doCheck)
     */
    setTimeout(() => {
      // On marque tous les enfants direct avec ce flag
      this.directTabs.forEach(
        (tab: TabComponent) => (tab.parentRandId = this._rand)
      );
      if (this.tabs && this.tabs.length) {
        // Puis on selectionne tous les efants qui ont ce flag, ou qui n'en ont pas
        this._directChild = this.tabs.filter((tab: TabComponent) => {
          return tab.parentRandId === null || tab.parentRandId === this._rand;
        });
        // Comme le AfterContentInit bubble depuis les enfants, les enfants auront déjà flagué leur propres enfants directes
        // puis on marque même les enfants indirect (pour ne pas les chopper aussi dans un parent)
        this._directChild.forEach(
          (tab: TabComponent) => (tab.parentRandId = this._rand)
        );
        this._setDefaultTab();
      }
    }, 1);
  }

  private _setDefaultTab() {
    let activeTabSet: boolean = false;
    this._directChild.forEach((tab: TabComponent) => {
      if (tab.active === true) {
        this.setActiveTab(tab);
        activeTabSet = true;
      }
    });
    if (activeTabSet === false && this._directChild.length > 0) {
      this.setActiveTab(this._directChild[0]);
    }
  }
}
