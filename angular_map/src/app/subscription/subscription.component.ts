import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../map/services/user/user.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
  providers: [UserService] // O proporciona el servicio en el módulo raíz
})
export class SubscriptionComponent implements OnChanges {
  @Input() visible = false;
  @Input() sensors: { id: number, name: string }[] = [];
  @Output() closed = new EventEmitter<void>();

  selectedSensorId: number | null = null;
  email: string = '';

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sensors'] && this.sensors.length > 0 && this.selectedSensorId === null) {
      this.selectedSensorId = this.sensors[0].id;
    }
  }

  register() {
    if (!this.selectedSensorId || !this.email) {
      alert('Por favor selecciona un sensor y escribe tu correo.');
      return;
    }
    this.userService.setUser(
      this.selectedSensorId!,
      this.email
    ).subscribe({
      next: (res) => {
        alert('Registro exitoso');
        this.close();
      },
      error: (err) => {
        alert('Error al registrar: ' + err.message);
      }
    });
  }

  close() {
    this.closed.emit();
  }

  deleteSubscription() {
    if (!this.selectedSensorId || !this.email) {
      alert('Por favor selecciona un sensor y escribe tu correo.');
      return;
    }
    this.userService.getOneUser(this.selectedSensorId, this.email).subscribe({
      next: (res: any) => {
        if (res && res.id) {
          this.userService.deleteUser(res.id).subscribe({
            next: () => {
              alert('Suscripción eliminada exitosamente');
              this.close();
            },
            error: (err) => {
              alert('Error al eliminar la suscripción: ' + err.message);
            }
          });
        } else {
          alert('No se encontró la suscripción para eliminar.');
        }
      },
      error: (err) => {
        alert('Error al buscar usuario: ' + err.message);
      }
    });
  }
}
