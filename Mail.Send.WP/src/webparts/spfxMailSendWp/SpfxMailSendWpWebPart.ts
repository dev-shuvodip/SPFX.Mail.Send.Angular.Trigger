import { Version } from '@microsoft/sp-core-library';
import {

  IPropertyPaneConfiguration,
  PropertyPaneTextField

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxMailSendWpWebPart.module.scss';
import * as strings from 'SpfxMailSendWpWebPartStrings';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";

import '../../../../Mail.Send.AngularUI/dist/mail.send.angular-ui/main';
import '../../../../Mail.Send.AngularUI/dist/mail.send.angular-ui/polyfills';
require('../../../../Mail.Send.AngularUI/dist/mail.send.angular-ui/styles.css');

export interface ISpfxMailSendWpWebPartProps {

  description: string;

}

export default class SpfxMailSendWpWebPart extends BaseClientSideWebPart<ISpfxMailSendWpWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _inputFromWebPArt: string;

  protected onInit(): Promise<void> {

    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();

  }

  public render(): void {

    this.domElement.innerHTML = `
    <section class="${styles.spfxMailSendWp} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
        <app-root input-data="${this.context.pageContext.user.displayName}"></app-root>
    </section>`;

    this._bindEvents();

  }

  private _bindEvents() {

    document.querySelector("app-root").addEventListener("eventReceivedfromChild", (e: CustomEvent) => this._eventReceivedFromAngular(e));

  }

  private async _eventReceivedFromAngular(e: CustomEvent) {

    console.log(this.context.pageContext.web.absoluteUrl);

    console.log(`-- inside SpfxMailSendWpWebPart method _eventReceivedFromAngular() => name: ${e.detail.name} age: ${e.detail.age} isObjectEmpty: ${e.detail.isObjectEmpty} --`);

    const sp = spfi(this.context.pageContext.web.absoluteUrl).using(SPFx(this.context));

    const emailProps: IEmailProperties = {
      To: ["rohan@pphackathonteam5.onmicrosoft.com"],
      Subject: "This email is about testing Email service triggered from Angular component",
      Body: `Here is the body. Mail sent from SPFX triggered from Angular by <b>${e.detail.name}</b>`,
      AdditionalHeaders: {
        "content-type": "text/html"
      }
    };

    await sp.utility.sendEmail(emailProps);
    console.log("Email Sent!");

  }

  private _getEnvironmentMessage(): string {

    if (!!this.context.sdks.microsoftTeams) { // running in Teams

      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;

    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;

  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {

    if (!currentTheme) {

      return;

    }

    this._isDarkTheme = !!currentTheme.isInverted;

    const {

      semanticColors

    } = currentTheme;

    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected get dataVersion(): Version {

    return Version.parse('1.0');

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {

      pages: [

        {

          header: {

            description: strings.PropertyPaneDescription

          },
          groups: [

            {

              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneTextField('description', {

                  label: strings.DescriptionFieldLabel

                })

              ]

            }

          ]

        }

      ]

    };

  }

}
