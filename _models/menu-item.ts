export class MenuItem {
  _id: string = "";
  name: string = "";
  route: string = "Demo";
  permission: string = "";
  parent: string = "-1";
  params: Object = null;
  icon: string = null
  ordre: number = 0;

  constructor(obj?: any){
    this._id = obj && obj._id || null;
    this.name = obj && obj.name || "";
    this.route = obj && obj.route || "Demo";
    this.permission = obj && obj.permission || "";
    this.parent = obj && obj.parent || "-1";
    this.icon = obj && obj.icon || null;
    this.ordre = obj && obj.ordre || 0;
    if (obj && obj.params != null)
      this.params = obj.params;
  }

  prepareForSubmit(){
    let res = {};
    for (let prop in this){
      if(prop !='params' && this.hasOwnProperty(prop) && this[prop] != null) {
        res[prop] = this[prop];
      }
    }
    // res['_id'] = this._id;
    // res['name'] = this.name;
    // res['route'] = this.route;
    // res['permission'] = this.permission;
    // res['parent'] = this.parent;
    // res['icon'] = this.icon;
    // res['ordre'] = this.ordre;
    res['params'] = JSON.stringify(this.params);
    return res;
  }
}


export class ParamsElt {
  name: string = null;
  value: string = null;

  constructor(name?: string, value?: string) {
    this.name = name;
    this.value = value;
  }
}
