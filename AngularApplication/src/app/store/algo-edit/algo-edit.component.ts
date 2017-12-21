import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-algo-edit',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit, OnDestroy {

  updateFormGroup: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.subscriptions.push(
      this.eventService.algoTestUpdated.subscribe(this.onAlgoUpdated)
    );
  }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });

    this.updateFormGroup.setValue({
      id: this.storeService.activeAlgo.Id,
      name: this.storeService.activeAlgo.Name,
      description: this.storeService.activeAlgo.Description
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onAlgoUpdated = () => {
    this.router.navigate(['store/algo-list']);
  }

  update() {
    if (this.updateFormGroup.controls.name.value) {

      const algo = {
        Id: this.storeService.activeAlgo.Id,
        Name: this.updateFormGroup.controls.name.value,
        Description: this.updateFormGroup.controls.description.value
      };

      this.storeService.algoCreateDetails(algo);
    }
  }
}
