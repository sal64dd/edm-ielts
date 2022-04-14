import { httpService } from './../core/http.service';
/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Checkout } from 'capacitor-razorpay';
import { UserV3Service } from '../core/userv3.service';

// "capacitor-razorpay": "git+https://github.com/razorpay/razorpay-capacitor.git",
// declare let RazorpayCheckout: any;

export const PACK_DETAILS = [
  {
      package_color: "#ebebeb",
      icon: "http://masterprep.info/newV1/./uploads/gallery/silver-img.svg",
      package_name: "Silver",
      star_count: "3",

      phy_content: [
        "1 IELTS Orientation Class at your nearest Masterprep Institute",
        "1 IELTS Course Book from Masterprep",
        "Email assistance",
      ],
      dig_content: [
        "7 IELTS practice tests with the trainer's feedback",
        "1 IELTS mock test with the trainer's feedback",
        "Video Lectures for all 4 modules",
        "Tips and Tricks by British Council Ex-examiner",
        "Duration: 30 Days"
      ],

      duration: "30 Days",
      test_paper_limit: "7",
      bought: "0",
      free_package: "0",
      packageActive: "disable"
  },

  {
      package_color: "#ffe292",
      icon: "http://masterprep.info/newV1/./uploads/gallery/gold-package.svg",
      package_name: "Gold",
      star_count: "4",

      phy_content: [
        "2 IELTS Orientation Class at your nearest Masterprep Institute",
        "1 IELTS Course Book from Masterprep",
        "Email and Telephonic assistance",
      ],
      dig_content: [
        "10 IELTS practice tests with the trainer's feedback",
        "3 IELTS mock test with the trainer's feedback",
        "Video Lectures for all 4 modules",
        "Tips and Tricks by British Council Ex-examiner",
        "Duration: 60 Days"
      ],

      duration: "60 Day",
      test_paper_limit: "10",
      bought: "0",
      free_package: "0",
      packageActive: "disable",

  },
  {
      package_color: "#e2d7a1",
      icon: "http://masterprep.info/newV1/./uploads/gallery/platinum-package.svg",
      package_name: "Platinum",
      star_count: "5",

      phy_content: [
        "Complete IELTS Crash-course at your nearest Masterprep Institute ( Orientation class for the 4 Modules, 3 Days)",
        "1 IELTS Course Book from Masterprep",
        "Email and Telephonic assistance",
      ],
      dig_content: [
        "20 IELTS practice tests with the trainer's feedback",
        "5 IELTS mock test with the trainer's feedback",
        "Video Lectures for all 4 modules",
        "Tips and Tricks by British Council Ex-examiner",
        "Duration: 90 Days"
      ],

      duration: "90 Day",
      test_paper_limit: "20",
      bought: "0",
      free_package: "0",
      packageActive: "disable"
  }
];

@Injectable()
export class PackagesService {
  resources = {
    Packages: '/Packages',
    Add_student_package: '/Add_student_package',
    Package_history: '/Package_history',
  };
  url = environment.url + environment.apiVersion;

  constructor(
    private http: httpService,
    private user: UserV3Service
  ) {}

  getPackages() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        id: this.user.User.ID
      }),
    };

    return this.http.get(
      this.url + this.resources.Packages,
      httpOptions);
  }

  getPackage_history() {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.Package_history,
          {},
          { token, id: this.comm.id + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token,

          id: this.comm.id.toString(),
        }),
      };

      return this.httpWeb
        .get(this.url + this.resources.Package_history, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }

  paymentSync(package_id, amount, paymentId, code,Key,currency) {
    const token = this.comm.uuid;
    console.log("package_id", package_id);

    if (this.platform.is("cordova")) {
      const data = {
        package: package_id + "",
        amount: amount + "",
        paymentId: paymentId + "",
        code: code + "",
        id: this.comm.id + "",
        token: token + "",
        keyId: Key + "",
        currency: currency + ""
      };

      console.log(data);
      // alert(JSON.stringify(data));
      return from(this.httpNative.post(this.url + this.resources.Add_student_package, {},
        data
      )).pipe(
        map(ev => {
          this.comm.serverHtmlErrorHandling(ev);
           return  JSON.parse(ev.data)
       }),
          retry(this.comm.apiRetry))

    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          package: package_id + "",
        amount: amount + "",
        paymentId: paymentId + "",
        code: code + "",
        id: this.comm.id + "",
        token: token + "",
        keyId: Key + "",
        currency: currency + ""

        })
      };
      return this.httpWeb.post(this.url + this.resources.Add_student_package, {}, httpOptions).pipe(retry(this.comm.apiRetry))
    }
  }

  payWithRazor(price, package_id, paymentGatewayData) {
    paymentGatewayData = JSON.parse(paymentGatewayData);
    const options = {
      key: paymentGatewayData.key,
      amount: (price * 100) + '', // Payment amount in smallest denomiation e.g. cents for USD
      description: paymentGatewayData.description,
      currency: paymentGatewayData.currency, // your 3 letter currency code
      name: paymentGatewayData.name,
      prefill: {
        email: this.comm.email,
        contact: this.comm.mobile,
        name: this.comm.firstName + ' ' + this.comm.lastName,
      },
      theme: {
        color: '#E20030'
      }
    };

    console.log(options);
    console.log(paymentGatewayData);

    const successCallback = (payment_id) => {
      const opt = {
        amount: price,
        package_id,
        paymentId: payment_id,
        code: 1,
        Key: paymentGatewayData.key,
        currency: paymentGatewayData.currency,
      };

      console.log('=====> options: ' + JSON.stringify(opt));

      this.navCtr.navigateRoot([ 'package/paymentSucc', opt ]);
    };

    const failureCallback = (res) =>  {

      if( typeof(res) == 'string'){
        res = JSON.parse(res);
      }

      console.log('razor pay failurresponse: ', res)
      this.navCtr.navigateForward(['package/paymentSucc', { amount: price, package_id, paymentId: '', code: 0 , Key:'', currency:''}]);

    }

    Checkout.open(options).then(res => {
      console.log('razor pay success response: ', res.response);
      successCallback(res.response['razorpay_payment_id']);
    }).catch( failureCallback );
  }
}
