import type Quill from 'quill';

// Registry global para instâncias do Quill
const quillRegistry = new Map<string, Quill>();

// Função para registrar uma instância do Quill
export function registerQuill(id: string, quill: Quill): void {
    quillRegistry.set(id, quill);
}

// Função para obter uma instância do Quill pelo ID
export function getQuillById(id: string): Quill | undefined {
    return quillRegistry.get(id);
}

// Função para remover uma instância do Quill
export function unregisterQuill(id: string): void {
    quillRegistry.delete(id);
}

// Função para obter a instância ativa do Quill
export function getCurrentQuill(currentQuillId: string | null): Quill | null {
    if (!currentQuillId) return null;
    return getQuillById(currentQuillId) || null;
}

// Função para gerar um ID único para uma instância do Quill
export function generateQuillId(): string {
    return `quill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
