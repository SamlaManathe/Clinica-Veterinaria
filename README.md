# 🐾 Clínica Veterinária – Sistema Web

Sistema web para gerenciamento de uma clínica veterinária, permitindo controle de secretários, animais, veterinarios e consultas de forma simples e intuitiva.

---

## 🌐 Links do Projeto

| Serviço | URL |
|--------|-----|
| **Frontend** | https://clinica-veterinaria-front.onrender.com |
| **API (Backend)** | https://clinica-veterinaria-ms90.onrender.com |
| **Swagger (Documentação da API)** | https://clinica-veterinaria-ms90.onrender.com/api-docs |

---

## ⚙️ Tecnologias

| Categoria | Tecnologias |
|--------|-----|
| **Frontend** | React, Axios |
| **Backend** | Node.js, Express, TypeScript, Prisma, Zod |
| **Banco** | PostgreSQL |

---

## 📌 Entidades do Sistema

| Entidades | Características |
|--------|-----|
| **Secretário 👩🏻‍💻** | nome, email, telefone e senha (criptografada com bcrypt) |
| **Animal 🐶** | nome, raça, espécie, idade, sexo, peso, data de nascimento e observações |
| **Responsável 👩🏻‍🦱** | nome, telefone e email |
| **Veterinário 🧑🏻‍⚕️** | nome, telefone, email, crmv, especialidade e descrição |
| **Consulta 📅** | data, horário, veterinário, animal, status, motivo, valor e anotações |

---

## 🖥️ Telas do Sistema

### 🔐 **Tela de Login**
- Login através de email e senha  
- Validação com **Zod**  
- Modal para cadastro rápido de novo secretário  

---

### 🏠 **Tela Home**
Acesso rápido aos módulos principais:
- Secretários  
- Animais  
- Veterinários  
- Consultas  

Interface responsiva e intuitiva.

---

### 🪪 **Tela de listagem para cada entidade**
Tabelas de animais, veterinarios, secretarios e consultas:
- Criar
- Editar  
- Deletar 
- Abrir ficha (consulta) 

---

### 📄 **Ficha da Consulta**
Cada consulta possui uma página dedicada contendo:

- Dados do animal  
- Dados do tutor  
- Informações do veterinário  
- Data, horário e valor da consulta  
- Observações  
- Exames listados em anotações (quando houver)  
- **Botão para imprimir** a ficha completa  

---


