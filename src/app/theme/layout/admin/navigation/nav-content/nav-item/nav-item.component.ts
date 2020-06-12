import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { NextConfig } from '../../../../../../app-config';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() item: NavigationItem;
  public nextConfig: any;
  public themeLayout: string;

  constructor(private location: Location) {
    this.nextConfig = NextConfig.config;
    this.themeLayout = this.nextConfig.layout;
  }

  ngOnInit() {
  }

  closeOtherMenu(event) {
    if (this.nextConfig.layout === 'vertical') {
      const ele = event.target;
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const upParent = parent.parentElement.parentElement;
        const lastParent = upParent.parentElement;
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        sections.forEach(x => {
          x.classList.remove('active');
          x.classList.remove('pcoded-trigger');
        });
        // for (let i = 0; i < sections.length; i++) {
        //   sections[i].classList.remove('active');
        //   sections[i].classList.remove('pcoded-trigger');
        // }

        if (parent.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('pcoded-trigger');
          parent.classList.add('active');
        } else if (upParent.classList.contains('pcoded-hasmenu')) {
          upParent.classList.add('pcoded-trigger');
          upParent.classList.add('active');
        } else if (lastParent.classList.contains('pcoded-hasmenu')) {
          lastParent.classList.add('pcoded-trigger');
          lastParent.classList.add('active');
        }
      }
      if ((document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
      }
    } else {
      setTimeout(() => {
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        sections.forEach(x => {
          x.classList.remove('active');
          x.classList.remove('pcoded-trigger');
        });
        // for (let i = 0; i < sections.length; i++) {
        //   sections[i].classList.remove('active');
        //   sections[i].classList.remove('pcoded-trigger');
        // }

        let currentUrl = this.location.path();
        const key = '_baseHref';
        if (this.location[key]) {
          currentUrl = this.location[key] + this.location.path();
        }
        const link = `a.nav-link[ href='${currentUrl}' ]`;
        const ele = document.querySelector(link);
        if (ele !== null && ele !== undefined) {
          const parent = ele.parentElement;
          const upParent = parent.parentElement.parentElement;
          const lastParent = upParent.parentElement;
          if (parent.classList.contains('pcoded-hasmenu')) {
            parent.classList.add('active');
          } else if (upParent.classList.contains('pcoded-hasmenu')) {
            upParent.classList.add('active');
          } else if (lastParent.classList.contains('pcoded-hasmenu')) {
            lastParent.classList.add('active');
          }
        }
      }, 500);
    }
  }

}
