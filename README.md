# SDV NG2 Widgets

[![npm download](https://img.shields.io/npm/dt/sdv-ng2-widgets.svg)]()
[![npm version](https://img.shields.io/npm/v/sdv-ng2-widgets.svg)]()
[![npm license](https://img.shields.io/npm/l/sdv-ng2-widgets.svg)]()

Pack de widgets pour Angular2 / bootstrap

![Widgets](https://raw.githubusercontent.com/SDV-Plurimedia/sdv-ng2-widgets/develop/documentation/dist/img/widgets.png)

## Documentation

https://sdv-plurimedia.github.io/sdv-ng2-widgets/

( En cas de modification, utilisez ./bin/deploy-pages.sh pour republier la doc)

## Utilisation

` npm install sdv-ng2-widgets`

Puis importer le module **SDVNg2WidgetsModule** dans votre app.modules.ts

`
import { SDVNg2WidgetsModule } from "sdv-ng2-widgets";
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
`import {CkeditorComponent} from "sdv-ng2-widgets/_widgets/ckeditor/ckeditor";`

## Utilisation de l'app d'exemple

` git clone git@github.com:SDV-Plurimedia/sdv-ng2-widgets.git
cd sdv-ng2-widgets/example
npm install
npm start `
