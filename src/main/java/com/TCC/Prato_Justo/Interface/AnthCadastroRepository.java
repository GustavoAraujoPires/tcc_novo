package com.TCC.Prato_Justo.Interface;

import com.TCC.Prato_Justo.Model.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnthCadastroRepository extends JpaRepository<Cadastro, Long> {
    Optional<Cadastro> findByUsernameAndPasswordAndEmail(String username, String password, String email);
}
