import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlgoService } from '../../services/algo.service';
import { Algo } from '../models/algo.interface';
import { TabsetComponent } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-algo-create',
  templateUrl: './algo-create.component.html',
  styleUrls: ['./algo-create.component.scss']
})
export class AlgoCreateComponent implements OnDestroy {

  @ViewChild('creationTabs') staticTabs: TabsetComponent;

  algoForm: FormGroup;
  Algo: Algo = {};
  editor: any;
  userFile: any;
  ready: boolean;
  algoSubmitted: boolean;
  algoErrors: string;

  subscriptions: Subscription[] = [];

  constructor(private algoService: AlgoService,
              private formBuilder: FormBuilder,
              private ref: ChangeDetectorRef,
              private router: Router) {

    this.algoForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['']
    });

    this.ready = true;
    this.algoSubmitted = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  onCodeUpdate(code: string): void {
    this.Algo.Content = code;
    this.ref.detectChanges();
  }

  nextTab(): void {
    this.staticTabs.tabs[1].active = true;
  }

  goBack(): void {
    this.algoSubmitted = false;
    this.ref.detectChanges();
    this.staticTabs.tabs[1].active = true;
    this.algoErrors = '';
  }

  openFile(event) {
    const input = event.target;
    this.userFile = event.target.files[0];
    if (!this.userFile) {
      return;
    }

    this.userFile['ext'] = this.userFile.name.substring(this.userFile.name.lastIndexOf('.') + 1);

    if (this.userFile['ext'] !== 'cs') {
      this.Algo.Content = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.Algo.Content = reader.result;
    };
    reader.readAsText(input.files[0]);
  }

  onSubmit(): void {
    if (!this.Algo.Content) {
      return;
    }

    this.ready = false;
    this.Algo.Content = btoa(this.Algo.Content);
    this.subscriptions.push(this.algoService.createAlgo({ ...this.algoForm.value, ...this.Algo }).subscribe((newAlgo) => {
      this.ready = true;
      this.algoSubmitted = true;
      this.Algo.AlgoId = newAlgo.Id;
    }, (error) => {
      this.Algo.Content = atob(this.Algo.Content);
      this.ready = true;
      this.algoSubmitted = true;
      this.algoErrors = error.DisplayMessage;
    }));
  }

}
