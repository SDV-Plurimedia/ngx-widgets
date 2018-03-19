# SDV NG2 Widgets

[![npm download](https://img.shields.io/npm/dt/ngx-widgets.svg)]()
[![npm version](https://img.shields.io/npm/v/ngx-widgets.svg)]()
[![npm license](https://img.shields.io/npm/l/ngx-widgets.svg)]()
[![Build Status](https://travis-ci.org/SDV-Plurimedia/ngx-widgets.svg?branch=develop)](https://travis-ci.org/SDV-Plurimedia/ngx-widgets)

Pack de widgets pour Angular2 / bootstrap

![Widgets](https://raw.githubusercontent.com/SDV-Plurimedia/ngx-widgets/develop/documentation/dist/img/widgets.png)

## Documentation

https://sdv-plurimedia.github.io/ngx-widgets/

( En cas de modification, utilisez ./bin/deploy-pages.sh pour republier la doc)

## Utilisation

` npm install @sdvplurimedia/ngx-widgets`

Puis importer le module **SDVNgXWidgetsModule** dans votre app.modules.ts

`
import { SDVNg2WidgetsModule } from "ngx-widgets";
...

@NgModule({
  declarations: [
    AppComponent
    ...
  ],
  imports: [
    SDVNg2WidgetsModule
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppModule { }
`

Ceci rendra accessible les widgets du pack depuis vos templates.

Si vous avez besoin d'utiliser ceux-ci de façon dynamique, il faudra les importer unitairement dans vos ts
Example:
`import {CkeditorComponent} from "@sdvplurimedia/ngx-widgets/_widgets/ckeditor/ckeditor";`

## Utilisation de l'app d'exemple

```
git clone git@github.com:SDV-Plurimedia/ngx-widgets.git
cd ngx-widgets/example
npm install
npm start
```

Example:
