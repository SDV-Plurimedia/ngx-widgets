import { EventEmitter, ElementRef } from '@angular/core';
import { UploadService } from "../../../_core/_services/http/upload";
export declare class FileUploadComponent {
    el: ElementRef;
    private _upload;
    progressions: any[];
    container: any;
    editable: boolean;
    private inputFileHidden;
    private errorImages;
    private processingFiles;
    private loading;
    fileIsUploaded: EventEmitter<{}>;
    constructor(el: ElementRef, _upload: UploadService);
    ngOnInit(): void;
    onClick($event: any): void;
    stopProp($event: any): void;
    onDrop($event: any): boolean;
    onDragLeave($event: any): boolean;
    onDragOver($event: any): boolean;
    inputFileHiddenChange($event: any): void;
    handleUploadFinish(e: any, data: any): void;
    progressUpload(e: any, data: any): void;
    uploadFileList(filelist: any): void;
    removeFile(progression: any): void;
}
