export interface Chamado{
    id: number;
    tipo: string;
    descricao: string;
    local: string;
    prioridade: string;
    data: Date;
    foto: string;
    usuarioId: number;
    status: string;
}