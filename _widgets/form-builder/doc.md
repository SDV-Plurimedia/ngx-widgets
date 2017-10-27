# FormBuilder
Ce widget permet à l'aide d'un tableau d'objet de créer un formulaire sur une page avec ou sans onglet.

Les types de champs pris en compte sont les suivants :
 * **[autocomplete](#autocomplete)** 
 * **[checkbox](#checkboxes)**
 * **[checkboxes](#checkboxes)**
 * **[ckeditor](#ckeditor)**
 * **[datepicker](#datepicker)**
 * **[email](#email)**
 * **[number](#number)**
 * **[radios](#radios)**
 * **[select](#select)**
 * **[text](#text)**
 * **[textarea](#textarea)**
 * **[url](#url)**
 
De base, chacun de ces champs bénéficie d'une méthode de validité par défaut qui vérifie si le champ est valide ainsi que
d'un message d'erreur correspondant. Il est néanmoins possible de surcharger ces méthodes de vérifications et messages d'erreurs.
Le bouton servant à la sauvegarde du formulaire est en disabled tant qu'au moins un champ est encore invalid.
 
## Configuration
    
### A) Formulaire
    
    <form-builder [(fields)]="fields"
                  [scope]="scope"
                  [(model)]="agence"
                  [type]="'tabs'"
                  (cancel)="cancel()"
                  [saveLabel]="'Sauvegarder'"
                  [cancelLabel]="'Retour'"
                  (save)="save()"
    >
    </form-builder>
    
 * **scope** est le composant dans lequel est contenu le form-builder
 * **type** est le type de formulaire soit **classic (par défaut)** soit **tabs** (sous forme d'onglet)
 * **cancel** est la méthode de callback à appeller lors du clic sur le bouton "Annuler"
 * **save** est la méthode de callback à appeller lors du clic sur le bouton "Enregistrer"
 * **model** est l'objet qui va être édité/crée
 * **saveLabel** est le label du bouton pour la sauvegarde (par défaut vaut "Enregistrer"
 * **cancelLabel** est le label du bouton pour annuler (par défaut vaut "Annuler")
 * **fields** est soit un objet (cas du formulaire **classic**) soit un tableau d'objet (cas du formulaire **tabs**, voir I)B)1 et I)B)2)

### B) Fields
  
Dans les deux cas ci-dessous, **id_field** correspond à l'identifiant du champ ainsi que le nom de la propriété du model.
Si **id_field** n'existe pas un log d'erreur sera présent dans la console.
  
#### 1) Cas du formulaire "classic"
  
      public fields = {
        id_field: {configuration_field},
        id_field2: {configuration_field2}
      };
    
#### 2) Cas du formulaire "tabs"
  
      public fields = [
        {
          title: 'Le titre de mon onglet 1'
          fields: {
            id_field: {configuration_field},
            id_field2: {configuration_field2}
          }
        },
        {
          title: 'Le titre de mon onglet 2'
          fields: {
            id_field3: {configuration_field3},
            id_field4: {configuration_field4}
          }
        }
      ];

#### 3) Field
##### a) Configuration générale

 * **label** - **string** - le label du champ
 * **required** - **boolean** - **default = false** / si le champ est requis
 * **type** - **string** - **default = 'text'** / le type du champ
 * **pattern** - **string** - une regex à appliquer sur le champ (par exemple [0-9][0-9][0-9][0-9])
 * **error_message** - **string** - un message d'erreur à afficher
 * **placeholder** - **string** - le placeholder du champ
 * **readonly** - **boolean** - **default = false** - si le champ est en readonly
 * **verifyFunction** - **any** - Une fonction de callback servant à vérifier soi même le champ (doit renvoyer **true** si le champ est correct et **false** si il est incorrect)
 * **hiddenFunction** - **any** - Une fonction de callback servant à afficher/cacher un champ (doit renvoyer **true** pour le cacher et **false** pour l'afficher)
 * **disabledFunction** - **any** - Une fonction de callback servant à passer un champ en disabled (doit renvoyer **true** pour le passer en disabled et **false** pour le remettre en état "normal")
 * **input_container_class** - **string** - **default = 'col-md-8'** - La classe CSS du conteneur du champ
 * **input_class** - **string** - **default = 'form-control'** - La classe CSS appliquer sur le champ
 * **label_class** - **string** - **default = 'col-md-2 control-label'** - La classe CSS à appliquer sur le label du champ
  
Les méthodes de callback peuvent prendre en paramètre un objet Field (contenant toutes les informations du champ). Il est possible de modifier ce dernier et donc
par exemple de changer son message d'erreur à la volée.
  
##### b) Configuration spécifique
Selon le type de champ spécifié, différents paramètres peuvent être ajouté aux paramètres généraux.
  
###### Autocomplete<a id="autocomplete"></a>
Un widget Autocomplete.
  
**ATTENTION : Pour les autocompletes, *verifyFunction* n'est pas utilisé. La gestion de la validité doit se faire dans *add* et *delete*.
Si rien n'est renvoyée par ces fonctions alors le champ sera considéré comme valide.**
  
 * **data** - **[]** - les données contenues dans l'autocomplete
 * **add** - **any** - **default = () => { return true; };** -La fonction de callback appellée lors du clic sur un élement de l'autocomplete
 * **delete** - **any** - **default = () => { return true} };** -La fonction de callback suite à la suppression d'un élement de l'autocomplete
 * **config** - **any** -La configuration de l'autocomplete (voir partie Autocomplete)
           
              
###### Checkboxes<a id="checkboxes"></a>
Plusieurs cases à cocher.
 * **inline** - **boolean** - **default = false** - Si inline vaut true, alors les checkboxes seront sur la même ligne sinon elles seront à la ligne à chaque fois
 * **options** - **[]** -Un tableau d'objet contenant les différentes checkboxes à afficher
        
                
          options = [{value: 'value', label: 'label}]
          
  Les checkboxes peuvent être en required et être utilisées avec une méthode de vérification (par exemple il faut au moins que deux soient cochées).
  
  
  ###### CKEditor<a id="ckeditor"></a>
  Un widget CKEditor.
  * **drop** - **any** -L'évenement déclenché lors du drop sur le CKEditor
  * **config** - **any** -La configuration du CKEditor (voir partie CKEditor)
  
  
  ###### Datepicker<a id="datepicker"></a>
  Un widget Datepicker.
  * **view_format** - **string** - **default = 'DD/MM/YYYY'** -Le format de la date à l'affichage
  * **model_format** - **string** - **default = 'YYYY-MM-DD'** -Le format de la date dans le model
  * **first_week_day_sunday** - **boolean** - **default = false** -Si le premier jour de la semaine dans le calendrier est Dimanche
  * **init_empty** - **boolean** - **default = false** -Si la date doit être vide si elle n'est pas renseigné, sinon la date du jour apparaitra
  
  
  ###### Email<a id="email"></a>
  Un input email. La validité de l'email est gérée par une directive Angular.
  * **min_length** - **number** - **default = 1** -La longueur minimale du champ
  * **max_length** - **number** -La longueur maximale du champ
  
  
  ###### Number<a id="number"></a>
  Un input number
  * **min** - **number** -La valeur minimale de l'input
  * **max** - **number** -La valeur maximale de l'input
  * **step** - **number** -Pour avancer de step en step dans la valeur de l'input
  
  
  ###### Radios<a id="radios"></a>
  Des radiosbuttons.
  * **inline** - **boolean** - **default = false** - Si inline vaut true, alors les radiobuttons seront sur la même ligne sinon ils seront à la ligne à chaque fois
  * **options** - **[]** -Un tableau d'objet contenant les différents radiobuttons à afficher
      
      
        options = [{value: 'value', label: 'label}]


  ###### Select<a id="select"></a>
  Un select.
  * **options** - **[]** -Un tableau d'objet contenant les différentes options à afficher
      
      
        options = [{value: 'value', label: 'label}]
   
   
  ###### Text<a id="text"></a>
  Un input text.
  * **min_length** - **number** - **default = 1** -La longueur minimale du champ
  * **max_length** - **number** -La longueur maximale du champ
     
  ###### <a id="textarea"></a>
  Un textarea.
  * **rows** - **number** -Le nombre de ligne du textarea
  
  
  ###### Url<a id="url"></a>
  Un input url. La validité de l'URL est gérée par une RegExp.
  * **min_length** - **number** - **default = 1** -La longueur minimale du champ
  * **max_length** - **number** -La longueur maximale du champ
    
    

  ## Exemple d'utilisation pour un formulaire avec plusieurs onglets
  Dans mon fichier typescript :
  
    // Les différents onglets et la conf pour le FormBuilder.
    private infos1 = {
      title: 'Informations 1',
      fields: {
        identifiant: {label: 'identifiant', type: 'text', required: true},
        année: {label: 'Année de création', type: 'text', pattern: '[0-9][0-9][0-9][0-9]'},
        nom: {label: 'Nom', type: 'text'},
        description: {label: 'Description', type: 'textarea'},
        langues: {label: 'Langue(s)', type: 'autocomplete', required: true, config: this.configLangues, add: this.addLangue, delete: this.deleteLangue, data: this.all_langues},
       }
    };
    private infos2 = {
      title: 'Informations 2',
      fields: {
        continent: {
          label: 'Continent', type: 'select',
          options: [
            {value: 'Afrique', label: 'Afrique'},
            {value: 'Amérique du Nord', label: 'Amérique du Nord'},
            {value: 'Amérique du Sud', label: 'Amérique du Sud'},
            {value: 'Antarctique', label: 'Antarctique'},
            {value: 'Asie', label: 'Asie'},
            {value: 'Europe', label: 'Europe'},
            {value: 'Océanie', label: 'Océanie'},
          ]
        },
        telephone: {label: 'Téléphone', type: 'text', error_message: 'Merci de saisir un numéro correct.'},
        mail: {label: 'Email', type: 'email'},
        web: {label: 'web1', type: 'url'},
      }
    };
    public fields = [
      this.infos1,
      this.infos2
    ];
    
    public agence: Model = new Model();
    public scope = this;
    
    
  Dans mon template :

    <form-builder [(fields)]="fields"
                  [scope]="scope"
                  [(model)]="model"
                  [type]="'tabs'"
                  (cancel)="cancel()"
                  (save)="save()"
    >
    </form-builder>
