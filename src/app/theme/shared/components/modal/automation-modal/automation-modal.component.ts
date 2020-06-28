import { Component, OnInit, ViewChild, Input, ViewEncapsulation, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as go from 'gojs';
import { DiagramComponent, PaletteComponent, DataSyncService } from 'gojs-angular';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSelectData } from '@app-models/common';
import { Automation } from '@app-models/automation';
import { Subject } from 'rxjs';
import { AutomationService } from '@app-services/automation.service';
import { takeUntil } from 'rxjs/operators';
import {
  EmailPallete, SmsPallete, TriggerPallete, PreEventPallete,
  DuringEventPallete, PostEventPallete
} from '@app-core/enums/gojs-pallete.enum';

@Component({
  selector: 'app-automation-modal',
  templateUrl: './automation-modal.component.html',
  styleUrls: ['./automation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutomationModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public diagramNodeData: Array<go.ObjectData> = [];
  public diagramLinkData: Array<go.ObjectData> = [];
  public diagramDivClassName: string;
  public diagramModelData;
  public skipsDiagramUpdate = false;
  public paletteNodeData: Array<go.ObjectData> = [];
  public paletteLinkData: Array<go.ObjectData> = [];
  public paletteModelData;
  public paletteDivClassName = 'myPaletteDiv';
  public observedDiagram = null;
  public selectedNode: go.Node | null = null;

  @ViewChild('automationModal', { static: false }) automationModal;
  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;
  @Input() modalType = 'new';
  @Input() automation: Automation;

  automationForm: FormGroup;
  private unsubscribe$ = new Subject();
  automationFromDB: any;
  linkJson: any;
  automationPallete: any[];

  automationTypeList: NgSelectData[] = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'pre-event', label: 'Pre Event' },
    { value: 'during-event', label: 'During Event' },
    { value: 'post-event', label: 'Post Event' },
    { value: 'mobile-trigger', label: 'Mobile Trigger' },
  ];

  // initialize diagram / templates
  public initDiagram(): go.Diagram {
    const thisObj = this;
    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      contentAlignment: go.Spot.Center,
      model: $(go.GraphLinksModel,
        {
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };


    const makePort = (id: string, spot: go.Spot, output: boolean, input: boolean, toMaxLinks: number) => {
      return $(go.Shape, 'Circle',
        {
          fill: 'transparent',
          stroke: null,
          desiredSize: new go.Size(8, 8),
          alignment: spot,
          alignmentFocus: spot,
          portId: id,
          fromSpot: spot,
          toSpot: spot,
          fromLinkable: output,
          toLinkable: input,
          toMaxLinks,
          cursor: 'pointer',
          fromLinkableDuplicates: false,
          toLinkableDuplicates: false
        }
      );
    };

    const showPorts = (node: any, showFlag: boolean) => {
      const diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
        return;
      }
      node.ports.each(port => {
        port.stroke = (showFlag ? 'blue' : null);
      });
    };

    const defaultNodeStyle = () => {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center,
          mouseEnter: (e, obj) => { showPorts(obj.part, true); },
          mouseLeave: (e, obj) => { showPorts(obj.part, false); },
        }
      ];
    };

    const deleteNode = (e, obj) => {
      const { part: node } = obj;

      const { diagram } = node;

      if (diagram.journeystatus === 1) {
        console.warn('Event cannot be deleted for Active automation.');
        return;
      }

      // const key = node.data.key;
      diagram.remove(node);

      diagram.commandHandler.deleteSelection();
    };

    const startTemplate =
      $(go.Node, 'Spot', defaultNodeStyle(),
        $(go.Panel, 'Auto',
          $(go.Shape, 'Rectangle',
            { minSize: new go.Size(60, 50), fill: '#229954', stroke: null }),
          $(go.TextBlock, 'Start',
            { font: 'bold 11pt Helvetica, Arial, sans-serif', stroke: 'whitesmoke' },
            new go.Binding('text'))
        ),
        makePort('B', go.Spot.Bottom, true, false, 1)
      );
    const endTemplate =
      $(go.Node, 'Spot', defaultNodeStyle(),
        $(go.Panel, 'Auto',
          $(go.Shape, 'Rectangle',
            { minSize: new go.Size(60, 50), fill: '#DC3C00', stroke: null }),
          $(go.TextBlock, 'Start',
            { font: 'bold 11pt Helvetica, Arial, sans-serif', stroke: 'whitesmoke' },
            new go.Binding('text'))
        ),
        makePort('T', go.Spot.Top, false, true, 10)
      );
    const defaultTemplate = $(go.Node, 'Spot',
      defaultNodeStyle(),
      $(go.Panel, 'Auto',
        $(go.Shape,
          { fill: 'white', strokeWidth: 1, width: 275 },
          new go.Binding('stroke', 'stroke')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Left, margin: 4 },
          $(go.RowColumnDefinition, { column: 2, width: 4 }),
          $(go.TextBlock,
            {
              font: '11pt Helvetica, Arial, sans-serif',
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: false,
              text: 'text',
              alignment: go.Spot.Top,
              row: 0,
              column: 1,
              stroke: '#515151'
            },
            new go.Binding('text', 'text').makeTwoWay()),
          $(go.Picture,
            {
              width: 85,
              height: 85,
              row: 0,
              column: 0
            },
            new go.Binding('source'))
        )),
      makePort('T', go.Spot.Top, false, true, 1),
      makePort('L', go.Spot.Left, true, true, 1),
      makePort('R', go.Spot.Right, true, true, 1),
      makePort('B', go.Spot.Bottom, true, false, 1),
      {
        selectionAdornmentTemplate:
          $(go.Adornment, 'Spot',
            $(go.Panel, 'Auto',
              $(go.Shape, { fill: null, stroke: null, strokeWidth: 1 }),
              $(go.Placeholder)
            ),
            $('Button',
              {
                alignment: go.Spot.TopRight,
                alignmentFocus: go.Spot.Left,
                visible: true,
                click: deleteNode
              },
              $(go.Shape,
                {
                  figure: 'XLine',
                  width: 8,
                  height: 8,
                  fill: null,
                  stroke: 'dodgerblue',
                  strokeWidth: 2
                })
            )
          ), // end Adornment
      }
    );
    const templmap = new go.Map<string, go.Node>(); // In TypeScript you could write: new go.Map<string, go.Node>();
    // for each of the node categories, specify which template to use
    templmap.add('', defaultTemplate);
    templmap.add('Start', startTemplate);
    templmap.add('End', endTemplate);
    dia.nodeTemplateMap = templmap;

    const linkTemplate = $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        resegmentable: true,
      },
      // new go.Binding('points').makeTwoWay(),
      $(go.Shape),
      $(go.Shape, { toArrow: 'Standard' })
    );
    dia.linkTemplate = linkTemplate;
    return dia;
  }

  public diagramModelChange = (changes: go.IncrementalData) => {
    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  }



  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    const makePort = (name, spot, output, input) => {
      return $(go.Shape, 'Circle',
        {
          fill: 'transparent',
          stroke: null, // this is changed to 'white' in the showPorts function
          desiredSize: new go.Size(8, 8),
          alignment: spot,
          alignmentFocus: spot, // align the port on the main Shape
          portId: name, // declare this object to be a 'port'
          fromSpot: spot,
          toSpot: spot, // declare where links may connect at this port
          fromLinkable: output,
          toLinkable: input, // declare whether the user may draw links to/from here
          cursor: 'pointer' // show a different cursor to indicate potential link point
        });

    };

    const showPorts = (node, show) => {
      const { diagram } = node;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
        return;
      }
      node.ports.each(port => {
        port.stroke = (show ? '#36c6d3' : null);
      });
    };

    const defaultNodeStyle = () => {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center,
          mouseEnter: (e, obj) => { showPorts(obj.part, true); },
          mouseLeave: (e, obj) => { showPorts(obj.part, false); },
        }
      ];
    };

    const defaultTemplate = $(go.Node, 'Spot',
      defaultNodeStyle(),
      $(go.Panel, 'Auto',
        $(go.Picture,
          { width: 95, height: 95, },
          new go.Binding('source')
        )
      ),
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, true, true),
      makePort('R', go.Spot.Right, true, true),
      makePort('B', go.Spot.Bottom, true, false)
    );

    const startTemplate = $(go.Node, 'Spot',
      defaultNodeStyle(),
      $(go.Panel, 'Auto',
        $(go.Shape, 'Rectangle',
          { minSize: new go.Size(60, 50), fill: '#229954', stroke: null }),
        $(go.TextBlock, 'Start',
          { font: 'bold 11pt Helvetica, Arial, sans-serif', stroke: 'whitesmoke' },
          new go.Binding('text'))
      ),
      makePort('L', go.Spot.Left, true, false),
      makePort('R', go.Spot.Right, true, false),
      makePort('B', go.Spot.Bottom, true, false)
    );
    const endTemplate = $(go.Node, 'Spot',
      defaultNodeStyle(),
      $(go.Panel, 'Auto',
        $(go.Shape, 'Rectangle',
          { minSize: new go.Size(60, 50), fill: '#229954', stroke: null }),
        $(go.TextBlock, 'Start',
          { font: 'bold 11pt Helvetica, Arial, sans-serif', stroke: 'whitesmoke' },
          new go.Binding('text'))
      ),
      makePort('L', go.Spot.Left, true, false),
      makePort('R', go.Spot.Right, true, false),
      makePort('B', go.Spot.Bottom, true, false)
    );
    const templmap = new go.Map<string, go.Node>(); // In TypeScript you could write: new go.Map<string, go.Node>();
    // for each of the node categories, specify which template to use
    templmap.add('', defaultTemplate);
    templmap.add('Start', startTemplate);
    templmap.add('End', endTemplate);
    palette.nodeTemplateMap = templmap;
    palette.model = $(go.GraphLinksModel,
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      });

    return palette;
  }

  public paletteModelChange = (changes: go.IncrementalData) => {
    this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
    this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
    this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private automationService: AutomationService,
  ) {
    this.diagramDivClassName = 'myDiagramDiv';
    this.automationForm = this.fb.group({
      id: 0,
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.onChangeType();
  }

  public ngAfterViewInit() {
    if (this.observedDiagram) {
      return;
    }
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    // const appComp: AutomationModalComponent = this;
    // // listener for inspector
    // this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function (e) {
    //   if (e.diagram.selection.count === 0) {
    //     appComp.selectedNode = null;
    //   }
    //   const node = e.diagram.selection.first();
    //   if (node instanceof go.Node) {
    //     appComp.selectedNode = node;
    //   } else {
    //     appComp.selectedNode = null;
    //   }
    // });
  } // end ngAfterViewInit

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSaveAutomation() {

  }

  onChangeType() {
    this.automationForm.get('type').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        console.log(val);
        this.setPalleteData(val);
        this.updatePallete();
      });
  }

  edit() {
    const automationType = this.getAutomationTypeKey(this.automation);
    this.automationForm.setValue({
      id: this.automation.id,
      type: automationType,
      name: this.automation.name,
      description: this.automation.description,
    });

    this.automationModal.show();
    this.automationService.getAutomation(this.automation.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.automationFromDB = data.result;
          const linkJson = JSON.parse(this.automationFromDB.journeyEventLinkJson);

          this.setPalleteData(automationType);

          this.updatePallete();
          this.updateDiagram(linkJson);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  updatePallete() {
    this.paletteNodeData = [...this.automationPallete];

    setTimeout(() => {
      this.myPaletteComponent.updateFromAppData();
      this.myPaletteComponent.palette.scale = 0.8;
      this.myPaletteComponent.palette.redraw();
      // this.myPaletteComponent.palette.zoomToRect(this.myPaletteComponent.palette.documentBounds);
    });
  }
  updateDiagram(linkJson: any) {
    linkJson.nodeDataArray = linkJson.nodeDataArray.map(x => {
      if (x.source) {
        return { ...x, source: x.source.replace('/Common/Images', 'assets/images') };
      } else {
        return x;
      }
    });
    this.diagramNodeData = linkJson.nodeDataArray;
    this.diagramLinkData = linkJson.linkDataArray;
    setTimeout(() => {
      this.myDiagramComponent.updateFromAppData();

      this.myDiagramComponent.diagram.zoomToRect(this.myDiagramComponent.diagram.documentBounds);
      if (this.myDiagramComponent.diagram.scale > 1) {
        this.myDiagramComponent.diagram.scale = 1;
        this.myDiagramComponent.diagram.redraw();
      }
    });
  }

  create() {
    this.automationForm.reset();
    this.automationForm.setValue({
      id: 0,
      type: 'email',
      name: '',
      description: '',
    });
    this.automationModal.show();
  }

  hide() {
    this.automationModal.hide();
  }

  setPalleteData(automationType: string) {
    switch (automationType) {
      case 'email':
        this.automationPallete = EmailPallete;
        break;
      case 'sms':
        this.automationPallete = SmsPallete;
        break;
      case 'pre-event':
        this.automationPallete = PreEventPallete;
        break;
      case 'during-event':
        this.automationPallete = DuringEventPallete;
        break;
      case 'post-event':
        this.automationPallete = PostEventPallete;
        break;
      case 'mobile-trigger':
        this.automationPallete = TriggerPallete;
        break;
      default:
        this.automationPallete = [];
    }

  }
  getAutomationTypeKey(automation: Automation) {
    if (automation.eventAutomationType === 0 && automation.automationType === 0) {
      return 'email';
    }
    if (automation.eventAutomationType === 2 && automation.automationType === 0) {
      return 'during-event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 2) {
      return 'pre-event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 1) {
      return 'sms';
    }
    if (automation.eventAutomationType === 1 && automation.automationType === 0) {
      return 'post-event';
    }
    return 'unknown';
  }
}
