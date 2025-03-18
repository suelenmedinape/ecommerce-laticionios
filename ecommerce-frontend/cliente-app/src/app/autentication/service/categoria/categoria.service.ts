import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias = [
    { id: 1, nome: "Leites e Bebidas", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { id: 2, nome: "Queijos", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    { id: 3, nome: "Iogurtes e Sobremesas", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { id: 4, nome: "Manteigas e Cremes", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  ];
  
  // Retorna as categorias como um Observable
  getCategorias(): Observable<{ id: number; nome: string; desc: string; }[]> {
    return of(this.categorias);
  }
 
  // Retorna uma categoria específica por ID como um Observable
  getCategoriaById(id: number): Observable<{ id: number; nome: string; desc: string; } | undefined> {
    const categoria = this.categorias.find((cat) => cat.id === id);
    return of(categoria);
  }
}
