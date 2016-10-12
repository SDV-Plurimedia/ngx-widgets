/// <reference path="../node_modules/@types/jquery/index.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class StaticLoaderService {

  //gestion du singleton
  private static instance:StaticLoaderService;
  private static isCreating: boolean;
  //liste des scripts déja chargé
  private static promiseLoaded : Array<Promise<any>>;

  constructor() {
      if (!StaticLoaderService.isCreating) {
          throw new Error("You can't call new in Singleton instances! Please use getInstance() !");
      }
  }

  private debug(message){
    //console.log("StaticLoader: "+message);
  }

  public static getInstance() {
      if (StaticLoaderService.instance == null) {
          StaticLoaderService.isCreating = true;
          StaticLoaderService.instance = new StaticLoaderService();
          StaticLoaderService.isCreating = false;
          //StaticLoaderService.loaded = [];
          StaticLoaderService.promiseLoaded = [];
      }

      return StaticLoaderService.instance;
  }

  //fais un require_once en parallele
  public require_once(depend: any){
    if(Array.isArray(depend)){
      return this.load_multiple_file(depend);
    }
    else{
      return this.load_file_once(depend);
    }
  }

  //fais des require_once dans l'ordre
  public require_once_ordered(depend: Array<string>): Promise<any>{
    let firstElem = depend.shift();
    let globalePromesse = new Promise((resolve,reject)=>{
      this.load_file_once(firstElem).then(()=>{
        //si on a encore des script a chargé
        if(depend.length > 0){
          //on les appelles
          this.require_once_ordered(depend).then(()=>{
            //et une fois qu'ils sont chargés, alors on dis qu'on a fini
            resolve(true);
          });
        }
        //si on est le dernier script de la liste
        else{
          //on préviens lorqu'on est chargé
          resolve(true);
        }
      });
    });
    return globalePromesse;
  }

  //permet de faire un require once sur toutes les dependances d'un component
  private load_multiple_file(tab: Array<string> ): Promise<any>{
    let promiseTab: Array<Promise<any>> = [];
    tab.forEach((url)=>{
      //lance en parrallele le chargements des dependances
      promiseTab.push(this.load_file_once(url));
    });

    return Promise.all(promiseTab);
  }

  private load_file_once(url: string): Promise<any>{
    this.debug("Début -> "+url);
    //si l'url n'a pas encore été loadé
    if(typeof StaticLoaderService.promiseLoaded[url] === "undefined"){
      StaticLoaderService.promiseLoaded[url] = new Promise((resolve,reject)=>{
        let mabalise:string = "<!-- type non existant pour "+url+"-->";

          //chargement pour les css
          if(url.lastIndexOf(".css") === (url.length - 4)){
           this.debug("CSS -> "+url);
           mabalise = "<link rel='stylesheet' type='text/css' href='"+url+"' />";
           resolve(true);
          }
          //pour les scripts js
          else if(url.lastIndexOf(".js") === (url.length - 3)){
            jQuery.ajax({
              url: url,
              dataType: "script",
              success: ()=>{
                this.debug("Fin -> " + url);
                resolve(true);
              },
              error:()=>{
                this.debug("Erreur ->" + url);
                resolve(false);
              }
            });
            mabalise = "<!-- js loadé par jQuery: "+url+"-->";
          }
          else{
            this.debug('URL non pris en compte: '+ url);
          }

          jQuery("#autoloaded_script").append(mabalise);
          //StaticLoaderService.loaded.push(url);

      });
    }
    else{
      this.debug("Déjà Loadé -> "+url);
      //StaticLoaderService.promiseLoaded[url].resolve(true);//Attention ici il y a peut etre un conflit entre ce qui est deja chargé, et ce qui est déjà "demandé"
    }
    return StaticLoaderService.promiseLoaded[url];
  }

}
