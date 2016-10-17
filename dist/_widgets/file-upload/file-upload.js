"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FileUploadComponent = (function () {
    function FileUploadComponent(el, _upload) {
        this.el = el;
        this._upload = _upload;
        this.progressions = [];
        this.editable = false;
        this.loading = false;
        this.fileIsUploaded = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.ngOnInit = function () {
        this.inputFileHidden = this.el.nativeElement.querySelector('.inputFileHidden');
        console.log("Container cible: " + this.container);
    };
    FileUploadComponent.prototype.onClick = function ($event) {
        this.inputFileHidden.click();
    };
    FileUploadComponent.prototype.stopProp = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
    };
    FileUploadComponent.prototype.onDrop = function ($event) {
        this.stopProp($event);
        var filelist = $event.dataTransfer.files;
        this.uploadFileList(filelist);
        return false;
    };
    FileUploadComponent.prototype.onDragLeave = function ($event) {
        document.body.style.cursor = "";
        this.stopProp($event);
        return false;
    };
    FileUploadComponent.prototype.onDragOver = function ($event) {
        this.el.nativeElement.style.cursor = "pointer";
        this.stopProp($event);
        return false;
    };
    FileUploadComponent.prototype.inputFileHiddenChange = function ($event) {
        var filelist = $event.target.files;
        this.uploadFileList(filelist);
    };
    FileUploadComponent.prototype.handleUploadFinish = function (e, data) {
        var xhrContent = e.target.responseText;
        var apiResponse = JSON.parse(xhrContent);
        if (apiResponse.status.code == 200 || apiResponse.status.code === "200") {
            try {
                if (data.file.type.startsWith("image/"))
                    apiResponse.response.type = "img";
                else
                    apiResponse.response.type = "text";
                this.progressions = this.progressions.filter(function (p) { return p.name !== data.file.name; });
            }
            catch (e) {
                this.progressions.map(function (p, i) {
                    if (p.name == data.file.name)
                        p.error = apiResponse.status.message;
                });
                apiResponse = { "status": { "code": 500, "message": "InternalServerError" } };
            }
        }
        else {
            this.progressions.map(function (p, i) {
                if (p.name == data.file.name)
                    p.error = apiResponse.status.message;
            });
            apiResponse = { "status": { "code": 500, "message": "InternalServerError" } };
        }
        this.fileIsUploaded.emit(apiResponse);
        this.loading = false;
    };
    FileUploadComponent.prototype.progressUpload = function (e, data) {
        this.progressions.map(function (p, i) {
            if (p.name == data.file.name)
                p.progress = (e.loaded / e.total) * 100;
        });
    };
    FileUploadComponent.prototype.uploadFileList = function (filelist) {
        console.log(filelist);
        this.loading = true;
        this.processingFiles = filelist.length;
        this.errorImages = new Array();
        for (var i = 0; i < filelist.length; i++) {
            var file = filelist[i];
            this.progressions.push({
                name: file.name,
                progress: 0,
                error: null
            });
        }
    };
    FileUploadComponent.prototype.removeFile = function (progression) {
        this.progressions = this.progressions.filter(function (p) { return p != progression; });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "fileIsUploaded", void 0);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'file-upload',
            providers: [UploadService],
            templateUrl: './file-upload.html',
            styleUrls: ['./file-upload.css'],
            inputs: ['container', 'disabled']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.js.map