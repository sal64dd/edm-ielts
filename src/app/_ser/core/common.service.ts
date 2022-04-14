import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public routeShow = false;

  public uuid: any = '';
  public id: any;
  public test_id: number;
  public program_id: number;
  public programe_name: any;
  public localStorageKey = {
    id: 'id',
    program_id: 'p_id',
    test_id: 't_id',
    userDetails: 'userDetails',
  };
  public errMsg = {
    LoadingMsg: 'Please Wait',
    internetConn: 'Please check your internet connection',
    serverError: 'There are some technical issue! Please Try later.',
  };
  public routerResources = { home: 'home', program: 'program' };
  public apiRetry = 3;
  public userProfile: any;
  public firstName: any;
  public lastName: any;
  public email: any;
  public mobile: any;
  public notificationCount: any = 0;
  public apiTimeout = 5; // not implement yet
  public global_event: any = new Subject<string>();
  public enggTestId: number = 5;
  public havePackage: any = '5';
  public tabEnable: boolean = false;
  public tmpTestData: any;
  public tmptestreport: any;
  public tmpquickresult: any;
  public emailValidation = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$';
  public staticPage = [];
  public collectionName = {
    bug: 'bug',
    notification: 'notification',
  };

  // header
  public headerContent: string = 'Sample Header';
  public showHeader: boolean = false;
  public showTab: boolean = false;
  public showSidebar: boolean = false;

  // new
  public showTabMenu: boolean = false;

  tab = {
    home: true,
    visa: false,
    kBank: false,
    chatbot: false,
  };
  selectedCountry: any = {
    country_id: '1',
    iso3: 'IND',
    name: 'India',
    phonecode: '+91',
    flag: environment.url + '/./uploads/gallery/flag-of-India.png',
    phoneNo_limit: '10',
  };
  goalSetting = {
    Goal_l: null,
    Goal_r: null,
    Goal_w: null,
    Goal_s: null,
    Goal_avg: null,
    goalDate: null,
    targateDate: null,
    daysLeft: null,
    active: false,
    show: false,
    realTestdates: [],
    urlData: null,
  };
  test_seriese_name_mock: any;
  evalutionTestShow: boolean = false;
  goalTestShow: boolean = false;
  goalSelectTestShow: boolean = false;
  visaPopupShow: boolean = false;
  staticPagePopupShow: boolean = false;
  NotificatonPopupComponentShow: boolean = false;
  mockupTempData = [];
  confirmTimeSlotPopup: boolean = false;
  test_seriese_id: any;
  bandScoreRange: any = [
    '5.0',
    '5.5',
    '6.0',
    '6.5',
    '7.0',
    '7.5',
    '8.0',
    '8.5',
    '9.0',
  ];
  public tmpPreviousPaper: any;
  star_count: any;
  public analyticData: any = {
    price: 'price',
    redirectTo: 'redirectTo',
    redirectFrom: 'redirectFrom',
    screenName: 'screenName',
  };
  resources = { Error_email: '/Error_email' };
  staticPageTemp: any = [];
  url = environment.url + environment.apiVersion;
  storage: any;

  public debugString = '';
  loggedIn: boolean = false;
  showDebug: boolean = false;

  constructor(
    public platform: Platform,
    private menuCtrl: MenuController,
    private s: Storage,
    public toastController: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public iab: InAppBrowser,
    private photoViewer: PhotoViewer
  ) {
    this.menuCtrl.enable(false);
    this.init();
  }

  async init() {
    this.storage = await this.s.create();
    // await StatusBar.setStyle({ style: Style.Light });
  }

  menutoggle() {
    this.menuCtrl.open();
    console.log('menu open');
  }
  NotificationComponent() {
    this.navCtrl.navigateForward('NotificationComponent');
  }

  serverHtmlErrorHandling(ev, body = '', header = '') {
    try {
      if (ev.data) {
        JSON.parse(ev.data);
      }
    } catch (err) {
      // this.firebaseDb(ev, this.collectionName.bug, body, header);
    }
  }

  async getLocalStorage(key) {
    if (this.platform.is("cordova")) {
      return this.storage.get(key);
    } else {
      return new Promise(function(resolve, reject) {
        if (localStorage.getItem(key)) {
          resolve(localStorage.getItem(key));
        } else {
          reject(Error("It broke"));
        }
      });
    }
  }

  async setLocalStorage(key, data) {
    if (this.platform.is("cordova")) {
      return this.storage.set(key, data);
    } else {
      return new Promise(function(resolve, reject) {
        try {
          resolve(localStorage.setItem(key, data));
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  messageListener() {}

  firebaseMessanger() {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  animationInterval: any;
  animationSubmit(data) {
    try {
      this.animateCSS('.' + data, 'bounceIn', () => {});
    } catch (err) {
      this.dlog('animations error: ' + err);
    }
  }

  animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);
    function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
      if (typeof callback === 'function') {
        callback();
      }
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }

  statusbarInit() {
    // this.statusBar.styleLightContent();
  }

  statusbarLight() {
    // if (this.platform.is('cordova')) {
    //   this.statusBar.show();
    //   this.statusBar.overlaysWebView(false);
    //   this.statusBar.styleLightContent();
    // }
  }

  statusbarDark() {
    // if (this.platform.is('cordova')) {
    //   this.statusBar.show();
    //   this.statusBar.overlaysWebView(false);
    //   this.statusBar.styleDefault();
    // }
  }

  statusbarShow() {
    // if (this.platform.is('cordova')) {
    //   this.statusBar.show();
    // }
  }

  statusbarHide() {
    // if (this.platform.is('cordova')) {
    //   this.statusBar.hide();
    // }
  }

  dlog(str) {
    this.debugString += `<pre>${str}</pre>`;
  }

  async Toast(msg, duration = 2000) {
    const toast = await this.toastController.create({
      message: msg,
      duration,
      color: 'dark',
    });
    toast.present();
  }

  commonError(err) {
    switch (err.status) {
      case -1:
        return this.errMsg.internetConn;
      case -3:
        return this.errMsg.internetConn;
      case 404: {
        // this.setLocalStorage(this.localStorageKey.id, undefined);
        // localStorage.clear();,dicˀ
        // this.navCtrl.navigateRoot('auth/login');
        // return JSON.parse(err).message;
        return JSON.parse(err).message;
      }
      case 500: {
        return this.errMsg.serverError;
      }
      case 0: {
        return err.statusText;
      }
      case -4: {
        return this.errMsg.internetConn;
      }
      default: {
        return err;
      }
    }
  }

  exitTextValid: any = true;
  async exitTest() {
    if (this.exitTextValid) {
      this.exitTextValid = false;
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message:
          'Please confirm if you wish to quit the test. Your data will be lost once you quit.',
        cssClass: 'alertCancel',
        buttons: [
          {
            text: 'Continue',
            role: 'submit',
            cssClass: 'secondary',
            handler: (b) => {
              this.exitTextValid = true;
              console.log('Confirm Cancel: ', b);
            },
          },
          {
            text: 'Quit',
            handler: () => {
              this.exitTextValid = true;
              this.navCtrl.back();
              this.showTabMenu = true;
              setTimeout(() => {
                this.navCtrl.back();
              }, 1);
              console.log('cancle');
            },
          },
        ],
      });
      await alert.present();
      alert.onDidDismiss().then(
        (data) => {
          this.exitTextValid = true;
        },
        (err) => {
          this.exitTextValid = true;
        }
      );
    }
  }

  exitAppValid: any = true;
  async exitApp() {
    if (this.exitAppValid) {
      this.exitAppValid = false;
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Do you really want to exit from application?',
        cssClass: 'alertCancel',
        buttons: [
          {
            text: 'Yes',
            role: 'submit',
            cssClass: 'secondary',
            handler: (blah) => {
              this.exitAppValid = true;
              navigator['app'].exitApp();
            },
          },
          {
            text: 'No',
            handler: () => {
              this.exitAppValid = true;
            },
          },
        ],
      });
      await alert.present();
      alert.onDidDismiss().then(
        (data) => {
          this.exitAppValid = true;
        },
        (err) => {
          this.exitAppValid = true;
        }
      );
    }
  }

  analyticsData(screen, jsondata) {}

  photo_Viewer(img) {
    this.photoViewer.show(img, 'Image', {
      share: false, // default is false
      closeButton: true, // default is true
      copyToReference: true, // default is false
      headers: '',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
  });
  }

  homeInit() {
    this.statusbarInit();
    this.headerContent = 'Welcome to Masterprep!';
    this.showHeader = true;
    this.showTab = true;
    this.showSidebar = true;
    //this.showDebug = true;
  }

  appDisableMenu(){
    this.showTabMenu = false;
    this.menuCtrl.close();
  }
  appEnableMenu(){
    this.showTabMenu = true;
    this.menuCtrl.close();
  }

  isNatve(): boolean{
    return this.platform.is("mobile")  && ! this.platform.is("mobileweb");
  }


  getStaticPage(commApi, catid, pid) {

    const staticPageApiCall = commApi
      .getStaticPage(catid, pid)
      .subscribe(
        (data) => {

          switch (data.error_message.success) {
            case 1: {
              this.staticPageTemp = '';
              this.staticPageTemp = [];
              this.staticPageTemp = data.error_message.data.child;
              break;
            }
            case 0: {
              // 404 not found msg
              break;
            }
            default: {
              break;
            }
          }
        }
      );
  }

}
