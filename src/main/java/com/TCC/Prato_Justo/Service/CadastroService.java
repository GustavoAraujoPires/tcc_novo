package com.TCC.Prato_Justo.Service;


import com.TCC.Prato_Justo.Interface.AnthCadastroRepository;
import com.TCC.Prato_Justo.Model.Cadastro;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class CadastroService {

    private final AnthCadastroRepository autchCadastroRepository;
    private final PasswordEncoder passwordEncoder;


    public CadastroService(AnthCadastroRepository autchCadastroRepository, PasswordEncoder passwordEncoder) {
        this.autchCadastroRepository = autchCadastroRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Cadastro fazerCadastro(String username, String password, String email){
       Cadastro cadastro = new Cadastro();
       cadastro.setUsername(username);
       cadastro.setEmail(email);
       cadastro.setPassword(password);
       return autchCadastroRepository.save(cadastro);
    }

    public Cadastro cadastrarNovoUsusario(Cadastro cadastro){
        return autchCadastroRepository.save(cadastro);
    }
    // Cria usuário com senha criptografada
    public Cadastro cadastrarNovoUsuario(Cadastro cadastro){
        cadastro.setPassword(passwordEncoder.encode(cadastro.getPassword()));
        return autchCadastroRepository.save(cadastro);
    }

    // Autentica login
    public boolean autenticar(String email, String senha) {
        Cadastro cad = autchCadastroRepository.findByEmail(email); // retorna null se não encontrar
        if (cad != null) {
            return passwordEncoder.matches(senha, cad.getPassword()); // compara senha com hash
        }
        return false;
    }

    public boolean autenticarlogin(String email, String senha){
        Cadastro cad = autchCadastroRepository.findByEmail(email);
        if(cad != null){
            System.out.println("Senha do banco: " + cad.getPassword());
            System.out.println("Senha digitada: " + senha);
            boolean match = passwordEncoder.matches(senha, cad.getPassword());
            System.out.println("Senha bate? " + match);
            return match;
        } else {
            System.out.println("Usuário não encontrado para email: " + email);
        }
        return false;
    }


}

