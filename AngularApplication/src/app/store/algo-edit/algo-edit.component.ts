import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-algo-edit',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit {

  updateFormGroup: FormGroup;

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.eventService.subscribeToEvent('algo:test:updated', this.onAlgoUpdated.bind(this));
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

  onAlgoUpdated() {
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
