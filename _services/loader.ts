/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/bootbox/index.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {

  //gestion du singleton
  private static instance:LoaderService;
  private static isCreating: boolean;

  private dialog: any;

  constructor() {
      if (!LoaderService.isCreating) {
          throw new Error("You can't call new in Singleton instances! Please use getInstance() !");
      }
  }

  public static getInstance() {
      if (LoaderService.instance == null) {
          LoaderService.isCreating = true;
          LoaderService.instance = new LoaderService();
          LoaderService.isCreating = false;
      }

      return LoaderService.instance;
  }

  private getMessage(state: number = 0): string{
    let str = '<i class="fa fa-spinner fa-pulse"></i>&nbsp;Chargement en cours...';
    if(state > 0){
      str += `<br/><div class="progress">
  <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="`+state+`" aria-valuemin="0" aria-valuemax="100" style="width: `+state+`0%">
    <span class="sr-only">`+state+`% Completé</span>
  </div>
</div>`;
    }
    return str;
  }

  /**
   * Méthode lançant l'affichage du loader
   */
  public start() {
    if(!this.dialog){
      jQuery().ready(() => {
        this.dialog = bootbox.dialog({
          message: this.getMessage(0),
          closeButton: false
        });
      });
    }
    else{
      console.log("LoaderService: Une popup de chargement existe deja");
    }
  }

  public updateState(percent){
    if(this.dialog){
      this.dialog.modal('hide');
      this.dialog = bootbox.dialog({
        message: this.getMessage(Math.round(percent)),
        closeButton: false
      });
    }
  }

  /**
   * Méthode cachant le loader
   */
  public stop() {
    if(this.dialog){
      this.dialog.modal('hide');
      this.dialog = null;
      //bootbox.hideAll();
    }
  }
}
