import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AgendamentoService } from '../../../services/agendamento.service';
import { AgendamentoDTO } from '../../../models/agendamento.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBr from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarioComponent implements OnInit {
  calendarOptions: any;

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.calendarOptions = {
      height: 'auto',
      contentHeight: 'auto',
      initialView: 'timeGridWeek',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: ptBr,
      slotMinTime: '07:30:00',
      slotMaxTime: '22:30:00',
      allDaySlot: false,
      slotDuration: '00:30:00',
      nowIndicator: true,
      headerToolbar: { right: 'prev,next today' },
      buttonText: { today: 'Hoje' },
      events: [],
    };

    // Carrega os eventos da API assim que o componente é inicializado
    this.agendamentoService
      .getAgendamentos()
      .subscribe((eventos: AgendamentoDTO[]) => {
        this.calendarOptions.events = eventos.map((e) => ({
          title: `${e.usuarioNome} - ${e.salaNome}`, // usuário + sala
          start: e.dataInicio,
          end: e.dataFim,
        }));
      });
  }
}
