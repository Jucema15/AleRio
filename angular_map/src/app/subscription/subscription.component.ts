import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnChanges {
  @Input() visible = false;
  @Input() sensors: { id: number, name: string }[] = [];
  @Output() closed = new EventEmitter<void>();

  selectedSensorId: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sensors'] && this.sensors.length > 0 && this.selectedSensorId === null) {
      this.selectedSensorId = this.sensors[0].id;
    }
  }

  close() {
    this.closed.emit();
  }
}
