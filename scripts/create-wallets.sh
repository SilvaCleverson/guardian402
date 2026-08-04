#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
stellar keys generate --network testnet guardian402-payto || true
stellar keys generate --network testnet guardian402-client || true
stellar keys generate --network testnet guardian402-admin || true
echo "PAY_TO=$(stellar keys address guardian402-payto)"
echo "CLIENT=$(stellar keys address guardian402-client)"
echo "ADMIN=$(stellar keys address guardian402-admin)"
