import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaService } from '../../services/sala.service';
import { SalaDTO } from '../../DTO/sala.dto';

@Component({
  selector: 'app-gerenciar-salas',
  templateUrl: './gerenciar-salas.component.html',
  styleUrls: ['./gerenciar-salas.component.css']
})
export class GerenciarSalasComponent implements OnInit {

  salas: SalaDTO[] = [];
  salaForm: FormGroup;
  isEditMode = false;
  salaSelecionadaId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private salaService: SalaService
  ) {
    this.salaForm = this.fb.group({
      nomeSala: ['', [Validators.required, Validators.minLength(3)]],
      tipoSala: ['', Validators.required],
      predio: ['', Validators.required],
      complemento: [''],
      capacidade: [1, [Validators.required, Validators.min(1)]],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.isLoading = true;
    this.error = null;
    this.salaService.listarTodas().subscribe({
      next: (data) => {
        this.salas = (data ?? []).sort((a, b) => a.nomeSala.localeCompare(b.nomeSala));
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Erro ao carregar salas.';
        this.isLoading = false;
        console.error('Erro ao carregar salas:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.salaForm.invalid) {
      this.salaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = null;
    const salaDTO: SalaDTO = this.salaForm.value;

    if (this.isEditMode && this.salaSelecionadaId) {

      this.salaService.atualizar(this.salaSelecionadaId, salaDTO).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'atualizar')
      });
    } else {

      this.salaService.criar(salaDTO).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'criar')
      });
    }
  }

  onEditClick(sala: SalaDTO): void {
    this.isEditMode = true;
    this.salaSelecionadaId = sala.idSala!;
    this.salaForm.patchValue(sala);
    window.scrollTo(0, 0);
  }

  onDeleteClick(id: number): void {
    if (confirm('Tem certeza que deseja DELETAR esta sala? Esta ação não pode ser desfeita.')) {
      this.isLoading = true;
      this.salaService.deletar(id).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'deletar')
      });
    }
  }

  resetForm(): void {
    this.salaForm.reset({ ativo: true, capacidade: 1 });
    this.isEditMode = false;
    this.salaSelecionadaId = null;
    this.isLoading = false;
    this.error = null;
  }

  private handleError(error: any, acao: string): void {
    console.error(`Erro ao ${acao}:`, {
      status: error?.status,
      statusText: error?.statusText,
      url: error?.url,
      body: error?.error
    });

    if (error?.status === 0) {
      this.error = 'Falha de rede/CORS. Verifique a API.';
    } else if (error?.status === 401) {
      this.error = 'Não autenticado. Faça login novamente.';
    } else if (error?.status === 403) {
      this.error = 'Acesso negado. Você não tem permissão para esta ação.';
    } else {
      this.error = error?.error?.message || error?.error || `Erro ao ${acao} sala. Tente novamente.`;
    }
    this.isLoading = false;
  }
}
