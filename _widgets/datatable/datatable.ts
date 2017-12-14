import {Component, ElementRef, IterableDiffers, Input, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.html',
  styleUrls: ['./datatable.css']
})
export class DatatableComponent implements DoCheck, OnDestroy, OnInit {

  @Input() data: Array<any>;
  @Input() structure: Array<any>;
  @Input() buttons: Array<any> = null;
  @Input() columnDefs: Array<any> = [];
  @Input() footer: boolean = false;
  @Input() header: boolean = true;
  @Input() info: boolean = true;
  @Input() ordering: boolean = true;
  @Input() paging: boolean = true;
  @Input() parent_scope: any;
  /**
   * [dragulaFunctions permet de s'enregistrer sur les fonctions dragula]
   * Exemple: { dropModel: (val) => {}, over: (val) => {}, out: (val) => {}, }
   * @return {[type]} [description]
   */
  @Input() dragulaFunctions: any = null;
  /**
   * [dragulaBag permet de définir le nom du bag, important si 2 datatable sont sur la même page]
   * @return {[type]} [description]
   */
  @Input() dragulaBag: string = 'bag-datatable';

  private table_elem: JQuery;
  private table: DataTables.DataTable;
  private language: any = {
    'sProcessing':     'Traitement en cours...',
    'sSearch':         'Rechercher&nbsp;:',
    'sLengthMenu':     'Afficher _MENU_ &eacute;l&eacute;ments',
    'sInfo':           'Affichage de l\'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments',
    'sInfoEmpty':      'Affichage de l\'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment',
    'sInfoFiltered':   '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
    'sInfoPostFix':    '',
    'sLoadingRecords': 'Chargement en cours...',
    'sZeroRecords':    'Aucun &eacute;l&eacute;ment &agrave; afficher',
    'sEmptyTable':     'Aucune donn&eacute;e disponible dans le tableau',
    'oPaginate': {
      'sFirst':      'Premier',
      'sPrevious':   'Pr&eacute;c&eacute;dent',
      'sNext':       'Suivant',
      'sLast':       'Dernier'
    },
    'oAria': {
      'sSortAscending':  ': activer pour trier la colonne par ordre croissant',
      'sSortDescending': ': activer pour trier la colonne par ordre d&eacute;croissant'
    }
  };

  private differ: any;
  private subscriptions: Array<any> = [];


  constructor(
      private _element: ElementRef,
      private differs: IterableDiffers,
      private _sanitizer: DomSanitizer,
      private _dragulaService: DragulaService
  ) {
    this.differ = differs.find([]).create(null);
  }

  public ngOnInit() {

    if (
      // si le bag n'existe pas encore (donc uniquement la premiere fois)
      !this._dragulaService.find(this.dragulaBag)
      // si des fonctions de dragNDrop sont envoyé
      && this.dragulaFunctions ) {
        console.log('Enregistrement des fonctions de drag', this.dragulaFunctions);
        let sub = null;
        // Pour chaque fonction dragula donné en input, on s'enregistre
        Object.keys(this.dragulaFunctions).forEach( (functionName) => {
          sub = this._dragulaService[functionName].subscribe((value) => {
              this.dragulaFunctions[functionName].apply(this.parent_scope, [value]);
          });
          this.subscriptions.push(sub);
        });
   }

  }

  /*
   * JQDestroy: paramètre pour utiliser la destuction Jquery en plus de la destruction de la table
   * (à mettre à true uniquemenb pour le NgOnDestroy )
   */
  public destroyTable(JQdestroy: boolean = false) {
    if (typeof this.table !== 'undefined') {
      this.table.destroy(JQdestroy);
    }
  }

  public buildTable() {
    this.table_elem = jQuery(this._element.nativeElement).find('table');
    let datatableConfig = {
      language: this.language,
      paging: this.paging,
      ordering: this.ordering,
      info: this.info,
      initComplete: (settings, json) => {
        jQuery(this._element.nativeElement).find('.dataTables_paginate li').addClass('page-item');
        jQuery(this._element.nativeElement).find('.dataTables_paginate li a').addClass('page-link');
      }
    };

    if (this.buttons) {
      datatableConfig['columnDefs'] = [
        {orderable: false, targets: this.structure.length}
      ];
    }

    this.table = this.table_elem.DataTable(datatableConfig);

    /** On surveille le dom pour ne pas perdre les classes bootstrap4*/
    if (document.querySelector('.dataTables_paginate') != null) {
      let mut = new MutationObserver((mutations, muta) => {
        jQuery(this._element.nativeElement).find('.dataTables_paginate li').addClass('page-item');
        jQuery(this._element.nativeElement).find('.dataTables_paginate li a').addClass('page-link');
      });

      mut.observe(document.querySelector('.dataTables_paginate'), {
        subtree: true,
        childList: true
      });
    }

  }

  public ngOnDestroy() {
    // Speak now or forever hold your peace
    this.destroyTable(true);

    if (this._dragulaService.find(this.dragulaBag)) {
        this._dragulaService.destroy(this.dragulaBag);
    }

    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });

  }

  // Custom change detection
  public ngDoCheck() {
    // (la vraie donnée à vérifier est ici, on liste donc les inputs)
    let changes = this.differ.diff(this.data);
    // si un changement est detecté
    if (changes) {
      let init = () => {
        this.destroyTable();
        // on ne reconstruit le tableau que aprés le destroy complet, et comme le datatable n'a pas de callback...
        // on bricole avec setTimeout qui sert de yield()
        // yield() pour attendre la fin de la desctruction
        setTimeout(() => {
          // yield() pour attendre la fin de la reconstruction du dom a partir de real_data
          setTimeout(() => {
            this.buildTable();
          }, 1);
        }, 1);
      };
      // on attend le chargement des plugins pour faire cette construction
      init();
    }
  }

  public getValue(ligne, id: string, html: boolean = false) {
    try {
      let res = '';
      if (id.indexOf('.') === -1) {
        res = ligne[id];
      } else {
        res = ligne;
        id.split('.').forEach((value) => {
          res = res[value];
        });
      }

      if (html) {
        return this.sanitizeHtml(res);
      } else {
        return res;
      }

    } catch (e) {
      return '-- valeur introuvable --';
    }
  }

  /**
   * On rends le html safe pour l'affichage sinon certaines balises (button par ex) ne passent pas.
   * @param html
   * @returns {SafeHtml}
   */
  private sanitizeHtml(html): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
