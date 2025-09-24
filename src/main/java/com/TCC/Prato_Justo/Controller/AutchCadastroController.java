package com.TCC.Prato_Justo.Controller;

import com.TCC.Prato_Justo.Model.Cadastro;
import com.TCC.Prato_Justo.Service.CadastroService;
import jakarta.persistence.Table;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AutchCadastroController {

   private final CadastroService cadastroService;

    public AutchCadastroController(CadastroService cadastroService) {
        this.cadastroService = cadastroService;
    }

    @PostMapping("registro")
    public Cadastro registro(@RequestBody Cadastro cadastro){
        return cadastroService.cadastrarNovoUsusario(cadastro);
    }

    @PostMapping("/cadastros")
    public String cadastros(@RequestBody Cadastro cadastro){
        Cadastro cad = cadastroService.fazerCadastro(cadastro.getUsername(), cadastro.getEmail(), cadastro.getPassword());
        if(cad != null){
            return "Cadastro Realizado" + cad.getUsername() + "!!!!!";

        }
        return "Usuario ou senha ou email errada !!!!";
    }
}
