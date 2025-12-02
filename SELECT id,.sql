SELECT id,
       nome,
       email,
       crmv,
       especialidade,
       telefone,
       descricao,
       ativo,
       "createdAt",
       "updatedAt"
FROM public.veterinarios
LIMIT 1000;