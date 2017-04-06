import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'bootstrapClass'})

export class BootstrapClassPipe  implements PipeTransform {
  /**
   *  Méthode permettant de renvoyer les classes pour l'affichage de buttons
      correpondant à l'état d'un élément
   *  @param  state L'état de l'élément
   *  @param  args  Les arguments passés au pipe
   *  @return       Les classes qui seront mises dans le button
   */
  transform (value: any) {
    let color = '';
    if (value.indexOf('Création') === 0) {
      color = 'success';
    } else if (value.indexOf('Suppression') === 0) {
      color = 'danger';
    } else if (value.indexOf('Assignation') === 0) {
      color = 'warning';
    } else {
      color = 'info';
    }
    return 'label-' + color;
  }

}
