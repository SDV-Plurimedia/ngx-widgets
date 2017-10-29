import {Component, ElementRef, IterableDiffers, Input, DoCheck, OnDestroy} from '@angular/core';
import { LoaderService } from '../../_services/loader';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.html',
  styleUrls: ['./datatable.css']
})
export class DatatableComponent implements DoCheck, OnDestroy {

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

  constructor(
    private _element: ElementRef,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
  }

  /*
   * JQDestroy: paramètre pour utiliser la destuction Jquery en plus de la destruction de la table
   * (à mettre à true uniquemenb pour le NgOnDestroy )
   */
  destroyTable(JQdestroy: boolean = false) {
    if (typeof this.table !== 'undefined') {
      this.table.destroy(JQdestroy);
    }
  }

  buildTable() {
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

  ngOnDestroy() {
    // Speak now or forever hold your peace
    this.destroyTable(true);
  }

  // Custom change detection
  ngDoCheck() {
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

  getValue(ligne, id: string) {
    try {
      if (id.indexOf('.') === -1) {
        return ligne[id];
      } else {
        let res = ligne;
        id.split('.').forEach((value) => {
          res = res[value];
        });
        return res;
      }
    } catch (e) {
      return '-- valeur introuvable --';
    }
  }
}
