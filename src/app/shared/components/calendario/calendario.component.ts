import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {

  calendarOptions: any = {
    initialView: 'timeGridWeek',   // visualização semanal em grade de horários
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // 👈 registra os plugins aqui
    slotMinTime: '07:30:00',       // hora inicial
    slotMaxTime: '19:00:00',       // hora final
    allDaySlot: false,             // remove a linha "dia inteiro"
    slotDuration: '00:30:00',      // intervalo dos horários (30 min)
    nowIndicator: true,            // linha indicando a hora atual
    events: [
      {
        title: 'Internet das Coisas - Dsc808',
        start: '2025-08-11T08:30:00',
        end: '2025-08-11T10:30:00',
        color: '#3a87ad'
      },
      {
        title: 'Mineração de Dados - Elc098',
        start: '2025-08-12T08:30:00',
        end: '2025-08-12T10:30:00',
        color: '#ad2121'
      },
      {
        title: 'Laboratório de Programação II',
        start: '2025-08-11T14:30:00',
        end: '2025-08-11T16:15:00',
        color: '#1e90ff'
      }
    ]
  };
}
