# Guardian402

> API de verificação de boletos paga por uso, construída sobre Stellar, Soroban e o protocolo x402.

## 1. Contexto do desafio

Este projeto será desenvolvido para a bounty:

- **Evento:** Stellar Builder Summit SP 2026
- **Lane:** Payments and Agent Tooling — SDF DevEx
- **Sub-lane:** 3A — Agentic Payments (x402 / MPP)
- **Encerramento:** 6 de agosto de 2026, às 17:00
- **Entregáveis mínimos:** repositório GitHub e demonstração funcional
- **Regra importante:** o código submetido deve ser trabalho original do desafio

O projeto usa o problema do Boleto Guardian como inspiração, mas todo o código incluído nesta submissão deverá ser criado especificamente para o desafio.

## 2. Nome do projeto

**Guardian402**

### Tagline

> Pay per verification. Trust every boleto.

### Descrição curta

Guardian402 permite que um agente de IA, ERP ou aplicação pague automaticamente uma pequena quantia em USDC para verificar se os dados de um boleto correspondem a um registro de integridade armazenado em um contrato Soroban.

## 3. Problema

Empresas recebem e processam grandes volumes de boletos, mas nem sempre conseguem confirmar automaticamente se o boleto apresentado ao cliente corresponde aos dados esperados pelo sistema empresarial.

Uma verificação tradicional depende de:

- integrações fechadas;
- contratos comerciais;
- autenticação por API key;
- cobrança mensal;
- processos manuais;
- infraestrutura específica para cada fornecedor.

Isso dificulta o consumo da verificação por agentes de IA e automações independentes.

## 4. Solução

Guardian402 expõe uma API protegida pelo protocolo x402.

O cliente chama a API sem precisar criar conta, contratar plano ou receber uma API key. A própria resposta HTTP informa:

- quanto custa a verificação;
- em qual rede o pagamento deve ocorrer;
- qual ativo será usado;
- qual endereço receberá o valor.

O agente assina a autorização de pagamento, repete a chamada e recebe o resultado da verificação.

```text
Agente, ERP ou CLI
        |
        | POST /v1/verify
        | boletoId + expectedHash
        v
Guardian402 API
        |
        | 402 Payment Required
        | instruções x402
        v
Agente autoriza pagamento em USDC
        |
        | repete a requisição com PAYMENT-SIGNATURE
        v
Facilitador x402 verifica e liquida o pagamento
        |
        v
Guardian402 consulta o contrato Soroban
        |
        v
AUTHENTIC | MISMATCH | NOT_FOUND
```

## 5. Proposta de valor

Guardian402 demonstra um caso real de pagamento agêntico:

- uma máquina compra uma verificação;
- a cobrança acontece por requisição;
- não existe assinatura mensal;
- não existe cadastro prévio;
- não existe API key do consumidor;
- o pagamento é liquidado na Stellar;
- a verificação usa um registro imutável em Soroban;
- nenhum dado pessoal precisa ser armazenado on-chain.

## 6. Escopo obrigatório do MVP

O MVP precisa comprovar apenas este fluxo:

1. Registrar o hash de um boleto em um contrato Soroban.
2. Fazer uma chamada sem pagamento à API.
3. Receber `HTTP 402 Payment Required`.
4. O cliente x402 autorizar o pagamento em USDC na Stellar Testnet.
5. Repetir automaticamente a chamada.
6. A API consultar o contrato Soroban.
7. Retornar o resultado da comparação.
8. Mostrar a transação de pagamento e o contrato no explorer.

Não implementar funcionalidades que não contribuam diretamente para essa demonstração.

## 7. O que não faz parte do MVP

Não implementar inicialmente:

- integração real com bancos;
- leitura de PDF;
- OCR;
- PIX;
- conta de usuário;
- painel administrativo completo;
- banco de dados empresarial;
- integração com Protheus;
- múltiplos ERPs;
- IA generativa;
- mainnet;
- MPP Channel;
- cobrança variável;
- token próprio;
- armazenamento de CPF, CNPJ ou dados bancários;
- indexador complexo;
- produção financeira real.

Esses itens podem ser apresentados como evolução futura, mas não devem atrasar a demo.

## 8. Stack recomendada

### Aplicação

- **Node.js:** versão LTS
- **Linguagem:** TypeScript
- **API:** Express
- **Validação:** Zod
- **Cliente:** TypeScript CLI
- **Testes:** Vitest
- **Monorepo:** npm workspaces

### Stellar

- **Rede:** Stellar Testnet
- **Contrato:** Soroban em Rust
- **SDK JavaScript:** `@stellar/stellar-sdk`
- **Pagamento:** x402
- **Scheme:** `exact`
- **Ativo:** USDC Testnet
- **Rede x402:** `stellar:testnet`

### Pacotes x402

```bash
npm install express dotenv zod
npm install @stellar/stellar-sdk
npm install @x402/core @x402/express @x402/fetch @x402/stellar
```

### Facilitador

Usar inicialmente o facilitador hospedado informado pela documentação oficial.

Opção recomendada para o desafio:

```env
X402_FACILITATOR_URL=https://channels.openzeppelin.com/x402/testnet
```

O facilitador é responsável por:

- validar o payload x402;
- conferir valor, rede e destinatário;
- verificar a autorização assinada;
- simular a transação;
- liquidar o pagamento on-chain;
- devolver a confirmação ao servidor.

## 9. Arquitetura

```text
guardian402/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── server.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   └── cli/
│       ├── src/
│       │   ├── commands/
│       │   ├── x402/
│       │   └── index.ts
│       ├── tests/
│       └── package.json
│
├── contracts/
│   └── verification-registry/
│       ├── src/
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
│
├── packages/
│   ├── contract-client/
│   └── shared/
│
├── scripts/
│   ├── create-wallets.sh
│   ├── deploy-contract.sh
│   ├── seed-demo.sh
│   └── run-demo.sh
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEMO.md
│   ├── SECURITY.md
│   └── SUBMISSION.md
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## 10. Componentes

### 10.1 Verification Registry

Contrato Soroban mínimo responsável por armazenar a prova de integridade.

O contrato não deve armazenar:

- código de barras completo;
- linha digitável;
- CPF;
- CNPJ;
- nome;
- valor;
- banco;
- dados do pagador;
- dados do beneficiário.

O contrato deverá armazenar apenas identificadores e hashes.

### 10.2 Guardian402 API

API Express que:

1. recebe o pedido de verificação;
2. exige pagamento x402;
3. valida o corpo da requisição;
4. consulta o contrato;
5. compara o hash;
6. devolve o resultado.

### 10.3 Agent Client

Cliente de linha de comando que:

1. recebe os dados da verificação;
2. chama a API;
3. interpreta o `HTTP 402`;
4. cria e assina o payload de pagamento;
5. repete a chamada;
6. mostra o resultado;
7. mostra a confirmação do pagamento.

## 11. Modelo do contrato Soroban

### Estrutura lógica

```rust
pub struct VerificationRecord {
    pub document_hash: BytesN<32>,
    pub registered_at: u64,
    pub active: bool,
}
```

### Chave

A chave pública do registro pode ser derivada de:

```text
record_key = SHA256(normalized_boleto_id)
```

O `normalized_boleto_id` nunca precisa ser persistido diretamente no contrato.

### Funções mínimas

```rust
initialize(admin: Address)
register(admin: Address, record_key: BytesN<32>, document_hash: BytesN<32>)
verify(record_key: BytesN<32>, document_hash: BytesN<32>) -> VerificationStatus
revoke(admin: Address, record_key: BytesN<32>)
get(record_key: BytesN<32>) -> Option<VerificationRecord>
```

### Status

```rust
pub enum VerificationStatus {
    Authentic,
    Mismatch,
    NotFound,
    Revoked,
}
```

### Regras

- `initialize` só pode ser executado uma vez.
- `register` exige autenticação do administrador.
- `revoke` exige autenticação do administrador.
- `verify` é somente leitura.
- o contrato não recebe pagamentos;
- o pagamento x402 ocorre antes da execução da rota protegida;
- emitir eventos em `register` e `revoke`;
- criar testes unitários para todos os status.

## 12. Normalização e geração dos hashes

Para a demo, o cliente poderá receber:

- `boletoId`;
- `amount`;
- `dueDate`;
- `beneficiaryDocument`.

Antes de gerar o hash:

1. remover espaços;
2. remover pontuação do identificador;
3. normalizar a data para `YYYY-MM-DD`;
4. normalizar o valor para centavos inteiros;
5. normalizar o documento para somente números;
6. concatenar os campos numa ordem fixa;
7. aplicar SHA-256.

Exemplo de string canônica:

```text
23793381286000000000123456789012345678901234|15990|2026-08-10|12345678000199
```

Exemplo conceitual:

```text
recordKey = SHA256(normalizedBoletoId)
documentHash = SHA256(recordKey + "|" + amountInCents + "|" + dueDate + "|" + beneficiaryDocument)
```

A implementação precisa ter uma única função compartilhada de canonicalização para impedir divergência entre:

- seed;
- API;
- CLI;
- testes.

## 13. API

### Rota pública de saúde

```http
GET /health
```

Resposta:

```json
{
  "status": "ok",
  "service": "guardian402",
  "network": "stellar:testnet"
}
```

### Informações do serviço

```http
GET /v1/info
```

Resposta:

```json
{
  "name": "Guardian402",
  "description": "Pay-per-use boleto integrity verification",
  "price": "$0.01",
  "asset": "USDC",
  "network": "stellar:testnet",
  "contractId": "C..."
}
```

### Verificação paga

```http
POST /v1/verify
Content-Type: application/json
```

Corpo:

```json
{
  "boletoId": "23793381286000000000123456789012345678901234",
  "amount": "159.90",
  "dueDate": "2026-08-10",
  "beneficiaryDocument": "12345678000199"
}
```

Primeira resposta esperada:

```http
HTTP/1.1 402 Payment Required
PAYMENT-REQUIRED: ...
```

Após o pagamento:

```json
{
  "status": "AUTHENTIC",
  "message": "The supplied boleto data matches the registered proof.",
  "proof": {
    "recordKey": "a4c1...",
    "documentHash": "f89e...",
    "contractId": "C...",
    "network": "stellar:testnet"
  },
  "payment": {
    "protocol": "x402",
    "asset": "USDC",
    "amount": "0.01",
    "transactionHash": "..."
  },
  "verifiedAt": "2026-08-05T14:30:00.000Z"
}
```

### Status HTTP da aplicação

O pagamento x402 usa `402` antes da autorização. Depois da autorização:

- `200`: verificação executada, inclusive `MISMATCH`, `NOT_FOUND` ou `REVOKED`;
- `400`: corpo inválido;
- `500`: erro inesperado;
- `503`: RPC ou facilitador indisponível.

Não usar `404` para `NOT_FOUND`, pois o recurso consultado é o serviço de verificação e ele foi executado corretamente.

## 14. Resultado da verificação

### AUTHENTIC

O registro existe, está ativo e o hash corresponde.

### MISMATCH

O registro existe, mas os dados recebidos geraram um hash diferente.

### NOT_FOUND

Não existe registro para o identificador enviado.

### REVOKED

O registro existe, mas foi revogado pelo administrador.

## 15. Proteção x402

A rota protegida deve usar o middleware oficial x402.

Configuração conceitual:

```ts
const NETWORK = "stellar:testnet";
const PRICE = "$0.01";
const ROUTE = "POST /v1/verify";
```

O servidor deverá usar:

```ts
import { paymentMiddlewareFromConfig } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
```

O cliente deverá usar:

```ts
import { x402Client, x402HTTPClient } from "@x402/fetch";
import {
  createEd25519Signer,
  getNetworkPassphrase
} from "@x402/stellar";
import { ExactStellarScheme } from "@x402/stellar/exact/client";
```

Não escrever um protocolo de pagamento próprio. Usar os pacotes oficiais e seguir o quickstart atual da Stellar.

## 16. Variáveis de ambiente

Criar `.env.example`:

```env
NODE_ENV=development
PORT=3001

STELLAR_NETWORK=stellar:testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org

VERIFICATION_CONTRACT_ID=C...

X402_PRICE=$0.01
X402_PAY_TO=G...
X402_FACILITATOR_URL=https://channels.openzeppelin.com/x402/testnet
X402_FACILITATOR_API_KEY=

# Somente no cliente local de demonstração.
# Nunca commitar esta chave.
STELLAR_PRIVATE_KEY=S...
```

### Segurança

- nunca versionar `.env`;
- nunca expor `STELLAR_PRIVATE_KEY` no frontend;
- usar uma carteira nova apenas para Testnet;
- adicionar `.env*` ao `.gitignore`;
- não registrar segredos nos logs;
- não retornar segredo em mensagens de erro.

## 17. CLI

Comando esperado:

```bash
npm run guardian -- verify \
  --boleto-id "23793381286000000000123456789012345678901234" \
  --amount "159.90" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"
```

Saída esperada:

```text
Guardian402

Target: http://localhost:3001/v1/verify
Network: stellar:testnet
Price: 0.01 USDC

[1/4] Requesting verification...
[2/4] HTTP 402 received.
[3/4] Authorizing and settling x402 payment...
[4/4] Reading verification result...

Result: AUTHENTIC
Payment transaction: 3f2c...
Contract: CABC...
```

O CLI deve retornar código diferente de zero apenas para falhas técnicas.

`MISMATCH`, `NOT_FOUND` e `REVOKED` são resultados válidos da verificação, não erros de execução.

## 18. Casos de demonstração

O script `seed-demo` deve criar quatro casos previsíveis.

### Caso 1 — Autêntico

Entrada igual ao registro.

Resultado:

```text
AUTHENTIC
```

### Caso 2 — Valor alterado

Mesmo identificador, mas valor diferente.

Resultado:

```text
MISMATCH
```

### Caso 3 — Não registrado

Identificador inexistente.

Resultado:

```text
NOT_FOUND
```

### Caso 4 — Revogado

Registro previamente cadastrado e depois revogado.

Resultado:

```text
REVOKED
```

A demo principal deve usar o caso `AUTHENTIC`. Os outros três casos devem estar disponíveis para mostrar consistência.

## 19. Ordem de implementação

### Fase 0 — Preparação

- criar repositório novo;
- criar README inicial;
- configurar monorepo;
- instalar dependências;
- criar `.env.example`;
- configurar lint, format e testes;
- registrar no README que o projeto começou durante o desafio.

### Fase 1 — Prova x402 isolada

Antes de criar o contrato:

- executar o quickstart x402 oficial;
- criar uma rota simples protegida;
- confirmar `HTTP 402`;
- confirmar pagamento pela carteira cliente;
- confirmar resposta `HTTP 200`;
- salvar o hash da transação.

**Critério de aceite:** uma chamada paga funciona de ponta a ponta.

### Fase 2 — Contrato Soroban

- implementar `initialize`;
- implementar `register`;
- implementar `verify`;
- implementar `revoke`;
- criar eventos;
- criar testes;
- fazer deploy na Testnet;
- salvar o Contract ID.

**Critério de aceite:** os quatro resultados podem ser reproduzidos via testes e CLI Stellar.

### Fase 3 — Contract Client

- criar adapter TypeScript;
- implementar leitura do contrato;
- converter valores Soroban;
- mapear status para a resposta da API;
- tratar falhas de RPC.

**Critério de aceite:** um script TypeScript consulta o contrato implantado.

### Fase 4 — API Guardian402

- criar schemas Zod;
- criar canonicalização;
- proteger `POST /v1/verify`;
- integrar o contract client;
- retornar schema estável;
- adicionar logs sem dados sensíveis.

**Critério de aceite:** a rota exige pagamento e retorna o status real do contrato.

### Fase 5 — Agent Client

- interpretar `PAYMENT-REQUIRED`;
- assinar a autorização;
- enviar `PAYMENT-SIGNATURE`;
- interpretar `PAYMENT-RESPONSE`;
- mostrar resultado e transação.

**Critério de aceite:** um único comando executa pagamento e verificação.

### Fase 6 — Documentação

- completar README;
- adicionar diagrama;
- documentar setup;
- documentar variáveis;
- documentar contrato;
- documentar riscos;
- criar roteiro da demo;
- adicionar links do explorer.

### Fase 7 — Submissão

- executar a demo do zero;
- gravar vídeo;
- validar repositório público;
- conferir ausência de chaves;
- conferir licença;
- conferir prazo;
- enviar o link correto.

## 20. Prioridade de execução

```text
P0 — fluxo x402 funcionando
P0 — contrato consultável
P0 — CLI pagando e verificando
P0 — README reproduzível
P1 — quatro cenários de demo
P1 — vídeo
P2 — página web
P2 — MPP
P3 — integração ERP
```

A página web só deve ser construída depois que API, x402, contrato e CLI estiverem funcionando.

## 21. Critérios de aceite do MVP

A entrega está pronta quando:

- [ ] o repositório é público;
- [ ] o projeto instala com comandos documentados;
- [ ] o contrato foi criado durante o desafio;
- [ ] o contrato está implantado na Stellar Testnet;
- [ ] o Contract ID está no README;
- [ ] existe ao menos um registro de demonstração;
- [ ] a chamada sem pagamento retorna `402`;
- [ ] o cliente paga em USDC Testnet;
- [ ] o facilitador liquida o pagamento;
- [ ] a chamada paga retorna `200`;
- [ ] a API consulta o contrato;
- [ ] o caso autêntico retorna `AUTHENTIC`;
- [ ] o caso alterado retorna `MISMATCH`;
- [ ] o caso inexistente retorna `NOT_FOUND`;
- [ ] o caso revogado retorna `REVOKED`;
- [ ] a resposta mostra a transação de pagamento;
- [ ] os testes principais passam;
- [ ] nenhuma chave secreta foi commitada;
- [ ] o README contém arquitetura e instruções;
- [ ] a demonstração pode ser repetida;
- [ ] o vídeo mostra o fluxo completo.

## 22. Testes mínimos

### Contrato

- inicialização única;
- administrador autenticado;
- registro válido;
- tentativa de registro sem autorização;
- verificação autêntica;
- verificação divergente;
- registro inexistente;
- registro revogado.

### API

- body inválido;
- campos ausentes;
- data inválida;
- valor inválido;
- normalização determinística;
- mapeamento dos quatro status;
- falha de RPC;
- rota de saúde.

### Integração

- chamada sem pagamento retorna `402`;
- chamada paga retorna `200`;
- pagamento vai para `X402_PAY_TO`;
- retorno contém confirmação;
- contrato é consultado somente após a autorização do pagamento.

## 23. Segurança e privacidade

### Princípios

- armazenar apenas hashes;
- minimizar dados;
- não expor segredo do agente;
- não confiar em entrada do cliente;
- limitar tamanho do body;
- validar formatos;
- adicionar timeout ao RPC;
- não considerar pagamento como prova de autenticidade;
- não considerar hash como prova de pagamento do boleto;
- diferenciar claramente integridade de quitação.

### Aviso obrigatório

O projeto verifica a correspondência entre dados fornecidos e um registro de integridade. Ele não confirma:

- liquidação bancária;
- compensação;
- titularidade da conta;
- identidade do beneficiário no sistema bancário;
- ausência de fraude fora dos dados registrados;
- pagamento efetivo do boleto.

Texto recomendado:

> Guardian402 verifies whether supplied boleto data matches a previously registered integrity proof. It does not confirm bank settlement or payment status.

## 24. Diferenciais para os jurados

### Caso real

O pagamento x402 não foi adicionado artificialmente. Cada verificação é uma unidade de valor independente e mensurável.

### Agente autônomo

O cliente detecta o preço, autoriza o pagamento e consome o resultado sem intervenção humana.

### Pay-per-use

Uma empresa pode pagar somente pelas verificações consumidas.

### Stellar nativa

O projeto utiliza:

- USDC;
- Stellar Testnet;
- autorização Soroban;
- contrato Soroban;
- facilitador x402;
- SDK oficial.

### Privacidade

Dados completos do boleto não precisam ser publicados on-chain.

### Expansão empresarial

No futuro, o mesmo endpoint poderá ser consumido por:

- Protheus;
- outros ERPs;
- agentes de cobrança;
- portais de segunda via;
- carteiras;
- marketplaces;
- sistemas de conciliação.

## 25. Possível evolução com MPP

MPP não faz parte do MVP.

Ele poderá ser usado depois para clientes que façam muitas verificações em sequência.

Exemplo:

1. o ERP abre um canal financiado em USDC;
2. faz centenas de verificações;
3. cada chamada atualiza um compromisso assinado off-chain;
4. a liquidação ocorre em lote.

Isso reduz a necessidade de uma transação on-chain por chamada e é adequado para interações de alta frequência.

Para o desafio, o x402 com scheme `exact` é mais simples, mais visível na demonstração e suficiente para provar o caso de uso.

## 26. Roteiro do vídeo

Duração sugerida: 2 a 4 minutos.

### Cena 1 — Problema

> Empresas e agentes precisam verificar documentos financeiros, mas APIs tradicionais exigem contas, contratos, API keys e assinaturas.

### Cena 2 — Solução

> Guardian402 transforma cada verificação em um serviço pago por chamada usando x402 na Stellar.

### Cena 3 — Registro

Mostrar:

- hash calculado;
- registro no contrato;
- Contract ID;
- transação no explorer.

### Cena 4 — Chamada sem pagamento

Executar o CLI e mostrar:

```text
HTTP 402 Payment Required
```

### Cena 5 — Pagamento automático

Mostrar:

- preço de `0.01 USDC`;
- assinatura;
- liquidação;
- hash da transação.

### Cena 6 — Verificação

Mostrar:

```text
AUTHENTIC
```

Depois executar um valor alterado:

```text
MISMATCH
```

### Cena 7 — Encerramento

> No account. No subscription. No API key. An agent pays only for the verification it consumes.

## 27. Pitch

### Pitch de 15 segundos

> Guardian402 is a pay-per-use boleto verification API. An AI agent receives an HTTP 402 response, pays automatically in USDC on Stellar, and gets a Soroban-backed integrity result.

### Pitch em português

> O Guardian402 permite que um agente ou ERP pague automaticamente por uma verificação de boleto. A API responde com HTTP 402, o agente liquida o pagamento em USDC na Stellar e recebe uma prova de integridade consultada em Soroban.

## 28. Comandos iniciais

```bash
mkdir guardian402
cd guardian402

git init
npm init -y
npm pkg set private=true
npm pkg set type=module

mkdir -p apps/api apps/cli packages/shared packages/contract-client
mkdir -p contracts/verification-registry docs scripts
```

Instalar as dependências do fluxo x402:

```bash
npm install express dotenv zod
npm install @stellar/stellar-sdk
npm install @x402/core @x402/express @x402/fetch @x402/stellar
npm install -D typescript tsx vitest eslint prettier @types/node @types/express
```

Criar a carteira de demonstração:

```bash
stellar keys generate --network testnet guardian402-client
stellar keys address guardian402-client
stellar keys show guardian402-client
```

Nunca colocar a chave secreta no Git.

## 29. Instrução inicial para o Cursor

Copie o texto abaixo para iniciar a implementação:

```text
Você está implementando o projeto Guardian402 descrito no arquivo GUARDIAN402_CHALLENGE.md.

Objetivo:
Criar uma API de verificação de integridade de boletos protegida por pagamento x402 em USDC na Stellar Testnet. Depois do pagamento, a API deve consultar um contrato Soroban novo, criado para o desafio, e retornar AUTHENTIC, MISMATCH, NOT_FOUND ou REVOKED.

Regras de trabalho:
1. Leia integralmente GUARDIAN402_CHALLENGE.md antes de alterar qualquer arquivo.
2. Não amplie o escopo sem necessidade.
3. Trabalhe na ordem das fases definidas no documento.
4. Priorize primeiro uma prova x402 isolada e funcional.
5. Use TypeScript, Express e os pacotes oficiais:
   @stellar/stellar-sdk
   @x402/core
   @x402/express
   @x402/fetch
   @x402/stellar
6. Use Stellar Testnet e USDC Testnet.
7. Use o scheme x402 exact.
8. Crie o contrato Soroban em Rust do zero.
9. Não reutilize código antigo do Boleto Guardian.
10. Não armazene dados pessoais ou o boleto completo on-chain.
11. Nunca versione chaves secretas.
12. Escreva testes a cada fase.
13. Não declare uma etapa concluída sem executá-la e validar seu resultado.
14. Registre no README os comandos realmente executados.
15. Ao encontrar divergência entre este documento e a documentação atual da Stellar, siga a documentação atual e registre a decisão.

Primeira tarefa:
- criar a estrutura mínima do repositório;
- criar package.json com workspaces;
- criar .gitignore e .env.example;
- criar apps/api e apps/cli em TypeScript;
- implementar apenas uma rota GET /health;
- configurar testes;
- criar um arquivo docs/STATUS.md com checklist das fases;
- não implementar ainda o contrato ou o frontend;
- ao terminar, executar lint, testes e build;
- informar exatamente os arquivos criados e os comandos usados.
```

## 30. Referências oficiais

- x402 on Stellar: https://developers.stellar.org/docs/build/agentic-payments/x402
- x402 Quickstart: https://developers.stellar.org/docs/build/agentic-payments/x402/quickstart-guide
- Built on Stellar x402 Facilitator: https://developers.stellar.org/docs/build/agentic-payments/x402/built-on-stellar
- MPP on Stellar: https://developers.stellar.org/docs/build/agentic-payments/mpp
- MPP Session Guide: https://developers.stellar.org/docs/build/agentic-payments/mpp/channel-guide
- Smart contracts: https://developers.stellar.org/docs/build/smart-contracts
- Invoke contract using SDKs: https://developers.stellar.org/docs/build/guides/transactions/invoke-contract-tx-sdk
- Stellar networks: https://developers.stellar.org/docs/networks

## 31. Regra final de escopo

Quando houver dúvida entre:

- criar mais uma funcionalidade; ou
- tornar o fluxo x402 existente mais confiável e demonstrável;

sempre escolher a segunda opção.

A submissão será julgada pelo fluxo que funciona, não pela quantidade de funcionalidades planejadas.
