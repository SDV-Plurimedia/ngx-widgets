import {Component, EventEmitter, ElementRef, Output} from '@angular/core';
import {UploadService} from "../../../_core/_services/http/upload";
import {ReplaySubject, Subject, Observable} from 'rxjs';
declare var GLOBAL_CONFIG;

@Component({
  selector: 'file-upload',
  providers: [UploadService],
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.css'],
  inputs: ['container', 'disabled']
})

export class FileUploadComponent {

  public progressions: any[] = [];
  public container;
  public editable = false;
  private inputFileHidden;
  private errorImages: any[];//liste des fichiers en erreurs
  private processingFiles: number;//nombre de fichier à traiter
  private loading : boolean = false;

  @Output() fileIsUploaded = new EventEmitter();

  constructor(
    public el: ElementRef,
    private _upload: UploadService
  ){}

  ngOnInit(){
    this.inputFileHidden = this.el.nativeElement.querySelector('.inputFileHidden');
    console.log("Container cible: "+this.container);
  }

  onClick($event){
    this.inputFileHidden.click();
  }

  stopProp($event){
    $event.stopPropagation();
    $event.preventDefault();
  }

  onDrop($event){
    this.stopProp($event);
    let filelist = $event.dataTransfer.files;
    this.uploadFileList(filelist);
    return false;
  }

  onDragLeave($event){
    document.body.style.cursor = "";
    this.stopProp($event);
    return false;
  }

  onDragOver($event){
    this.el.nativeElement.style.cursor = "pointer";
    this.stopProp($event);
    return false;
  }

  inputFileHiddenChange($event){
    let filelist = $event.target.files;
    this.uploadFileList(filelist);
  }

    handleUploadFinish(e, data)
    {

        var xhrContent = e.target.responseText;

          // Handle response.
          let apiResponse = JSON.parse(xhrContent);
          if(apiResponse.status.code == 200 || apiResponse.status.code === "200") {
            try {
              if(data.file.type.startsWith("image/"))
                apiResponse.response.type = "img";
              else apiResponse.response.type = "text";
              //On enlève le fichier qui a été uploadé de la liste
              this.progressions = this.progressions.filter(p => p.name !== data.file.name);
            } catch (e) {

              //On affiche l'erreur que l'on récupère du webservice
              this.progressions.map((p, i) => {
                if(p.name == data.file.name)
                p.error = apiResponse.status.message;
              });
              apiResponse = {"status": {"code": 500, "message": "InternalServerError"}};
            }
          }
          else {
            this.progressions.map((p, i) => {
              if(p.name == data.file.name)
              p.error = apiResponse.status.message;
            });
            apiResponse = {"status": {"code": 500, "message": "InternalServerError"}};
          }
          this.fileIsUploaded.emit(apiResponse);
          this.loading = false;

    }

    progressUpload(e, data) {
        this.progressions.map((p, i) => {
          if(p.name == data.file.name)
            p.progress = (e.loaded/e.total)*100;
        });
    }

    uploadFileList(filelist){
        console.log(filelist);
        this.loading = true;

        // processing files update
        this.processingFiles = filelist.length;

        // raz de la liste des fichiers en erreur
        this.errorImages = new Array();

        // pour chaque image envoyée au formulaire
        for (var i = 0; i < filelist.length; i++)
        {
            // l'image seule
            var file = filelist[i];
            this.progressions.push({
              name: file.name,
              progress: 0,
              error: null
            });
            this._upload.uploadFileL5(file,this.handleUploadFinish, this.progressUpload, this, this.container);
        }
    }

    removeFile(progression: any) {
      this.progressions = this.progressions.filter(p => p!=progression);
    }

}
