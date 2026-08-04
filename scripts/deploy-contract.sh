#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WASM="$ROOT/contracts/verification-registry/target/wasm32v1-none/release/verification_registry.wasm"
PASSPHRASE="Test SDF Network ; September 2015"

stellar contract build --manifest-path "$ROOT/contracts/verification-registry/Cargo.toml"
CONTRACT=$(stellar contract deploy \
  --wasm "$WASM" \
  --source-account guardian402-admin \
  --network testnet \
  --network-passphrase "$PASSPHRASE" \
  --alias verification-registry)
echo "Deployed: $CONTRACT"
ADMIN=$(stellar keys address guardian402-admin)
stellar contract invoke \
  --id "$CONTRACT" \
  --source-account guardian402-admin \
  --network testnet \
  --network-passphrase "$PASSPHRASE" \
  -- initialize --admin "$ADMIN"
echo "Initialized with admin $ADMIN"
