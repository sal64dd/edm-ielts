import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-comm-loading',
  template: `
    <div class="w-100 h-100  d-flex justify-content-center align-items-center">
      <div class="mt-5"><img src="/assets/imgs/brand/logo_loader.gif" /></div>
    </div>
  `
})

export class CommLoadingComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@Component({
  selector: 'app-comm-err-500',
  templateUrl: '500.html'
})

export class CommErr500Component implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@Component({
  selector: 'app-comm-err-404',
  templateUrl: '404.html'
})

export class CommErr404Component implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@Component({
  selector: 'app-comm-err-network',
  template:  `<div class="w-100 h-100  d-flex flex-column justify-content-center align-items-center">
    <div class="mt-5"><h1>No Network!</h1></div>
    <div class="mt-3"><p>Please try again later!</p></div>
  </div>`
})

export class CommErrNetworkComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
