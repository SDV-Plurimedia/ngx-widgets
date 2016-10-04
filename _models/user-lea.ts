//Cette classe permet de gérer le user qui est connecté au backoffice
import {UserSettings} from '../../user-settings/_models/user-settings';

export class UserLea {
  id: number;
  username: string = "Anonymous";
  lastname: string = "";
  firstname: string = "";
  email: string = "";

  connected: boolean = false;
  ibp_account: string;

  //pour connection sf1
  session_id: string;

  //pour connection laravel
  l5_token: string;
  l5_payload: any;

  permissions: any;
  user_settings: UserSettings;

  constructor(obj?: any){
    this.id = obj && obj.id || null;
    this.username = obj && obj.username || "";
    this.lastname = obj && obj.lastname || "";
    this.firstname = obj && obj.firstname || "";
    this.email = obj && obj.email || "";
    this.connected = obj && obj.connected || false;
    this.ibp_account = obj && obj.ibp_account || "";
    this.session_id = obj && obj.session_id || "";
    this.permissions = obj && obj.permissions || {};
    this.l5_token = obj && obj.l5_token || "";
    this.ibp_account = obj && obj.ibp_account;
    this.user_settings = new UserSettings();
  }

  getName(){
    let username = this.username;
    if(this.firstname != "" || this.lastname != ""){
      username = [this.firstname,this.lastname].join(" ");
    }
    return username;
  }

  hasPerm(perm) {
    let res = false;
    for( var name in this.permissions) {
      if (name == perm)
        res = true;
    }
    return res;
  }
}
