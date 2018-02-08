#Changelog SDV-NG2-Widgets

## 1.4.12 - 07/02/2018
* ADD: HierarchieList : possibilité d'afficher des balises de navigation à la place des boutons si l'option est configurée correctement
## 1.4.11 - 25/01/2018
* FIX: HierarchieList: Le choix du niveau ne plante plus si le niveau n'existe pas

## 1.4.10 - 23/01/2018
* FIX: Datatable: Retrait de la méthode destroy dans les interfaces des widgets dynamiques

## 1.4.9 - 23/01/2018
* FIX: Autocomplete: Le placeholder du champ correspondant à "Aucun" n'apparait plus plusieurs fois
* ADD: Datatable: Possibilité de fournir un widget pour une cellule
* ADD: Datatable: Possibilité de fournir un widget pour les boutons
* ADD: FormBuilder: Interface pouvant être implémentée pour les DynamicFields

## 1.4.8 - 19/01/2018
* UPD: Pager: Possibilité d'initialiser le pager à une autre page que la page 1
* UPD: Bigdatatable: Si dans la configuration de la pagination on fournit "current_page", le pager sera à cette page là

## 1.4.7 - 19/01/2018
* UPD: CKEditor: Prise en compte du changement des données dans le textarea vers le CKEditor

## 1.4.6 - 17/01/2018
* UPD: Bigdatatable: Ajout de configuration pour ne pas lancer la recherche lors de l'initialisation
* UPD: Bigdatatable: Possibilité d'ajouter un évenement sur les lignes de la Bigdatatable

## 1.4.5 - 14/12/2017
* ADD: DragNDrop possible sur le widget DataTable
* FIX: Creation Component Graph
* ADD: Support du disabled sur Autocomplete
* ADD: Component AutocompleteDisplayItems
* FIX: FormBuilder CSS

## 1.4.4 - 11/12/2017
* FIX: AutoComplete: reduceResultList ne trim plus le contenu du champs HTML
* FIX: FormBuilder: réagit au modification de l'objet (NgOnChanges)
* ADD: FormBuilder: possibilité de gérer la classe css des champs

## 1.4.3 - 01/12/2017
* ADD: FormBuilder: point d'entrée pour widget custom


## 1.4.2 - 21/11/2017
* FIX: SanitizeHTML in datatable

## 1.4.1 - 07/11/2017
* FIX: Test sur la presence de l'objet config.dtd

## 1.4.0 - 07/11/2017
* ADD: Support de la possibilité de surcharger $removeEmpty de CKEditor
* ADD: Ajout du widget form-builder

## 1.3.2 - 30/10/2017
* FIX : Prise en compte de l'affichage des boutons dans le template
* FIX : Css autocomplete

## 1.3.1 - 30/10/2017
* FIX : Textearea field value
* ADD: Input password support

## 1.3.0 - 27/10/2017
* ADD : Ajout du widget FormBuilder
* UPD : Retrait code inutile dans le widget autocomplete

## 1.2.3 - 17/10/2017
* ADD: Ajout du paramètre access pour les boutons de HierarchieListComponent

## 1.2.2 - 16/10/2017
* FIX : chevron en trop dans le HTML du datatable

## 1.2.1 - 12/10/2017
* FIX: Autocomplete ne retire plus les chiffres de la recherche

## 1.2.0 - 12/10/2017
* ADD: Gestion des texte HTML sur les boutons

## 1.1.23 - 22/09/2017
* FIX: Erreur d'accès à un item inexistant sur le component hierarchie-list
* FIX: Sauvegarde CKEditor en mode source

## 1.1.1 - 17/08/2017
* FIX: Vidage de l'input de l'autocomplete au changement des  données
* FIX: Mise à jour des graphique au changement des données

## 1.1.0 - 27/04/2017
* ADD: Ajout d'un widget permettant d'afficher des tags dans un input
* FIX: fix keys pipe
* FIX: fix bug chevron
* ADD: Autocomplete: Ajout trim sur la valeur de l'input et fix valeur par défaut.
* FIX: fix bug autocomplete

## 1.0.3 - 12/04/2017
* FIX: erreur de compilation en mode prod

## 1.0.2 - 11/04/2017
* FIX: Fix hierarchie-list component

## 1.0.1 - 10/04/2017
* UPD: Corrections suite au passage à angular4

## 1.0.0 - 06/04/2017
* BC: Passage à Angular4
* UPD: Lint du projet

## 0.9.3 - 06/04/2017
* ADD: AutoComplete peut gérer des CustomSearch

## 0.9.2 - 05/04/2017
* UPD: Ajout d'un paramètre pour initialiser le datepicker sans date

## 0.9.1 - 04/04/2017
* ADD: Loader lors de la récupération des données du big datatable
* FIX: Page 0 du pager
* FIX: Changement visuel pour filters

## 0.9.0 - 29/03/2017
* ADD: Big Datatable : Composant permettant de gérer un datatable en ne récupérant qu'une page de résultat à la fois
* ADD: Directive NgIfv2: Directive se basant sur la syntaxe ngIf d'angular4, permettant d'utiliser else

## 0.8.0 - 06/03/2017
* ADD: Autocomplete: choisir une valeur par défaut quand aucun item n'est selectionné

## 0.7.0 - 02/03/2017
* FIX: Autocomplete: coloration bleu sur l'ajout au clavier
* ADD: Autocomplete: evenement d'ajout et de suppression d'element
* ADD: Autocomplete: affichage d'une liste d'element

## 0.6.2 - 21/02/2017
* FIX: AutoComplete avait des images manquantes (pour passer une compilation AOT pour angular/cli 32)

## 0.6.1 - 21/02/2017
* FIX: Naming et Export des WizardStepComponent pour la compilation AOT

## 0.6.0 - 21/02/2017
 * ADD: L'autocomplete émet des créations d'objet
 * FIX: L'autocomplete n'envoi plus de valeur null quand on choisie aucun
 * UPD: La page d'example inclus un autocomplete
 * ADD: Datatable peut gérer des templates html dans les colonnes

## 0.5.2 - 30/01/2017
 * ADD: Possibilité de surcharger la valeur insérée dans le champ de l'autocomplete après un clic sur l'un des résultats

## 0.5.1 - 22/12/2016
  * ADD: Ajout des Links dans les Touch Buttons

## 0.5.0 - 22/12/2016
 * ADD: npm run lint
 * UDP: angular passe en 2.4.1
 * WIP: ajout sur les examples

## 0.4.2 - 19/12/2016
 * FIX: Correction de l'erreur de compilation sur les css de l'autocomplete
 * ADD: Possibilité de mettre du HTML sur les titres des tabpane.

## 0.4.1 - 12/12/2016

* WIP: FIX bug sur autocomplete
* WIP: Deploy avec travis
* ADD: documentation sur pages
* WIP: exemple presentant les widgets et leur intégration
* ADD: widget de dropdown

## 0.4.0 - 02/12/2016

## 0.3.0 - 24/11/2016

* Premiere version publique
