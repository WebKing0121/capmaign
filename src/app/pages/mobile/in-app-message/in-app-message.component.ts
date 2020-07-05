import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MODAL_DATA, ModalRef } from '@app-components/modal/modal-ref';
import { Campaign } from '@app-core/models/campaign';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tab } from '@app-core/models/common';

interface ComponentProps {
  createMode: boolean;
  inAppMessage: Campaign;
}

@Component({
  selector: 'app-in-app-message',
  templateUrl: './in-app-message.component.html',
  styleUrls: ['./in-app-message.component.scss']
})
export class InAppMessageComponent implements OnInit {

  createMode: boolean;
  isAndroid: boolean;
  isIphone: boolean;

  optionList: string[];
  step: boolean[];
  tabs: Tab[] = [
    {
      label: 'Audience',
      key: '0',
      selected: true
    },
    {
      label: 'In App Messages',
      key: '1',
      selected: false
    },
    {
      label: 'Device List',
      key: '2',
      selected: false
    },
    {
      label: 'Schedule',
      key: '3',
      selected: false
    },
    {
      label: 'Share',
      key: '4',
      selected: false
    },
    {
      label: 'Approve',
      key: '5',
      selected: false
    }
  ];

  isTextEditPadShow: boolean;
  isStyleEditPadShow: boolean;
  isViewModeEditPadShow: boolean;

  formGroup: FormGroup;
  headerTxt: string;
  bodyTxt: string;
  btnTxt1: string;
  btnTxt2: string;
  imagePath: any;
  selectedOption1: string;
  selectedOption2: string;
  isTxtBold: boolean;
  isTxtItalic: boolean;
  isTxtUnderline: boolean;
  txtWeight: number;
  txtStyle: string;
  txtUnderline: string;
  isBtnBold: boolean;
  isBtnItalic: boolean;
  isBtnUnderline: boolean;
  btnWeight: number;
  btnStyle: string;
  btnUnderline: string;
  txtAlignState: boolean[];
  txtAlign: string;
  fontList = ['Arial', 'Verdana', 'Impact', 'cursive,sans-serif', 'Tahoma, Geneva, sans-serif',
    'Verdana, Geneva, sans-serif', 'Courier New, Courier, monospace', 'Georgia, serif'];
  txtFontFamily: string;
  fontSizeList = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
  txtFontSize: string;
  txtColor: any;
  btnFontFamily: string;
  btnFontSize: string;
  btnColor: any;
  btnColor1: any;
  btnFill: boolean;
  scheduleOn: boolean;
  selectedDate: any;
  public model: any = {};

  constructor(
    private fb: FormBuilder,
    @Inject(MODAL_DATA) private props: ComponentProps,
    @Inject(ModalRef) private modalRef: ModalRef<InAppMessageComponent>
  ) {
    this.step = [true, false, false, false, false, false];
    this.isAndroid = false;
    this.isIphone = false;
    this.isTextEditPadShow = true;
    this.isStyleEditPadShow = false;
    this.isViewModeEditPadShow = false;
    this.isTxtBold = false;
    this.isTxtItalic = false;
    this.isTxtUnderline = false;
    this.txtWeight = 400;
    this.txtStyle = 'normal';
    this.txtUnderline = 'none';
    this.btnWeight = 400;
    this.btnStyle = 'normal';
    this.btnUnderline = 'none';
    this.txtAlignState = [false, false, false, false];
    this.txtAlign = 'left';
    this.txtFontFamily = 'Arial';
    this.txtFontSize = '12px';
    this.scheduleOn = false;
  }

  ngOnInit(): void {
    this.optionList = ['Tesh Header', 'UAT Header', 'UAT1010', 'Test In App', 'Test InApp'];
    this.createMode = this.props.createMode;
    this.formGroup = this.fb.group({
      headerTxt: '',
      bodyTxt: '',
      btnTxt1: '',
      btnTxt2: '',
      selectedOption1: '',
      selectedOption2: ''
    });
  }

  openContent(tab: number) {
    this.step = this.step.map(flag => flag = false);
    this.step[tab] = true;
  }

  onSelectTab(tab: Tab) {
    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }
    tab.selected = true;
    this.openContent(parseInt(tab.key, 10));
  }

  onDeviceModeClicked(deviceType: string) {
    if (!this.createMode) {
      return;
    } else {
      this.isAndroid = deviceType === 'android';
      this.isIphone = deviceType === 'iphone';
    }
  }

  onTextTabClicked() {
    this.isTextEditPadShow = true;
    this.isStyleEditPadShow = false;
    this.isViewModeEditPadShow = false;
  }

  onStyleTabClicked() {
    this.isTextEditPadShow = false;
    this.isStyleEditPadShow = true;
    this.isViewModeEditPadShow = false;
  }

  onViewTabClicked() {
    this.isTextEditPadShow = false;
    this.isStyleEditPadShow = false;
    this.isViewModeEditPadShow = true;
  }

  uploadImage(files) {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imagePath = reader.result;
    };
  }

  onBtnOption(id) {
    switch (id) {
      case 1:
        console.log(this.selectedOption1);
        break;
      case 2:
        console.log(this.selectedOption2);
        break;
    }
  }

  onClickBtn(id, event) {
    switch (id) {
      case 1:
        if (this.selectedOption1 === 'None') {
          event.preventDefault();
        }
        break;
      case 2:
        if (this.selectedOption2 === 'None') {
          event.preventDefault();
        }
        break;
    }
  }

  onTxtBoldClicked() {
    this.isTxtBold = !this.isTxtBold;

    if (this.isTxtBold) {
      this.txtWeight = 600;
    } else {
      this.txtWeight = 400;
    }
  }

  onTxtItalicClicked() {
    this.isTxtItalic = !this.isTxtItalic;

    if (this.isTxtItalic) {
      this.txtStyle = 'italic';
    } else {
      this.txtStyle = 'normal';
    }
  }

  onTxtUnderlineClicked() {
    this.isTxtUnderline = !this.isTxtUnderline;

    if (this.isTxtUnderline) {
      this.txtUnderline = 'underline';
    } else {
      this.txtUnderline = 'none';
    }
  }

  onBtnBoldClicked() {
    this.isBtnBold = !this.isBtnBold;

    if (this.isBtnBold) {
      this.btnWeight = 600;
    } else {
      this.btnWeight = 400;
    }
  }

  onBtnItalicClicked() {
    this.isBtnItalic = !this.isBtnItalic;

    if (this.isBtnItalic) {
      this.btnStyle = 'italic';
    } else {
      this.btnStyle = 'normal';
    }
  }

  onBtnUnderlineClicked() {
    this.isBtnUnderline = !this.isBtnUnderline;

    if (this.isBtnUnderline) {
      this.btnUnderline = 'underline';
    } else {
      this.btnUnderline = 'none';
    }
  }

  formatTxtAlign() {
    this.txtAlignState = [false, false, false, false];
  }

  onTxtAlignBtnClicked(id, type: string) {
    this.formatTxtAlign();
    this.txtAlignState[id] = true;
    this.txtAlign = type;
  }

  onTxtFontFamilySelected(event) {
    this.txtFontFamily = event.target.value;
  }

  onTxtFontSizeSelected(event) {
    this.txtFontSize = event.target.value + 'px';
  }

  onTxtColorChanged(event) {
    this.txtColor = event.target.value;
  }

  onBtnFontFamilySelected(event) {
    this.btnFontFamily = event.target.value;
  }

  onBtnFontSizeSelected(event) {
    this.btnFontSize = event.target.value + 'px';
  }

  onBtnColorChanged(event) {
    this.btnColor = event.target.value;
  }

  onBtnColorChanged1(event) {
    this.btnColor1 = event.target.value;
  }

  onFillTypeClicked(type: number) {
    this.btnFill = type === 1 ? true : false;
  }

  onScheduleOnBtnClicked(showFlag: boolean) {
    this.scheduleOn = showFlag;
  }

  onDateSelect(event): void {
    this.selectedDate = event;
  }

  sendInAppMessage() {
    this.modalRef.cancel();
  }

  onCloseModal() {
    this.modalRef.cancel();
  }
}
