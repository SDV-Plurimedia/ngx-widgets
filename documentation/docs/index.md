**SDV** Ng2 Widget est un pack de widget adapté pour bootstrap en angular2

Les widgets génériques sont définis dans le paquet [sdv-ng2-widgets](https://gitlab.sdv.fr/rnd/sdv-ng2-widgets)

# Autocomplete

![Champ d'autocomplete](./img/autocomplete.png)

Le composant d'autocomplete doit être appelé de la façon suivante:

    <autocomplete [config]='...' [data]='...' (valid)="function($event)"></autocomplete>

* **[data]**: *Array* - tableau contenant les données à traiter par l'autocomplete
* **[config]**: *Object* - permet la config du widget, doit contenir:
    * **fieldName**: *String|Array* - nom du ou des attributs du tableau *data* qui sont utilisés à l'affichage dans le champ
    * **fieldValue**: *String* - nom de l'attribut du tableau *data* qui fait office de valeur de retour par le widget (si vide, on renvoi l'objet complet)
    * **fieldInsert**: *String* - nom de l'attribut du tableau *data* à insérer dans le champ après un clic sur l'un des résultats de l'autocomplete
    * **begin**: *Number* - nombre de caractères à entrer dans le champ avant que l'autocomplete ne se lance
    * **defaultValue**: *String* - valeur par défaut à insérer dans l'input d'autocompletion
    * **placeholder**: *String* - Placeholder du champ
* **(valid)**: *Function* - fonction appelée lorsque le champ est valide

# Bloc-Card

Bloc de contenu sous forme de carte

![Bloc Card](./img/bloccard.png)

    <bloc-card class="col-lg-4" [data]="{type:'divers', title:'Titre de mon paragraphe', content:'Ici on peut raconter plein de chose'}"></bloc-card>

* **title**: pour changer le titre du bloc
* **content**: pour changer le contenu du bloc
* **type**: peut prendre la valeur: paragraphe, image, divers, autre2, autre3 (ceci le fera changer de couleur)

# BreadCrumb ( Fil d'ariane )

Ce widget ne doit s'intégrer qu'une fois dans la page.
Pour son utilisation voir à travers le service [BreadCrumb](#breadcrumb-fil-dariane_1)

# Button 3D

Permet de faire des boutons poussoir en 3d

![Bouton 3D](./img/button3d.png)

Utilisation :

    <button3d [icon]="'check'" [class]="'success'" [size]="'btn-sm'" (click)="afficheBootbox('alert')" > Valider</button3d>
    <button3d [icon]="'code-fork'" [class]="'danger'" (click)="afficheBootbox('alert')" > Pousser en prod</button3d>
    <button3d [icon]="'cloud'" [class]="'primary'" [size]="'btn-lg'" (click)="afficheBootbox('alert')" > Envoyer dans le cloud</button3d>

# Chevron

Le widget chevron permet de cacher facilement le contenu d'un bloc

![Chevron](./img/chevron.png)

* **hidden** : Input/Ouput: Etat ouvert/fermé du bloc lié (boolean)

Exemple1: Utilisation avec une var locale et le display hidden (caché par la css) :

    <h3>
      <chevron [(hidden)]='contenu.hidden' class="pull-right"></chevron>
      Titre
    </h3>
    <div #contenu>
      Mon contenu a cacher
    </div>

Exemple2: Utilisation avec une var typescript et ngIf (caché par le dom/js):

`public mavar: boolean = false;`

    <h3>
      <chevron [(hidden)]='mavar' class="pull-right"></chevron>
      Titre
    </h3>
    <div *ngIf='mavar'>
      Mon contenu à cacher
    </div>

# CKEditor

Le widget ckeditor permet d'intégrer l'éditeur de texte simplement.

![CKEditor](./img/ckeditor.png)

Utilisation :

    <ckeditor [(content)]="article.chapeau" [id]="'chapeau_text'"
              [rows]="4" [disabled]="false" [config]="config1"></ckeditor>

* **content** : Le texte contenu par l'éditeur, lié dans les deux sens afin de  mettre à jour automatiquement la variable dans le composant appelant
* **id**: Un identifiant unique pour l'éditeur.
* **row**: Permet de définir la hauteur de l'éditeur.
* **disabled**: Si il est à true, le ckeditor est remplacé par une div affichant juste le contenu.
                S'il est passé à false par la suite, le ckeditor apparaitra.
* **config**: La configuration de l'éditeur (choix des actions possibles ou non).

Exemple de conf, voir le fichier site/bo_spa/src/app/article/edit/edit.ts

# Corner button

A documenter

# Datatable

![DataTable](./img/datatable.png)

Exemple de template:

    <loader [condition]="data_tab">
      <datatable [data]="data_tab" [structure]="structure" [buttons]="buttons" [parent_scope]="scope"></datatable>
    </loader>`

Exemple de component:

    public structure = [
        { id: "id", label: "ID"},
        { id: "name", label: "Nom du champ"}
    ];

    public buttons = [
      {
          text: 'Editer',
          action: this.edit,
          class: "btn btn-warning"
      },
      {
          text: 'Supprimer',
          action: this.confirmDelete,
          class: "btn btn-danger"
      }
    ];
    //scope sur lequel appliquer les fonctions des boutons
    public scope = this;

    //un exemple de données
    public data_tab = [{id: 1, name: "Antoine"}];

# DatePicker

Ce widget permet d'afficher un champ de texte qui fait apparaître un calendrier.

![DatePicker](./img/datepicker.png)

Utilisation :

    <datepicker [(ngModel)]="date_publi" view-format="DD/MM/YYYY" model-format="YYYY-MM-DD"
                first-week-day-sunday="false"></datepicker>

* **ngModel**: La valeur de le date.
* **view-format**: Le format de date tel qu'il sera affiché dans le champ de texte.
* **model-format**: Le format de la date tel qu'il est dans la variable.
* **first-week-day-sunday**: Un booléen permettant de préciser pour l'affichage du calendrier si les semaines doivent commencer le dimanche (true) ou le lundi (false).

# DropDown

A documenter

# Graph

A documenter

# Hierarchie List

Ce widget permet de faire une hierarchisation d'éléments en plusieurs volets qui s'ouvrent l'un à côté de l'autre.

Utilisation:

`<hierarchie-list #treeview [datas]="current_topics" [params]="params" ></hierarchie-list>`

![HierarchieList](./img/hierarchielist.png)

* **datas** sont les données à mettre en forme dans le widget
* **params** sert à configurer l'arbre :
    * **name_column**: le nom de l'attribut qui sera affiché
    * **primary_key**: l'attribut servant d'identifiant
    * **root_id**: l'identifiant de l'élément servant de racine à l'arbre
    * **scope**: Le contexte d'appel pour les fonctions utilisées dans les boutons et checkboxes
    * **buttons**: un tableau de boutons affichés pour chaque élément de l'arbre
        * **class**: Les classes à affecter au bouton
        * **text**: Le texte (ou html) qui sera affiché dans le bouton
        * **action**: L'action à effectuer au clic sur le bouton

# Loader

Le widget loader permet de cacher facilement le contenu d'un bloc durant son chargement

![Loader](./img/loader.png)

* **condition** : condition d'affichage de la roue de chargement, quand la condition est vrai on affiche le ng-content,mais tant que la condition est false on affiche le loader
* **type** : Facultatif, Type de template d'affichage pour le widget, de base est une div, mais peut etre de type **list** ou **panel**

Exemple:

    <loader [condition]="!ready" [type]="'panel'">
      Mon Contenu
    </loader>

# Menu interne

Ce widget permet d'ajouter un second niveau de navigation, à l'intérieur d'un widge de page.

![Menu Interne](./img/menu_interne.png)

Il se définit en lui fournissant au moins une liste d'item, exemple:
```
    import {MenuItem, MenuItemBadge} from "sdv-ng2-widgets";
    ...
    private menu_items = [
      new MenuItem({
        icon: "inbox",
        title: "Inbox",
        badge: new MenuItemBadge({
          class: "success",
          number: 19
        })
      }),
      new MenuItem({
        icon: "star",
        title: "Starred",
        badge: new MenuItemBadge({
          class: "warning",
          number: 2
        })
      }),
      new MenuItem({
        icon: "star",
        title: "More",
        subitems: [
          new MenuItem({
            title: "Spam",
            badge: new MenuItemBadge({
              class: "warning",
              number: 2
            })
          }),
          new MenuItem({
            title: "Trash"
          })
        ]
      })
    ];
```
et dans la template:
```
    <menu_interne
      [items]="menu_items"
      [title]="'Gestion Multi-Média'"
      (select)="menuClick($event)"
      [icon]="'plus'"
      [tooltip]="'Exporter vers un media'"
      (button)="newMedia($event)"
      (toggle)="menuToggle($event)">
    </menu_interne>
```

* **[items]**: *Array<MenuItem>* - Une entrée du tableau correspond à un element de la liste, on peut y ajouter des 'subitems' pour un niveau supplémentaire
* **[title]**: *string* - Titre du menu
* **(select)**: *EventEmitter<MenuItem>* - renvoie l'item selectionné lors d'un clic
* **[icon]**: *string* - classe d'icône du bouton de droite
* **[tooltip]**: *string* - texte au survol du bouton de droite
* **(button)**: *EventEmitter<boolean>* - renvoie true lors d'un click sur le bouton de droite
* **(toggle)**: *EventEmitter<boolean>* - renvoie l'état (true= ouvert, false= fermé) du menu lorsqu'on le ferme/ouvre

# Pager

Utilisation:
`<pager [pager]="pager"></pager>`

* **pager**: L'objet contenant la configuration du pager a appelé en utilisant le constructeur du Pager
    * **scope**: Le contexte d'appel du pager
    * **quantity**: Le nombre d'éléments total
    * **per_page**: Le nombre d'éléments par page
    * **delta**: Le nombre de boutons de numéros de page affichés
    * **actionCallback**: La fonction à appeler au clic sur  un des boutons du pager

# Progress Bar

Permet d'afficher facilement une barre de progression qui change de couleur en fonction du taux d'avancement

Utilisation:

      <progress-bar [datas]="{
            value : article.avancement,
            min_value : 0,
            max_value : 100
        }" [class]="'progress-bar-striped'" class="col-md-8 control-label"></progress-bar>

* **datas**: Un objet comprenant la valeur de la progress-bar, ainsi que ses valeurs minimum et maximum
* **class**: Des classes particulières à ajouter à la progress-bar

# Status Bar

Permet de faire une notification de status ressemblant à growl

![Status bar](./img/status-bar.png)

Utilisation :

    <status-bar [icon]="'refresh'" > Mise à jour disponible </status-bar>
    <status-bar [icon]="'folder-open-o'" [class]="'info'" > Mise à jour disponible </status-bar>
    <status-bar [icon]="'warning'" [class]="'warning'" > Mise à jour importante disponible </status-bar>
    <status-bar [icon]="'warning'" [class]="'danger'" > Mise à jour critique disponible </status-bar>

# Switch

A documenter

# TabPane ( Onglets )

![Onglets](./img/tabpane.png)

Le composant doit figurer dans le template  de la façon suivante :

     <tabpane>
         <tab [tabtitle]="...">
           <mon-autre-component></mon-autre-component>
         </tab>
         <tab [tabtitle]="...">
           code html
         </tab>
     </tabpane>

 * **tabpane** sert à encadrer la liste des onglets qui seront regroupés
 * **tab** sert à définir un onglet en particulier
    * **[tabtitle]** est le titre que portera l'onglet
    * Chaque balise tab peut contenir du html ou des composants Angular

# Touch Button

Permet de créer un bouton flottant de style "polymere", contenant plusieurs autres boutons

![TouchButton__](./img/touch-button.png)

Utilisation:
```<touch-button>
<tb-link [icon]="'phone'" (tbclick)="notif('phone')"></tb-link>
<tb-link [icon]="'envelope-o'" (tbclick)="notif('envelope-o')"></tb-link>
<tb-link [icon]="'pencil'" (tbclick)="notif('pencil')"></tb-link>
</touch-button>```


# Treeview

Le treeview permet d'avoir un vue hierarchique d'élement sous forme d'arbre dépliable.

Utilisation:
`<treeview [datas]="menu" [params]="params"></treeview>`

* **datas** sont les données à mettre en forme dans l'arbre
* **params** sert à configurer l'arbre :
    * **name_column**: le nom de l'attribut qui sera affiché
    * **primary_key**: l'attribut servant d'identifiant
    * **root_id**: l'identifiant de l'élément servant de racine à l'arbre
    * **scope**: Le contexte d'appel pour les fonctions utilisées dans les boutons et checkboxes
    * **buttons**: un tableau de boutons affichés pour chaque élément de l'arbre
    * **checkbox**: un objet permettant de configurer une checkbox devant chaque élément de l'arbre :
        * **column_value**: La valeur utilisée pour la checkbox
        * **checked**: un liste d'identifiant d'éléments déjà cochés
        * **action_on_change**: une fonction à appeler quand on coche ou décoche une checkbox
        * **action_validate**: une fonction à appeler quand on valide les cases cochées

# Wizard

  a documenter
