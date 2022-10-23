import {Component, OnInit} from '@angular/core';
import {Pensamento} from "../Pensamento";
import {PensamentoService} from "../pensamento.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-excluir-pensamento',
    templateUrl: './excluir-pensamento.component.html',
    styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

    /*pensamento: Pensamento = new Pensamento(0, '', '', '');*/
    pensamento: Pensamento = {
        id: 0,
        conteudo: '',
        modelo: '',
        autoria: ''
    }

    constructor(private service: PensamentoService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.service.buscarPorId(parseInt(id!)).subscribe((pensamento: Pensamento) => {
            this.pensamento = pensamento;
        });
    }

    excluirPensamento() {
        console.log("Passou por aqui...")
        if (this.pensamento != null && this.pensamento.id != null) {
            this.service.excluir(this.pensamento.id).subscribe(() => {
                this.router.navigate(['/listarPensamento']);
            })
            this.router.navigate(['/listarPensamento'])
        }
    }

    cancelar() {
        this.router.navigate(['/listarPensamento']);
    }
}
