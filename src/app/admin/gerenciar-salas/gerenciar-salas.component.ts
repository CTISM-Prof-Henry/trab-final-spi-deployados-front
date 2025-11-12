// src/app/admin/gerenciar-salas/gerenciar-salas.component.ts

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
    private salaService: SalaService // Seu sala.service.ts já está correto
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
    this.salaService.listarTodas().subscribe(
      (data) => {
        this.salas = data.sort((a, b) => a.nomeSala.localeCompare(b.nomeSala));
        this.isLoading = false;
      },
      (err: any) => { // CORREÇÃO: Adicionado (err: any) para o TypeScript
        this.error = 'Erro ao carregar salas.';
        this.isLoading = false;
      }
    );
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
      // Atualizar
      this.salaService.atualizar(this.salaSelecionadaId, salaDTO).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'atualizar') // CORREÇÃO: (err: any)
      });
    } else {
      // Criar
      this.salaService.criar(salaDTO).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'criar') // CORREÇÃO: (err: any)
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
      this.salaService.deletar(id).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, 'deletar') // CORREÇÃO: (err: any)
      });
    }
  }

  onToggleAtivo(sala: SalaDTO): void {
    const novoStatus = !sala.ativo;
    const acao = novoStatus ? 'ativar' : 'desativar';

    if (confirm(`Tem certeza que deseja ${acao} a sala "${sala.nomeSala}"?`)) {
      this.salaService.atualizarStatus(sala.idSala!, novoStatus).subscribe({
        next: () => {
          this.carregarSalas();
          this.resetForm();
        },
        error: (err: any) => this.handleError(err, acao) // CORREÇÃO: (err: any)
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
    console.error(`Erro ao ${acao}:`, error);
    this.error = error.error?.message || error.error || `Erro ao ${acao} sala. Tente novamente.`;
    // Esta é a mensagem que você recebe do Java
    if (error.status === 403) {
      this.error = "Acesso negado. Você não tem permissão para esta ação.";
    }
    this.isLoading = false;
  }
}
