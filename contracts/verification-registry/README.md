# Verification Registry

Contrato Soroban que armazena apenas `record_key` + `document_hash` para prova de integridade de boletos.

## Funções

- `initialize(admin)`
- `register(admin, record_key, document_hash)`
- `verify(record_key, document_hash) -> Authentic | Mismatch | NotFound | Revoked`
- `revoke(admin, record_key)`
- `get(record_key)`

## Deploy (Testnet)

`CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO`

## Build / test

```bash
cd contracts/verification-registry
cargo test -p verification-registry
stellar contract build --manifest-path Cargo.toml
```
