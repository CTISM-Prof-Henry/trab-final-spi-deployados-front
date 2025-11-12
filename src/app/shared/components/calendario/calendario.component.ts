import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AgendamentoService } from '../../../services/agendamento.service';
import { AgendamentoDTO } from '../../../DTO/agendamento.dto';
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
export class CalendarioComponent implements OnInit, OnChanges {
  @Input() salaSelecionadaId!: number;
  calendarOptions: any;

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.inicializarCalendario();
    if (this.salaSelecionadaId) {
      this.carregarAgendamentos();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['salaSelecionadaId'] && this.salaSelecionadaId) {
      console.log('Sala selecionada no Calendario:', this.salaSelecionadaId);
      this.carregarAgendamentos();
    }
  }

  inicializarCalendario() {
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
  }

  carregarAgendamentos() {
    console.log('Carregando agendamentos para a sala:', this.salaSelecionadaId);

    this.agendamentoService
      .getAgendamentosPorSala(this.salaSelecionadaId)
      .subscribe((eventos: AgendamentoDTO[]) => {
        const eventosCalendario = eventos.map((e) => ({
          title: `${e.usuarioNome} - ${e.salaNome}`,
          start: new Date(e.dataInicio),
          end: new Date(e.dataFim),
        }));

        console.log(
          'Eventos transformados para o calendário:',
          eventosCalendario
        );

        this.calendarOptions.events = eventosCalendario;
      });
  }
}
