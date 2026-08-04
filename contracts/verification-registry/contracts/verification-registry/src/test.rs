#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, BytesN, Env};

fn hash(env: &Env, n: u8) -> BytesN<32> {
    BytesN::from_array(env, &[n; 32])
}

fn setup() -> (Env, Address, VerificationRegistryClient<'static>) {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register(VerificationRegistry, ());
    let client = VerificationRegistryClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    client.initialize(&admin);
    (env, admin, client)
}

#[test]
fn initialize_once() {
    let (env, _admin, client) = setup();
    let other = Address::generate(&env);
    let result = client.try_initialize(&other);
    assert!(result.is_err());
}

#[test]
fn register_and_verify_authentic() {
    let (env, admin, client) = setup();
    let record_key = hash(&env, 1);
    let document_hash = hash(&env, 2);
    client.register(&admin, &record_key, &document_hash);
    assert_eq!(
        client.verify(&record_key, &document_hash),
        VerificationStatus::Authentic
    );
}

#[test]
fn verify_mismatch() {
    let (env, admin, client) = setup();
    let record_key = hash(&env, 1);
    client.register(&admin, &record_key, &hash(&env, 2));
    assert_eq!(
        client.verify(&record_key, &hash(&env, 3)),
        VerificationStatus::Mismatch
    );
}

#[test]
fn verify_not_found() {
    let (env, _admin, client) = setup();
    assert_eq!(
        client.verify(&hash(&env, 9), &hash(&env, 9)),
        VerificationStatus::NotFound
    );
}

#[test]
fn verify_revoked() {
    let (env, admin, client) = setup();
    let record_key = hash(&env, 1);
    let document_hash = hash(&env, 2);
    client.register(&admin, &record_key, &document_hash);
    client.revoke(&admin, &record_key);
    assert_eq!(
        client.verify(&record_key, &document_hash),
        VerificationStatus::Revoked
    );
}

#[test]
fn unauthorized_register_panics() {
    let (env, _admin, client) = setup();
    let stranger = Address::generate(&env);
    let result = client.try_register(&stranger, &hash(&env, 1), &hash(&env, 2));
    assert!(result.is_err());
}

#[test]
fn get_record() {
    let (env, admin, client) = setup();
    let record_key = hash(&env, 4);
    let document_hash = hash(&env, 5);
    client.register(&admin, &record_key, &document_hash);
    let record = client.get(&record_key).expect("record");
    assert_eq!(record.document_hash, document_hash);
    assert!(record.active);
}
