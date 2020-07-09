import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app-components/modal/modal.service';
import { FacebookAdsCreateComponent } from '../facebook-ads-create/facebook-ads-create.component';

@Component({
  selector: 'app-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss']
})
export class FacebookAdsComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: ModalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onClickCreate() {
    this.router.navigate(['new-ads'], { relativeTo: this.route });
  }
}
