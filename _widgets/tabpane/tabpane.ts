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
   * @type {boolean}
   */
  @Input() panel_mode: boolean = false;
  /**
   * Récupération de la totalité des composants TabComponent descendants
   * (composants directes & indirects)
   * @type {QueryList<TabComponent>}
   */
  @ContentChildren(TabComponent, { descendants: true })
  tabs: QueryList<TabComponent>;
  /**
   * Récupération des composants TabComponent directes
   * @type {QueryList<TabComponent}
   */
  @ContentChildren(TabComponent, { descendants: false })
  directTabs: QueryList<TabComponent>;
  /**
   * La liste des descendants directes du composant
   * @type {TabComponent[]}
   */
  private _directChild: TabComponent[] = [];
  /**
   * La subscription aux descendants directes du composant
   * @type {Subscription}
   */
  private _subDirectTabs: Subscription = null;
  /**
   * La subscription aux descendants indirects du composant
   * @type {Subscription}
   */
  private _subTabs: Subscription = null;
  /**
   * L'identifiant supposé unique du composant
   * @type {number | string}
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

    if (this.directTabs) {
      if (
        typeof this.directTabs.changes['observers'] === 'undefined' ||
        this.directTabs.changes['observers'].length === 0
      ) {
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
   * @param {TabComponent} tab L'onglet à rendre actif
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
      this.directTabs.forEach(
        (tab: TabComponent) => (tab.parentRandId = this._rand)
      );
      if (this.tabs && this.tabs.length) {
        this._directChild = this.tabs.filter((tab: TabComponent) => {
          return tab.parentRandId === null || tab.parentRandId === this._rand;
        });

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
